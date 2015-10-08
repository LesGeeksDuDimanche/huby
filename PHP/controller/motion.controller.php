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
ini_set('display_errors', 1);
	define("URL_SERV",  $_SERVER['SERVER_ADDR']);
	include_once("../class/Motion.class.php");
	$motion = new Motion("../parametres/connexion_bdd1.php");

		switch($_GET['action'])
		{
			case 'motion':
				$motion->add_motion($_GET['sensor']);
				echo $_GET['sensor'];
			break;

			case 'last_motion':
				$result = $motion->get_last_motion();
				echo $result;
			break;
		}