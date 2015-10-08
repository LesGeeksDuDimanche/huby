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
	class User
	{
		public $user_surname;
        public $assistant_name;
        private $dbname;
        private $username;
        private $password;
		
        function __construct($parametre_path)
        {
				date_default_timezone_set("Europe/Paris");
				// connexion à la base de donnée
                include($parametre_path);

                $this->get_assistant_name(0);

        }

        public function create_user($type,$surname,$password,$id_sleep_room)
        {
        	$reqinsert = $this->bdd->prepare('INSERT INTO users(type,surname,id_sleep_room,password) VALUES(:type,:surname,:id_sleep_room,:password)');
			$reqinsert->execute(array('type' => $type,'surname' => $surname,'id_sleep_room' => $id_sleep_room, 'password' => sha1($password))) or die(print_r($reqinsert->errorInfo()));
            
            $req = $this->bdd->query("SELECT LAST_INSERT_ID() FROM users");
            return $req->fetch();

        }

        public function delete_user($id_user)
        {
            $reqdelete = $this->bdd->prepare('DELETE FROM users WHERE id_user = :id_user');
            $reqdelete->execute(array('id_user' => $id_user)) or die(print_r($reqinsert->errorInfo()));
        }

        public function update_user($id_user,$type,$surname,$id_sleep_room)
        {
            $requpdate = $this->bdd->prepare('UPDATE users SET surname=:surname,type=:type, id_sleep_room=:id_sleep_room   WHERE id_user = :id_user');
            $requpdate->execute(array('surname' => $surname ,'type' => $type ,'id_sleep_room' => $id_sleep_room ,'id_user' => $id_user));
        }

        public function connect()
        {
            if(isset($_COOKIE['user']))
            {
                if($this->check_cookies($_COOKIE['user']))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public function log_out()
        {
            setcookie('connexion', NULL, -1);
        }

        public function connexion($surname,$password)
        {
            $req = $this->bdd->prepare('SELECT * FROM users WHERE surname = :surname AND password = :password');
        	$req->execute(array('surname' => $surname, 'password' => sha1($password))) or die(print_r($bdd->errorInfo()));
        	if($donnees = $req->fetch())
        	{
        		$this->set_user_cookie($donnees['id_user']);
                $this->set_connexion_cookie($donnees['id_user']);
                return true;
        	}
        	else
        	{
        		return false;
        	}
        }

        public function insert_cookie($value, $id_user,$validity_date)
        {
            $req = $this->bdd->prepare('INSERT INTO cookies(value,id_user,validity_date) VALUES(:value,:id_user,:validity_date)');
            $req->execute(array('value'=> $value, 'id_user' => $id_user, 'validity_date' => $validity_date ));
        }

        public function set_user_cookie($id_user)
        {
            $validity_date = time() + 2*30*24*3600;
            setcookie('user',$id_user, $validity_date , null,null, false, true);
        }

        public function set_connexion_cookie($id_user)
        {   
            $value = uniqid('', true).uniqid('', true);
            $validity_date = time() + 2*30*24*3600;
            $this->insert_cookie($value, $id_user,date("Y-m-d H:i:s", $validity_date));
            setcookie('connexion',$value, $validity_date , null,null, false, true);
        }

        public function check_cookies($id_user)
        {
            if(isset($_COOKIE['connexion']))
            {
                if($this->check_cookie_validity($_COOKIE['connexion'], $id_user))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public function check_cookie_validity($value,$id_user)
        {
            $req = $this->bdd->prepare('SELECT * FROM cookies INNER JOIN users ON users.id_user = cookies.id_user WHERE value = :value AND cookies.id_user = :id_user AND validity_date >= :today');
            $req->execute(array('value'=> $value, 'id_user'=> $id_user, 'today' => date("Y-m-d H:i:s") )) or die(print_r($req->errorInfo()));
            if($donnees = $req->fetch())
            {
                $this->user_surname = $donnees['surname'];
                return true;
            }
            else
            {
                return false;
            }
        }

        public function check_if_admin($id_user)
        {
            $req = $this->bdd->prepare('SELECT * FROM users WHERE id_user = :id_user AND type = :type');
            $req->execute(array('type'=> 1, 'id_user' => $id_user )) or die(print_r($req->errorInfo()));
            if($donnees = $req->fetch())
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public function get_all_users()
        {
                $req = $this->bdd->query('SELECT * FROM users');
                $tab[0] = array('number' => 0);
                $i = 0;
                while($donnees = $req->fetch())
                {
                    $tab[$i+1] = array('id_user' => $donnees['id_user'], 'type' => $donnees['type'], 'surname' => $donnees['surname'], 'id_sleep_room' => $donnees['id_sleep_room']);
                    $i++;
                }
                $tab[0] = array('number' => $i);
                
                return $tab;
        }

        public function get_assistant_name($type)
        {
            $req = $this->bdd->prepare('SELECT * FROM users WHERE type = :type');
            $req->execute(array('type'=> $type )) or die(print_r($req->errorInfo()));
            if($donnees = $req->fetch())
            {
                $this->assistant_name = $donnees['surname'];
                return true;
            }
            else
            {
                return false;
            }
        }

        public function get_assistant_id($type)
        {
            $req = $this->bdd->prepare('SELECT * FROM users WHERE type = :type');
            $req->execute(array('type'=> $type )) or die(print_r($req->errorInfo()));
            if($donnees = $req->fetch())
            {
                return $donnees['id_user'];
            }
            else
            {
                return false;
            }
        }

        public function is_any_admin($type)
        {
            $req = $this->bdd->prepare('SELECT * FROM users WHERE type = :type');
            $req->execute(array('type'=> $type )) or die(print_r($req->errorInfo()));
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