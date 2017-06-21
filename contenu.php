<?php

	function getItems($bool) {
		global $db;
		$class = ($bool)?'':'done';
		$drag = ($bool)?'true':'false';
		$checked = ($bool)?'':'checked';
		$value = ($bool)?0: 1;

		$req = $db->prepare('SELECT id, task FROM todos WHERE active = ? ORDER BY ord');
		$req->execute(array($bool));
		while($data = $req->fetch()) {
			echo '<label class="'.$class.'" draggable="'.$drag.'"><input type="checkbox" name="'.$data['id'].'" value="'.$value.'" '.$checked.'>'.$data['task'].'</br></label>';
		}
		$req->closeCursor();
	}



