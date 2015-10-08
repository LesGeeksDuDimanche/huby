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
	include_once("../class/Geolocation.class.php");
	$geolocation = new Geolocation("../parametres/connexion_bdd1.php");

	if(isset($_COOKIE['user']) && $user->check_cookies($_COOKIE['user']))
	{

		switch($_GET['action'])
		{
			case 'insert_location':
				$geolocation->insert_location($_COOKIE['user'],$_GET['latitude'], $_GET['longitude'], $_GET['altitude'],$_GET['accuracy']);
			break;
			case 'insert_assistant_location':
				$geolocation->insert_location($_GET['user'],$_GET['latitude'], $_GET['longitude'], $_GET['altitude'],$_GET['accuracy']);	
			break;
		}
	}