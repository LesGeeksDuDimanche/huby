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
		include_once("../class/Installation.class.php");
		$installation = new Installation("../parametres/connexion_bdd1.php");

		switch($_GET['action'])
		{
			case 'install_bdd':
				$installation->executeQueryFile("../parametres/assistant.sql");
			break;

			case 'set_version_bdd':
				$installation->set_version_bdd($_GET['version']);
			break;
			case 'get_version_bdd':
				$return = $installation->get_version_bdd();
				echo $return;
			break;
			case 'maj_bdd':
				if($installation->get_version_bdd() == "1.0")
				{
					$installation->executeQueryFile("../parametres/maj1.sql");
					$installation->set_version_bdd("1.1");
				}

				if($installation->get_version_bdd() == "1.1")
				{
					$installation->executeQueryFile("../parametres/modules.sql");
					$installation->set_version_bdd("1.2");
				}

				if($installation->get_version_bdd() == "1.2")
				{
					$installation->executeQueryFile("../parametres/scenario.sql");
					$installation->set_version_bdd("1.3");
				}
				
			break;



		}