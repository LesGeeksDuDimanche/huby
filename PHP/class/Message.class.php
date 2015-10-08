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
	class Message
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

        public function send_message($id_sender,$id_receiver,$text)
        {
        	$reqinsert = $this->bdd->prepare('INSERT INTO messages(id_sender,id_receiver,datetime,text) VALUES(:id_sender,:id_receiver,:datetime,:text)');
			$reqinsert->execute(array('id_sender' => $id_sender, 'id_receiver' => $id_receiver, 'datetime' => date("Y-m-d H:i:s"), 'text' => $text)) or die(print_r($reqinsert->errorInfo()));
        }


        public function get_last_message($id_user,$id_sender)
        {
        	$req = $this->bdd->prepare('SELECT * FROM messages WHERE (id_receiver = :id_user AND id_sender = :id_sender) OR (id_sender = :id_user AND id_receiver = :id_sender) ORDER BY datetime DESC LIMIT 0,30');
        	$req->execute(array('id_user' => $id_user, 'id_sender' => $id_sender)) or die(print_r($this->bdd->errorInfo()));
        	$tab[0] = array('number' => 0);
				$i = 0;
				while($donnees = $req->fetch())
				{
					$tab[$i+1] = array('id_message' => $donnees['id_message'], 'datetime' => $donnees['datetime'],'id_sender' => $donnees['id_sender'], 'id_receiver' => $donnees['id_receiver'], 'text' => $donnees['text'] );
        			$i++;
				}
				$tab[0] = array('number' => $i);
				return $tab;
        }


                                                                                                                                                                                   










      }