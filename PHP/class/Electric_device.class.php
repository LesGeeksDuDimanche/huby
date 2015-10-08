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
	class Electric_device
	{
		private $dbname;
        private $username;
        private $password;
        private $pin;

        function __construct($parametre_path)
        {
				date_default_timezone_set("Europe/Paris");
				// connexion à la base de donnée
                include($parametre_path);
                $this->pin=0;

        }

        public function insert_device($name,$id_room,$code,$number)
        {
        	$reqinsert = $this->bdd->prepare('INSERT INTO electric_devices(name,id_room,code,number) VALUES(:name,:id_room,:code,:number)');
			$reqinsert->execute(array('name' => $name, 'code' => $code, 'number' => $number, 'id_room' => $id_room)) or die(print_r($reqinsert->errorInfo()));
        }

        public function update_device($id_device, $name,$id_room,$code,$number)
        {
            $requpdate = $this->bdd->prepare('UPDATE electric_devices SET name=:name, id_room=:id_room,code=:code,number=:number WHERE id_device = :id_device');
            $requpdate->execute(array('id_device' => $id_device,'name' => $name ,'id_room' => $id_room,'code' => $code,'number' => $number));
        }

        public function delete_device($id_device)
        {
            $reqdelete = $this->bdd->prepare('DELETE FROM electric_devices WHERE id_device = :id_device');
            $reqdelete->execute(array('id_device' => $id_device)) or die(print_r($reqinsert->errorInfo()));
        }

        public function get_all_devices()
        {
        	$req = $this->bdd->query('SELECT * FROM electric_devices')or die(print_r($reqinsert->errorInfo()));
        	$tab[0] = array('number' => 0);
				$i = 0;
				while($donnees = $req->fetch())
				{
					$tab[$i+1] = array('id_device' => $donnees['id_device'], 'name' => $donnees['name'],'code' => $donnees['code'], 'number' => $donnees['number'], 'id_room' => $donnees['id_room'] );
        			$i++;
				}
				$tab[0] = array('number' => $i);
				return $tab;
        }


        public function send_433_signal($code,$number,$status)
		{
            $status = $status == 0 ? 'off' : 'on';
            exec("sudo /var/www/hcc/radioEmission ".$this->pin." ".$code." ".$number." ".$status);
                
                }


            

     }

