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
	include_once("../class/Action.class.php");
	$action = new Action("../parametres/connexion_bdd1.php");

	switch($_GET['action'])
	{
		case 'say':
			$action->say($_GET['arg']);
		break;
		case 'play':
			$action->play($_GET['arg']);
		break;
		case 'all_alarme' :
			$result = $action->get_alarme();
			echo json_encode($result);
		break;
		case 'all_alarme_user':
			$result = $action->all_alarm_user(intval($_COOKIE['user']));
			echo json_encode($result);
		break;
		case 'today_alarme' :
			$result = $action->today_alarme();
			echo json_encode($result);
		break;
		case 'delete_alarme':
			$action->delete_alarme($_GET['id_alarme']);
		break;
		case 'next_wake_up' :
			if(isset($_GET["phrase"]))
			{
				$result = $action->next_wake_up(intval($_COOKIE['user']),"phrase");
			}
			else
			{
				$result = $action->next_wake_up(intval($_COOKIE['user']));
			}
			echo json_encode($result);
		break;
		case 'get_alarme' :
			$result = $action->get_alarme($_GET['id']);
			echo json_encode($result);
		break;
		case 'get_date_french':
			$result->get_date_french();
			echo $result;
		break;
		case 'create_alarme' :
			$result = $action->create_alarme( intval($_COOKIE['user']),$_GET['date'],$_GET['hour'],$_GET['action_alarme'],$_GET['status'],$_GET['recurring']);
			echo $result[0];
		break;
		case 'update_alarm' :
			$action->update_alarme($_GET['id'],$_GET['date'],$_GET['hour'],intval($_GET['action_alarme']),$_GET['status'],intval($_GET['recurring']));
		break;
		case 'motion' :
			$action->motion();
		break;
		case 'bienvenue' :
			$action->bienvenue();
		break;
		case 'last_motion' :
			$result = $action->last_motion();
			echo $result;
		break;
		case 'launch_motion_sensor':
			$action->launch_motion_sensor();
		break;
		case 'stop_motion_sensor':
			$action->stop_motion_sensor();
		break;
		case 'save_activity':
			$action->save_activity($_GET['arg']);
		break;
		case 'send_433_signal':
			$action->send_433_signal($_GET['arg']);
		break;
		case 'get_activity' :
			$result = $action->get_activity();
			echo json_encode($result);
		break;



	}
?>