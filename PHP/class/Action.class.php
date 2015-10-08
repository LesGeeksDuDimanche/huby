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
	class Action
	{
		private $bdd;
		private $time_sleep_max = 23;
		private $time_wake_up_min = 5;
		private $time_wake_up_max = 10;
		private $url_reveil = "5yeartime.mp3";
		private $volume_reveil = "0";
		private $chemin = "/var/www/gladys/";

		private $dbname;
        private $username;
        private $password;
		
		function __construct($parametre_path)
        {
				date_default_timezone_set("Europe/Paris");
				// connexion à la base de donnée
               include($parametre_path);

        }


        public function create_alarme($id_user,$date,$time,$action,$status,$recurring)
        {
        	$reqinsert = $this->bdd->prepare('INSERT INTO alarmes(id_user,date,time,action,status,recurring) VALUES(:id_user,:date,:time,:action,:status,:recurring)');
			$reqinsert->execute(array('id_user' => $id_user,'date' => $date,'action' => $action ,'time' => $time,'status' => $status,'recurring' => $recurring)) or die(print_r($reqinsert->errorInfo()));
        	
        	$req = $this->bdd->query("SELECT LAST_INSERT_ID() FROM alarmes");
            return $req->fetch();
        }

        public function update_alarme($id,$date,$time,$action,$status,$recurring)
        {
        	$requpdate = $this->bdd->prepare('UPDATE alarmes SET date=:date, time=:time,action=:action,status=:status,recurring=:recurring WHERE id_alarme = :id');
			$requpdate->execute(array('id' => $id,'date' => $date,'action' => $action ,'time' => $time,'status' => $status,'recurring' => $recurring));
        }

        public function delete_alarme($id_alarme)
        {
        	$reqdelete = $this->bdd->prepare('DELETE FROM alarmes WHERE id_alarme = :id_alarme');
			$reqdelete->execute(array('id_alarme' => $id_alarme)) or die(print_r($reqinsert->errorInfo()));
        }

        public function get_alarme($id)
        {
        	if(!empty($id))
        	{
        		$req = $this->bdd->prepare('SELECT * FROM alarmes WHERE id_alarme = :id');
        		$req->execute(array('id' => $id)) or die(print_r($bdd->errorInfo()));
				while($donnees = $req->fetch())
				{
					
					return array('id_alarme' => $donnees['id_alarme'], 'date' => $donnees['date'], 'time' => $donnees['time'], 'action' => $donnees['action'], 'status' => $donnees['status'], 'recurring' => $donnees['recurring'] );
				}
        	}
        	else
        	{
        		$req = $this->bdd->query('SELECT * FROM alarmes');
				$tab[0] = array('number' => 0);
				$i = 0;
				while($donnees = $req->fetch())
				{
					$tab[$i+1] = array('id_alarme' => $donnees['id_alarme'], 'date' => $donnees['date'], 'time' => $donnees['time'], 'action' => $donnees['action'], 'status' => $donnees['status'], 'recurring' => $donnees['recurring'] );
        			$i++;
				}
				$tab[0] = array('number' => $i);
				
				return $tab;
			}
        }

        public function all_alarm_user($id_user)
        {
        	$req = $this->bdd->prepare('SELECT * FROM alarmes WHERE id_user = :id_user');
        	$req->execute(array('id_user' => $id_user)) or die(print_r($bdd->errorInfo()));
				$tab[0] = array('number' => 0);
				$i = 0;
				while($donnees = $req->fetch())
				{
					$tab[$i+1] = array('id_alarme' => $donnees['id_alarme'], 'date' => $donnees['date'], 'time' => $donnees['time'], 'action' => $donnees['action'], 'status' => $donnees['status'], 'recurring' => $donnees['recurring'] );
        			$i++;
				}
				$tab[0] = array('number' => $i);
				
				return $tab;
        }

        public function today_alarme()
        {
        	$req = $this->bdd->prepare('SELECT * FROM alarmes WHERE date = :date OR recurring = :recurring');
        	$req->execute(array('date' =>  date('Y-m-d'), 'recurring' =>  date('w'))) or die(print_r($req->errorInfo()));

				$tab[0] = array('number' => 0);
				$i = 0;
				while($donnees = $req->fetch())
				{	
						$tab[$i+1] = array('id_alarme' => $donnees['id_alarme'], 'date' => $donnees['date'], 'time' => $donnees['time'], 'action' => $donnees['action'], 'status' => $donnees['status'], 'recurring' => $donnees['recurring'] );
        				$i++;
				}
				$tab[0] = array('number' => $i);
				
				return $tab;
        }

       public  function next_wake_up($id_user,$phrase)
        {
        	$date_w = date("w");
        	$date_ymd = date('Y-m-d');
        	$time = date('H:i:s');

        	$req = $this->bdd->prepare('SELECT * FROM alarmes WHERE (date = :date OR recurring = :recurring) AND time > :time AND id_user = :id_user ORDER BY time');
        	$req->execute(array('date' =>  $date_ymd, 'recurring' => $date_w, 'time' => $time, 'id_user' => $id_user)) or die(print_r($req->errorInfo()));

        	if($donnees = $req->fetch())
        	{
        		if($phrase)
        		{
        			$heure =  substr($donnees['time'], 0, -3);
        			$phrase = "Aujourd'hui à ".$heure;
        			return $phrase;
        		}
        		else
        		{
        			$tab = array('id_alarme' => $donnees['id_alarme'], 'date' => $donnees['date'], 'time' => $donnees['time'], 'action' => $donnees['action'], 'status' => $donnees['status'], 'recurring' => $donnees['recurring'] );
        			return $tab;
        		}
        		
        	}
        	else
        	{

        		$date_w = date("w", mktime (0,0,0,date("m" ) ,date("d" )+1,date("Y" )));
        		$date_ymd = date("Y-m-d", mktime (0,0,0,date("m" ) ,date("d" )+1,date("Y" )));

	        	$req = $this->bdd->prepare('SELECT * FROM alarmes WHERE (date = :date OR recurring = :recurring) AND id_user = :id_user  ORDER BY time');
	        	$req->execute(array('date' =>  $date_ymd, 'recurring' => $date_w,  'id_user' => $id_user)) or die(print_r($req->errorInfo()));

	        	if($donnees = $req->fetch())
	        	{
	        		if($phrase)
		        	{
		        		$heure =  substr($donnees['time'], 0, -3);
		        		$phrase = "Demain à ".$heure;
	        			return $phrase;
		        	}
		        	else
		        	{
		        		$tab = array('id_alarme' => $donnees['id_alarme'], 'date' => $donnees['date'], 'time' => $donnees['time'], 'action' => $donnees['action'], 'status' => $donnees['status'], 'recurring' => $donnees['recurring'] );
		        		return $tab;
		        	}
	        	}
	        	else
	        	{
	        		return NULL;
	        	}
        	}
        		
        }

        public function get_date_french()
        {
        	$jour = array("Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"); 
			$mois = array("","Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"); 
			$datefr = $jour[date("w")]." ".date("d")." ".$mois[date("n")];
			return $datefr; 
        }

 		public function say($text)	// lit un texte
		{
				//exec('yatm -t 1.3 /var/www/gladys/PHP/sound/bonjourmonsieur.mp3');
				exec('madplay --adjust-volume=-20');
				exec('mpg321 "http://translate.google.com/translate_tts?tl=fr&q='.urlencode($text).'&ie=UTF-8"');
				exec('madplay --adjust-volume=16');
				$this->save_output(1,$text);
		}

		public function say_with_cache($text)	// lit un texte avec mise en cache (experimental)
		{
				exec('madplay --adjust-volume=-20');
				exec('sudo /var/www/gladys/PHP/scripts/tts.sh "'.$text.'"');
				exec('madplay --adjust-volume=16');
				//exec('sudo -u www-data var/www/PHP/tts.sh "'.$text.'"');
				$this->save_output(1,$text);
		}

		public function play($url)
		{
			if($url == "reveil")
			{
				$this->wake_up_is_launch();
				exec('madplay -Q --no-tty-control --adjust-volume='.$this->volume_reveil.' "../sound/'.$this->url_reveil.'"');
				$this->save_output(2,$url);
			}
			else
			{
				exec('madplay -Q --no-tty-control --adjust-volume=-14 "'.$url.'"');
				$this->save_output(2,$url);
			}
			
		}

		public function stop_music()
		{
			exec('sudo killall madplay');
		}

		public function wake_up_is_launch()
		{	
			$this->save_activity(2);
			unlink("wake_up_history.txt");
			$fichier_music = fopen("../wake_up_history.txt","a");
			fputs($fichier_music,date('Y-m-d H:i:s'));
			fclose($fichier_music);
		}

		public function is_waking_up()
		{
			$fichier_music = fopen("../wake_up_history.txt","r+");
			$old_music = fgets($fichier_music);
			$tempsdepuislancement = time() - strtotime($old_music);
			if($tempsdepuislancement < 60*3)
			{
				return true;
			}
			else
			{
				return false;
			}
			fclose($fichier_music);
		}

		public function save_output($action,$text)
		{
			$reqinsert = $this->bdd->prepare('INSERT INTO output_history(action,date,text) VALUES(:action,:date,:text)');
			$reqinsert->execute(array('action' => $action,'date' => date('Y-m-d H:i:s') ,'text' => $text)) or die(print_r($reqinsert->errorInfo()));
		}

		public function save_activity($action)
		{
			$reqinsert = $this->bdd->prepare('INSERT INTO activity_history(action,date) VALUES(:action,:date)');
			$reqinsert->execute(array('action' => $action,'date' => date('Y-m-d H:i:s'))) or die(print_r($reqinsert->errorInfo()));
		}

		function get_activity()
        {
        	$req = $this->bdd->query('SELECT * FROM activity_history ORDER BY date DESC LIMIT 0,100');

				$tab[0] = array('number' => 0);
				$i = 0;
				while($donnees = $req->fetch())
				{	
						$tab[$i+1] = array('id_activity' => $donnees['id_activity'], 'date' => $donnees['date'],'action' => $donnees['action']);
        				$i++;
				}
				$tab[0] = array('number' => $i);
				
				return $tab;
        }


		public function motion()
		{
			$fichier_motion = fopen("../motion_history.txt","r+");
			if($fichier_motion)
			{
				$old_date = fgets($fichier_motion);
				fclose($fichier_motion);
				unlink("../motion_history.txt");
			}
			else
			{
				$old_date = "0000-00-00 00:00:00";
			}
			$fichier_motion = fopen("../motion_history.txt","w+");
			fputs($fichier_motion,date('Y-m-d H:i:s'));
			fclose($fichier_motion);
			if($this->is_waking_up()) // si il se réveil, et qu'il y a un mouvement, on stoppe la musique
			{
				unlink("../wake_up_history.txt");
				$fichier_music = fopen("../wake_up_history.txt","a");
				fclose($fichier_music);
				$this->stop_music();
			}
			else if((time() - strtotime($old_date)) < 8*60*60 && intval(date("H")) < $this->time_wake_up_max )
			{
				// ne rien faire
			}
			else if((time() - strtotime($old_date)) > 60*40)
			{
				$this->bienvenue();
			}

		}

		public function last_motion()
		{
			$fichier_motion = fopen("../motion_history.txt","r+");
			$date ="";
			while(!feof($fichier_motion))
			{
					$date .= fgets($fichier_motion);
			}
			fclose($fichier_motion);
			return $date;
		}
		public function launch_motion_sensor()
		{
			exec('sudo killall python');
			echo('sudo python '.$this->chemin.'PHP/scripts/pir.py');
			exec('sudo python '.$this->chemin.'PHP/scripts/pir.py');
		}
		public function stop_motion_sensor()
		{
			exec('sudo killall python');
		}

		public function bienvenue()
		{
			$this->save_activity(1);
			if($this->right_moment_to_speak())
			{
				$this->play("../sound/bonjourmonsieur.mp3");
			}
		}

		public function right_moment_to_speak()
		{
			if($this->is_sleeping())
			{
				return false;
			}
			else
			{
				return true;
			}
		}

		public function is_sleeping()
		{
			if(intval(date('H')) >= $this->time_sleep_max || intval(date('H')) <= $this->time_wake_up_min )
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		 
	}