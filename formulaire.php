<?php
	
	echo '<pre>'.print_r($_POST, true).'</pre>';

	if(!isset($_POST['action'])) {
		return;
	}

	switch ($_POST['action']) {
		case 'ajouter':
			echo 'Ajouter';

			if(empty($_POST['item'])) {
				return;
			}

			// Il faut sanitize tout ça
			$item = sanitization($_POST['item']);
			$date = sanitization($_POST['date']);
			$time = sanitization($_POST['time']);
			
			if(!empty($date) && !empty($time)) {
				$deadline = $date.' '.$time.'00:00';
			} elseif (!empty($date)) {
				$deadline = $date.' 00:00';
			} else {
				$deadline = null;
			}

			$req = $db->prepare('INSERT INTO todos(task, active, deadline, ord) SELECT ?, true, ?, 1 + COUNT(*) FROM todos WHERE active = true');
			$req->execute(array(
				$item, $deadline
				));
			$req->closeCursor();

			break;
		
		case 'enregistrer':
			echo 'enregistrer';

			foreach ($_POST as $id => $bool) {
				if( is_int($id)) {

					$req = $db->prepare('UPDATE todos SET ord = ord - 1 WHERE active = :active AND ord > (SELECT ord FROM (SELECT * FROM todos WHERE id = :id) AS t)');
					$req->execute(array(
						'active' => !$bool,
						'id' => $id
						));
					$req->closeCursor();

					$req = $db->prepare('UPDATE todos SET active = :active , ord = 1 + (SELECT * FROM (SELECT COUNT(*) FROM todos WHERE active = :active) AS t) WHERE id = :id');
					$req->execute(array(
						'active' => $bool,
						'id' => $id
						));
					$req->closeCursor();

				}
			}

			break;
		case 'reorganiser':

			foreach ($_POST as $id => $ord) {
				if( is_int($id)) {
					$req = $db->prepare('UPDATE todos SET ord = :ord WHERE id = :id');
					$req->execute(array(
						'ord' => $ord,
						'id' => $id
						));
					$req->closeCursor();
				}
			}
			break;
	}

	function sanitization ($data) {

		$data = trim($data);
	    $data = strip_tags($data);  
		$data = stripslashes($data); 
		$data = htmlspecialchars($data); 

		return (!empty($data))?$data:'';
	}

	function addItemToJson($item) {
		global $arr_data;

		// Push user data to array
		array_push($arr_data,$item);

		overWriteJson($arr_data);

	}

	function overWriteJson($arr) {
			//Convert updated array to JSON
			$jsondata = json_encode($arr, JSON_PRETTY_PRINT); //Returns the JSON representation of a value

			//write json data into data.json file
		   	if(file_put_contents(FILE, $jsondata)) {
		    	echo 'Data successfully saved';
		    } else {
		    	echo "error";
		    }
	}
