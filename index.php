<?php
	require('db.php');
	require('formulaire.php');
	require('contenu.php');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<title>ToDoListSql</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<h1>To Do List</h1>
	<form action="" method="post" id="items-list">
		<label>
			Search:
			<input type="search" id="search">
		</label>
		<h2>A faire</h2>
		<div class="block-afaire">
		<?php getItems(true); ?>
		</div>
		<!--<input type="submit" value="enregistrer" name="action">-->
		<h2>Archive</h2>
		<div class="block-archive">
		<?php getItems(false); ?>
		</div>
	</form>
	<h3>Ajouter une tâche</h3>
	<form action="" method="post">
		<label>
			La tâche à efectuer<br/>
			<textarea name="item" id="" cols="30" rows="10"></textarea>
		</label>
		<label>
			Echeance date<br/>
			<input type="date" name="date">
		</label>
		<label>
			time<br/>
			<input type="time" name="time">
		</label>
		<input type="submit" value="ajouter" name="action">
	</form>
	<div class="alert-block">
		<p>Les todos suivantes ont dépassé leur date d'échance:</p>
		<ul id="alert"></ul>
	</div>
	<script src="app.js"></script>
	<script src="drag.js"></script>
</body>
</html>