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

	
	if( (isset($_COOKIE['user']) && $user->check_cookies($_COOKIE['user']) && $user->check_if_admin($_COOKIE['user'])) || !($user->is_any_admin(1)) )
	{
			switch($_GET['action'])
			{
				case 'create_user':
					$result = $user->create_user($_GET['type'],$_GET['surname'],$_GET['password'],$_GET['id_sleep_room']);
					echo $result[0];					
				break;
				case 'update_user':
					$user->update_user(intval($_GET['id']),intval($_GET['type']),$_GET['surname'],intval($_GET['id_sleep_room']));
				break;
				case 'get_all_users':
					$result = $user->get_all_users();
					echo json_encode($result);
				break;
				case 'delete_user':
					$user->delete_user($_GET['id_user']);
				break;
				case 'get_assistant_id':
					$id = $user->get_assistant_id(0);
					echo $id;
				break;

			}	
	}
	