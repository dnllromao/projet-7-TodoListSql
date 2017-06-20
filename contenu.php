<?php

	// define('FILE','todo.json');

	// $afaire;
	// $archive;

	// $arr_data = getDataFromJson();

	// prepareDataToDisplay();

	function getDataFromJson() {
		//Get data from existing json file
		$jsondata = file_get_contents(FILE);

		// converts json data into array
		return json_decode($jsondata, true);

	}

	function prepareDataToDisplay() {
		global $afaire;
		global $archive;
		global $arr_data;

		$afaire = [];
		$archive = [];

		foreach ($arr_data as $key => $value) {
			if($value['active']) {
				$afaire[$key] = $value;
			} else {
				$archive[$key] = $value;
			}
		}
	}

	function getItems($bool) {
		global $db;
		$class = ($bool)?'':'done';
		$checked = ($bool)?'':'checked';
		$value = ($bool)?0: 1;

		$req = $db->prepare('SELECT id, task FROM todos WHERE active = ?');
		$req->execute(array($bool));
		while($data = $req->fetch()) {
			echo '<label class="'.$class.'"><input type="checkbox" name="'.$data['id'].'" value="'.$value.'" '.$checked.'>'.$data['task'].'</br></label>';
		}
		$req->closeCursor();
	}



