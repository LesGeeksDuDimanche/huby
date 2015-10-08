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
	include_once("../class/Sensor.class.php");
	$sensor = new Sensor("../parametres/connexion_bdd1.php");

	if(isset($_COOKIE['user']) && $user->check_cookies($_COOKIE['user']))
	{

		switch($_GET['action'])
		{
			case 'insert_sensor':
				if($user->check_if_admin($_COOKIE['user']))
				{
					$sensor->insert_sensor($_GET['name'], $_GET['id_room'],$_GET['code']);
				}
			break;
			case 'update_sensor' :
				if($user->check_if_admin($_COOKIE['user']))
				{
					$sensor->update_sensor(intval($_GET['id']),$_GET['name'], intval($_GET['id_room']),$_GET['code']);
				}
			break;
			case 'get_all_sensors':
				$result = $sensor->get_all_sensors();
				echo json_encode($result);
			break;
			case 'delete_sensor':
				if($user->check_if_admin($_COOKIE['user']))
				{
					$sensor->delete_sensor($_GET['id_sensor']);
				}
			break;
			case 'number_of_sensors':
			 	$result = $sensor->number_of_sensors();
			 	echo $result;
			break;
			case 'launch_motion_sensor':
				$sensor->launch_motion_sensor();
			break;
			case 'stop_motion_sensor':
				$sensor->stop_motion_sensor();
			break;

		}
	}