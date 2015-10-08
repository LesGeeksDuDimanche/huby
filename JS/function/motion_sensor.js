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

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var feedback = require('./disp.js');
var parametre = require('./parametre.js');

var URL_SERV = parametre.getURL_SERV();



exports.get_last_motion = function (callback)
{
     var xhr_motion = new XMLHttpRequest();
        xhr_motion.open('GET', URL_SERV +'/PHP/controller/motion.controller.php?action=last_motion');
        xhr_motion.onreadystatechange = function()
        {
            if (xhr_motion.readyState == 4 && xhr_motion.status == 200)
            {
                if(callback)
                {
                    var date = new Date(xhr_motion.responseText);
                    callback(date);
                }
                
            }
             else if(xhr_motion.readyState == 4 && xhr_motion.status != 200) 
             { // En cas d'erreur !
                    feedback.disp("get_last_motion : Impossible de se connecter a la base de donnee");
                    if(callback)
                    {
                        callback(null, "erreur");
                    }
             }
        };
 
        xhr_motion.send(null);
        return xhr_motion;
}

exports.launch_motion_sensor = function (callback)
{
    feedback.disp('launch_motion_sensor');
    var xhr_motion = new XMLHttpRequest();
        xhr_motion.open('GET', URL_SERV +'/PHP/controller/sensor.controller.php?action=launch_motion_sensor');
        xhr_motion.onreadystatechange = function()
        {
            if (xhr_motion.readyState == 4 && xhr_motion.status == 200)
            {
                
                if(callback)
                {
                    callback();
                }
                
            }
            else if(xhr_motion.readyState == 4 && xhr_motion.status != 200) 
            { // En cas d'erreur !
        
                feedback.disp("launch_motion_sensor : Impossible de lancer le détecteur de mouvement.");
 
            }
        };
 
        xhr_motion.send(null);
        return xhr_motion;
}

exports.stop_motion_sensor = function (callback)
{
    feedback.disp('stop_motion_sensor');
    var xhr_motion = new XMLHttpRequest();
        xhr_motion.open('GET', URL_SERV +'/PHP/controller/sensor.controller.php?action=stop_motion_sensor');
        xhr_motion.onreadystatechange = function()
        {
            if (xhr_motion.readyState == 4 && xhr_motion.status == 200)
            {
                if(callback)
                {
                    callback(xhr_motion.responseText);
                }
                
            }
            else if(xhr_motion.readyState == 4 && xhr_motion.status != 200) 
            { // En cas d'erreur !
        
                feedback.disp("stop_motion_sensor : Impossible de stopper le détecteur de mouvement.");
 
            }
        };
 
        xhr_motion.send(null);
        return xhr_motion;
}

exports.number_of_sensors = function (callback)
{
    var xhr_motion = new XMLHttpRequest();
        xhr_motion.open('GET', URL_SERV +'/PHP/controller/sensor.controller.php?action=number_of_sensors');
        xhr_motion.onreadystatechange = function()
        {
            if (xhr_motion.readyState == 4 && xhr_motion.status == 200)
            {
                if(callback)
                {
                    callback(xhr_motion.responseText);
                }
                
            }
            else if(xhr_motion.readyState == 4 && xhr_motion.status != 200) 
            { // En cas d'erreur !
        
                feedback.disp("stop_motion_sensor : Impossible de stopper le détecteur de mouvement.");
 
            }
        };
 
        xhr_motion.send(null);
        return xhr_motion;
}


exports.save_motion = function (sensor,callback)
{
     var xhr_motion = new XMLHttpRequest();
        xhr_motion.open('GET', URL_SERV +'/PHP/controller/motion.controller.php?action=motion&sensor=' + sensor);
        xhr_motion.onreadystatechange = function()
        {
            if (xhr_motion.readyState == 4 && xhr_motion.status == 200)
            {
                if(callback)
                {
                    callback(xhr_motion.responseText);
                }
                
            }
            else if(xhr_motion.readyState == 4 && xhr_motion.status != 200) 
            { // En cas d'erreur !
        
                feedback.disp("motion : impossible d'enregistrer le mouvement dans la BDD.");
 
            }
        };
 
        xhr_motion.send(null);

}