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
	class Module
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

        public function create_module($name, $link,$widget_path)
        {
        	$reqinsert = $this->bdd->prepare('INSERT INTO modules(name,link,widget_path) VALUES(:name,:link,:widget_path)');
			$reqinsert->execute(array('name' => $name, 'link' => $link, 'widget_path' => $widget_path)) or die(print_r($reqinsert->errorInfo()));

            $req = $this->bdd->query("SELECT LAST_INSERT_ID() FROM modules");
            return $req->fetch();
        }

        public function update_module($id_module, $name, $link,$widget_path)
        {
            $requpdate = $this->bdd->prepare('UPDATE modules SET name=:name, link=:link,widget_path= :widget_path WHERE id_module = :id_module');
            $requpdate->execute(array('name' => $name , 'link' => $link, 'widget_path' => $widget_path, 'id_module' => $id_module));
        }

        public function delete_module($id_module)
        {
            $reqdelete = $this->bdd->prepare('DELETE FROM modules WHERE id_module = :id_module');
            $reqdelete->execute(array('id_module' => $id_module)) or die(print_r($reqinsert->errorInfo()));
        }


        public function get_all_modules()
        {
                $req = $this->bdd->query('SELECT * FROM modules');
                $tab[0] = array('number' => 0);
                $i = 0;
                while($donnees = $req->fetch())
                {
                    $tab[$i+1] = array('id_module' => $donnees['id_module'], 'name' => $donnees['name'], 'link' => $donnees['link'], 'widget_path' => $donnees['widget_path']);
                    $i++;
                }
                $tab[0] = array('number' => $i);
                
                return $tab;
        }

                                                                                                                                                                        


    }