<?php
/* ===================================================
 * Projet Gladys
 * http://intelligenceonline.synergize.co
 * ===================================================
 * 
 * Copyright 2014, Pierre-Gilles Leymarie
 * Logiciel sous License Creative Commons 3.0 France
 * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
 * 
 * Pas d’Utilisation Commerciale
 * Partage dans les mêmes conditions et 
 * avec mentions et lien vers le projet initial.
 *
 * Contact : projectgladys@gmail.com
 * 
 * ========================================================== */

	define("URL_SERV",  $_SERVER['SERVER_ADDR']);
	include_once("../class/User.class.php");
	$user = new User("../parametres/connexion_bdd1.php");
	include_once("../class/Lesson.class.php");
	$lesson = new Lesson("../parametres/connexion_bdd1.php");

	switch($_GET['action'])
	{	
		case 'today_lessons' :
			$result = $lesson->today_lessons();
			echo json_encode($result);
		break;
		case 'insert_lesson' :

		break;


	}