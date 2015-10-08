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
	include_once("../class/Electric_device.class.php");
	$electric_device = new Electric_device("../parametres/connexion_bdd1.php");

	if(isset($_COOKIE['user']) && $user->check_cookies($_COOKIE['user']))
	{

		switch($_GET['action'])
		{
			case 'insert_device':
				if($user->check_if_admin($_COOKIE['user']))
				{
					$electric_device->insert_device($_GET['name'], $_GET['id_room'],$_GET['code'],$_GET['number']);
				}
			break;
			case 'update_device' :
				if($user->check_if_admin($_COOKIE['user']))
				{
					$electric_device->update_device(intval($_GET['id']),$_GET['name'], intval($_GET['id_room']),$_GET['code'],$_GET['number']);
				}
			break;
			case 'get_all_devices':
				$result = $electric_device->get_all_devices();
				echo json_encode($result);
			break;
			case 'delete_device':
				if($user->check_if_admin($_COOKIE['user']))
				{
					$electric_device->delete_device($_GET['id_device']);
				}
			break;
			case 'send_433_signal':
				$electric_device->send_433_signal($_GET['code'],$_GET['number'],$_GET['status']);
			break;

		}
	}