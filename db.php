<?php 
	try {
		$db = new PDO('mysql:host=localhost;dbname=todolist;charset=utf8', 'root', 'root', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
	} catch (Exception $e){
		die('Error: '.$e->getMessage());
	}
?>