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

    define("URL_SERV",  $_SERVER['SERVER_ADDR']);
    include_once("../class/User.class.php");
    $user = new User("../parametres/connexion_bdd1.php");
    include_once("../class/Room.class.php");
    $room = new Room("../parametres/connexion_bdd1.php");

    
    if( (isset($_COOKIE['user']) && $user->check_cookies($_COOKIE['user']) && $user->check_if_admin($_COOKIE['user'])) || !($user->is_any_admin(1)) )
    {
            switch($_GET['action'])
            {
                case 'create_room':
                    $result = $room->create_room($_GET['name']);   
                    echo $result[0];                
                break;
                case 'update_room':
                    $room->update_room(intval($_GET['id']),$_GET['name']);
                break;
                case 'get_all_rooms':
                    $result = $room->get_all_rooms();
                    echo json_encode($result);
                break;
                case 'delete_room':
                    $room->delete_room($_GET['id_room']);
                break;

            }   
    }
    else
    {
        echo "Accès non autorisé";
    }
    