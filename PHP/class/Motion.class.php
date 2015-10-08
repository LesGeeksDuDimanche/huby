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
	include_once("../class/Action.class.php");
	
	
	class Motion
	{
		private $time_before_new_entry;
		private $time_back_home;
		
		function __construct($parametre_path)
        {
				date_default_timezone_set("Europe/Paris");
				// connexion à la base de donnée
               include($parametre_path);
               $this->time_before_new_entry = 60*1;
               $this->time_back_home = 60*40;

        }

        public function insert_motion($sensor,$date)
        {
        	$reqinsert = $this->bdd->prepare('INSERT INTO motion(sensor,datetime) VALUES(:sensor,:datetime)');
			$reqinsert->execute(array('sensor' => $sensor, 'datetime' => $date )) or die(print_r($reqinsert->errorInfo()));
        }

        public function add_motion($sensor)
        {
        	$last_date = $this->last_motion_sensor($sensor);
        	$new_date = date('Y-m-d H:i:s');
        	$difference_date = $this->compare_date($new_date,$last_date);
        	if($difference_date > $this->time_before_new_entry )
        	{
        		$this->insert_motion($sensor,$new_date);
        	}
        	else
        	{
        		echo "not inserted";
        	}
        	
        	if($difference_date > $this->time_back_home )
        	{
        		$action = new Action("../parametres/connexion_bdd1.php");
        		$action->bienvenue();
        	}
        }


        public function last_motion_sensor($sensor)
        {
        	$req = $this->bdd->prepare('SELECT * FROM motion WHERE sensor = :sensor ORDER BY datetime DESC LIMIT 0, 1');
        	$req->execute(array('sensor' => $sensor)) or die(print_r($bdd->errorInfo()));
				if($donnees = $req->fetch())
				{
					return $donnees['datetime'];
				}
				else
				{
					return 0;
				}
        }

        public function get_last_motion()
        {
        	$req = $this->bdd->query('SELECT * FROM motion ORDER BY datetime DESC LIMIT 0, 1');
				if($donnees = $req->fetch())
				{
					return $donnees['datetime'];
				}
				else
				{
					return 0;
				}
        }

        public function compare_date($date1,$date2)
        {
        	return (strtotime($date1) - strtotime($date2));
        }
		 
	}