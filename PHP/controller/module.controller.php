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
    include_once("../class/Modules.class.php");
    $module = new Module("../parametres/connexion_bdd1.php");

    
    if( (isset($_COOKIE['user']) && $user->check_cookies($_COOKIE['user'])) )
    {
            switch($_GET['action'])
            {
                case 'create_module':
                    $result = $module->create_module($_GET['name'], $_GET['link'],$_GET['widget_path']);   
                    echo $result[0];                
                break;
                case 'update_module':
                    $module->update_room(intval($_GET['id']),$_GET['name'], $_GET['link'],$_GET['widget_path']);
                break;
                case 'get_all_modules':
                    $result = $module->get_all_modules();
                    echo json_encode($result);
                break;
                case 'delete_module':
                    $module->delete_module($_GET['id_module']);
                break;

            }   
    }
    else
    {
        echo "Accès non autorisé";
    }
    