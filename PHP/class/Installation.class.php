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
	class Installation
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
        
        public function executeQueryFile($filesql) 
        {
                        $query = file_get_contents($filesql);
                        $array = explode(";\n", $query);
                        $b = true;
                        for ($i=0; $i < count($array) ; $i++) {
                            $str = $array[$i];
                            if ($str != '') {
                                 $str .= ';';
                                 $req = $this->bdd->query($str);
                            }  
                        }
                         
                        return $b;
        }   

        public function set_version_bdd($version)
        {
            $reqinsert = $this->bdd->prepare('INSERT INTO bdd_version(version,date) VALUES(:version, :date)');
            $reqinsert->execute(array('version' => $version, 'date' =>date('Y-m-d H:i:s'))) or die(print_r($reqinsert->errorInfo()));
        }

        public function get_version_bdd()
        {
            $req = $this->bdd->query('SELECT * FROM bdd_version ORDER BY date DESC')or die(print_r($reqinsert->errorInfo()));
                if($donnees = $req->fetch())
                {
                   return $donnees['version'];
                }
                else
                {
                    return NULL;
                }
        }

        public function table_exist()
        {      
            $req = $this->bdd->query("show tables");
            if($donnees = $req->fetch())
            {
                return true;
            }
            else
            {
                return false;
            }
        }                                                                                                                                                             

      }