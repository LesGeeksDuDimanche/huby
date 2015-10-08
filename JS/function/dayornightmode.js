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
var motion_sensor = require('./motion_sensor.js');
var activity = require('./activity.js');
var alarmes_function = require('./alarmes.js');

var URL_SERV = parametre.getURL_SERV();

//var alarmes = alarmes_function.return_alarmes();

exports.mode_nuit = function ()
{
    feedback.disp('Activation du mode nuit.');
    motion_sensor.stop_motion_sensor();
}

exports.mode_jour = function ()
{
    var reveil_matin_existe = false;
    /*if(alarmes[0]['number'] > 0) // prototype, ne marche pas pour l'instant
    {
        for(var i= 1; i < alarmes.length; i++)
        {
            var heure_alarme = alarmes[i]["time"].substr(0,2);
            if(heure_alarme.substr(0,1) == "0")
            {
                heure_alarme = parseInt(heure_alarme.substr(1,1)); 
            }
            else
            {
                heure_alarme = parseInt(heure_alarme); 
            }

            if(heure_alarme <= heure_leve_max)
            {
                reveil_matin_existe = true;
            }

        }
    }*/

    if(!reveil_matin_existe)
    {
        feedback.disp('Activation du mode jour');
        motion_sensor.launch_motion_sensor();
    }
}