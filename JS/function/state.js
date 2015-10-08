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
var dayornight = require('./dayornightmode.js');

var URL_SERV = parametre.getURL_SERV();

var last_motion = "";
var presence = "oui";
var dort = "non";
var last_motion = "";
var temps_avant_non_presence = 15*60*1000;
var heure_couche_max = 23;
var heure_leve_min = 6;
var heure_leve_max = 10;

exports.refresh_presence = function (callback)
{
  motion_sensor.get_last_motion(function(date){
        last_motion = date.getTime();
        var date_now = new Date();  
        now = date_now.getTime();
        if(now-last_motion > temps_avant_non_presence )
        {
            if(presence == "oui")
            {
                activity.save(3);
            }
            presence = "non";
            feedback.disp('-----refresh_presence=non-----');
        }
        else
        {
          presence = "oui";
          feedback.disp('-----refresh_presence=oui-----');
        }

        if(callback)
        {
          callback();
        }

    });
}




/*
//////// Nuit  ////////
*/

 exports.refresh_dort = function (callback)
{ 
        var date_now = new Date();  
        var heure = date_now.getHours();
        now = date_now.getTime();
        if(heure >= heure_couche_max || heure < heure_leve_min)
        {
            if(dort == "non")
            {
                dayornight.mode_nuit();
            }
            dort = "oui";
            feedback.disp('-----refresh_dort=>nuit-----');
        }
        else
        {
            if(dort == "oui")
            {
                dayornight.mode_jour();
            }
            dort = "non";
            feedback.disp('-----refresh_dort=>jour-----');
        }


        if(callback)
        {
          callback();
        }

}




exports.moment_propice = function (callback)
{
    this.refresh_presence(function()
    {
        if(presence == "oui")
        {
            callback("propice");
        }
        else
        {
            callback("non_propice");
        }
    });
}


exports.getDort = function()
{
	return dort;
}

exports.getPresence = function()
{
	return presence;
}

exports.setDort = function(d)
{
	dort = d;
}