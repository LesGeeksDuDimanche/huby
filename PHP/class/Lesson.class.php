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

	//ini_set('display_errors', 1);
	class Lesson
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


        public function insert_lesson($id_user,$day,$name,$start,$end)
        {
        	$reqinsert = $this->bdd->prepare('INSERT INTO lessons(id_user,day,name,start,end) VALUES(:id_user,:day,:name,:start,:end)');
			$reqinsert->execute(array('id_user' => $id_user,'day' => $day ,'name' => $name,'start' => $start,'end' => $end)) or die(print_r($reqinsert->errorInfo()));
        }

        public  function today_lessons()
        {
        	$req = $this->bdd->prepare('SELECT * FROM lessons WHERE day =:day');
        	$req->execute(array('day' => date('w'))) or die(print_r($req->errorInfo()));

				$tab[0] = array('number' => 0);
				$i = 0;
				while($donnees = $req->fetch())
				{
					
						if($donnees['start'] > date("H:i"))
						{
							$tab[$i+1] = array('id_lesson' => $donnees['id_lesson'], 'day' => $donnees['day'], 'name' => $donnees['name'],  'start' => $donnees['start'], 'end' => $donnees['end']);
        					$i++;
						}
				}
				$tab[0] = array('number' => $i);
				
				return $tab;
        }



   }