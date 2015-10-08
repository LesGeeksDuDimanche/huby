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
	class Music
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

        public function start_music($repertory)
        {
        	exec('mocp -S');
        	//exec('mocp -c');
			exec('mocp -a '.$repertory);
			exec('mocp -t shuffle');
			exec('mocp -p');
        }

        public function pause_music()
        {
        	exec('mocp -P');
        }

        public function unpause_music()
        {
        	exec('mocp -U');
        }

        public function next_music()
        {
        	exec('mocp -f');
        }

        public function previous_music()
        {
        	exec('mocp -r');
        }

        public function stop_music()
        {
        	exec('mocp -x');
        }

        public function clear_playlist()
        {
        	exec('mocp -c');
        }



     }