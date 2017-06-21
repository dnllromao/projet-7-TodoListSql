<?php

	function getItems($bool) {
		global $db;
		$done = ($bool)?'':'done';
		$drag = ($bool)?'true':'false';
		$checked = ($bool)?'':'checked';
		$value = ($bool)?0: 1;


		$req = $db->prepare('SELECT id, task, deadline FROM todos WHERE active = ? ORDER BY ord');
		$req->execute(array($bool));

		while($data = $req->fetch()) {

			$deadline = (isset($data['deadline']))? $data['deadline'] : '';

			echo '<label class="'.$done.'" draggable="'.$drag.'"><input type="checkbox" name="'.$data['id'].'" value="'.$value.'" '.$checked.' data-deadline="'.$deadline.'">'.$data['task'].'</label>';
		}
		$req->closeCursor();
	}



