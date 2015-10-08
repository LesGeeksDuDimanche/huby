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
	include_once("../class/Music.class.php");
	$music = new Music("../parametres/connexion_bdd1.php");
	include("../parametres/music_repertory.php");

	if( (isset($_COOKIE['user']) && $user->check_cookies($_COOKIE['user'])) || $_GET['token'] == "123456" )
	{
		switch($_GET['action'])
		{
			case 'start_music':
				$music->start_music($music_repertory);
			break;
			case 'stop_music':
				$music->stop_music();
			break;
			case 'pause_music':
				$music->pause_music();
			break;
			case 'unpause_music':
				$music->unpause_music();
			break;
			case 'next_music':
				$music->next_music();
			break;
			case 'previous_music':
				$music->previous_music();
			break;
			case 'clear_playlist':
				$music->clear_playlist();
			break;

		}
	}