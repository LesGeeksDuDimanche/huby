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
	class Room
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

        public function create_room($name)
        {
        	$reqinsert = $this->bdd->prepare('INSERT INTO rooms(name) VALUES(:name)');
			$reqinsert->execute(array('name' => $name)) or die(print_r($reqinsert->errorInfo()));

             $req = $this->bdd->query("SELECT LAST_INSERT_ID() FROM rooms");
            return $req->fetch();
        }

        public function update_room($id_room, $name)
        {
            $requpdate = $this->bdd->prepare('UPDATE rooms SET name=:name  WHERE id_room = :id_room');
            $requpdate->execute(array('name' => $name ,'id_room' => $id_room));
        }

        public function delete_room($id_room)
        {
            $reqdelete = $this->bdd->prepare('DELETE FROM rooms WHERE id_room = :id_room');
            $reqdelete->execute(array('id_room' => $id_room)) or die(print_r($reqinsert->errorInfo()));
        }


        public function get_all_rooms()
        {
                $req = $this->bdd->query('SELECT * FROM rooms');
                $tab[0] = array('number' => 0);
                $i = 0;
                while($donnees = $req->fetch())
                {
                    $tab[$i+1] = array('id_room' => $donnees['id_room'], 'name' => $donnees['name']);
                    $i++;
                }
                $tab[0] = array('number' => $i);
                
                return $tab;
        }

                                                                                                                                                                        


    }