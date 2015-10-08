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
	class Geolocation
	{
		private $dbname;
        private $username;
        private $password;

        function __construct($parametre_path)
        {
				date_default_timezone_set("Europe/Paris");
				// connexion à la base de donnée
                include($parametre_path);

        }

        public function insert_location($id_user,$latitude,$longitude,$altitude,$accuracy)
        {
        	$reqinsert = $this->bdd->prepare('INSERT INTO geolocation(id_user,date,latitude,longitude,altitude,accuracy) VALUES(:id_user,:date,:latitude,:longitude,:altitude,:accuracy)');
			$reqinsert->execute(array('id_user' => $id_user, 'date' => date('Y-m-d H:i:s'), 'latitude' => $latitude, 'longitude' => $longitude, 'altitude' => $altitude,'accuracy' => $accuracy )) or die(print_r($reqinsert->errorInfo()));
        }
     }

