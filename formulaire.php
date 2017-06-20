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

			$item = sanitization($_POST['item']);

			// if(in_array($item, $arr_data)) {
			// 	echo 'Item already exists';
			// 	return;
			// }

			$req = $db->prepare('INSERT INTO todos(task, active) VALUES(?, true)');
			$req->execute(array($item));
			$req->closeCursor();

		 //    prepareDataToDisplay();

			break;
		
		case 'enregistrer':
			echo 'enregistrer';

			foreach ($_POST as $id => $bool) {
				if( is_int($id) && !$bool) {
					// $bool = (bool) $bool;
					// var_dump($bool);
					$req = $db->prepare('UPDATE todos SET active = ? WHERE id = ?');
					$req->execute(array($bool,$id));
					$req->closeCursor();
				}
			}

			// overWriteJson($arr_data);

		 //    prepareDataToDisplay();

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