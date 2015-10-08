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
	class Sensor
	{
		private $dbname;
        private $username;
        private $password;
        private $chemin = "/var/www/gladys/";

        function __construct($parametre_path)
        {
				date_default_timezone_set("Europe/Paris");
				// connexion à la base de donnée
                include($parametre_path);

        }

        public function insert_sensor($name,$id_room,$code)
        {
        	$reqinsert = $this->bdd->prepare('INSERT INTO sensors(name,id_room,code) VALUES(:name,:id_room,:code)');
			$reqinsert->execute(array('name' => $name, 'code' => $code, 'id_room' => $id_room)) or die(print_r($reqinsert->errorInfo()));
        }

        public function update_sensor($id_sensor, $name,$id_room,$code)
        {
            $requpdate = $this->bdd->prepare('UPDATE sensors SET name=:name, id_room=:id_room,code=:code WHERE id_sensor = :id_sensor');
            $requpdate->execute(array('id_sensor' => $id_sensor,'name' => $name ,'id_room' => $id_room,'code' => $code));
        }

        public function delete_sensor($id_sensor)
        {
            $reqdelete = $this->bdd->prepare('DELETE FROM sensors WHERE id_sensor = :id_sensor');
            $reqdelete->execute(array('id_sensor' => $id_sensor)) or die(print_r($reqinsert->errorInfo()));
        }

        public function get_all_sensors()
        {
        	$req = $this->bdd->query('SELECT * FROM sensors')or die(print_r($reqinsert->errorInfo()));
        	$tab[0] = array('number' => 0);
				$i = 0;
				while($donnees = $req->fetch())
				{
					$tab[$i+1] = array('id_sensor' => $donnees['id_sensor'], 'name' => $donnees['name'],'code' => $donnees['code'], 'id_room' => $donnees['id_room'] );
        			$i++;
				}
				$tab[0] = array('number' => $i);
				return $tab;
        }

        public function number_of_sensors()
        {
                $req = $this->bdd->query('SELECT COUNT(*) FROM sensors')or die(print_r($reqinsert->errorInfo()));
                if($donnees = $req->fetch())
                {
                    return $donnees[0];
                }
            
        }
        public function launch_motion_sensor()
        {
            if($this->number_of_sensors() > 0)
            {
                $this->stop_motion_sensor();
                exec('sudo '.$this->chemin.'/PHP/scripts/sensors/./RFsniffer');
            }
        }

        public function stop_motion_sensor()
        {
            exec('sudo killall RFSniffer');
        }



     }

