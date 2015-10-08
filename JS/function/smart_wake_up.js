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
var speak = require('./say.js');
var meteo = require('./meteo.js');
var sound = require('./play_sound.js');
var state = require('./state.js');
var music = require('./music.js');

var URL_SERV = parametre.getURL_SERV();
var temps_avant_annulation_reveil = 12*60*60*1000;


exports.smart_wakeup = function ()
{
	
        	feedback.disp("Reveil en cours...");
	            var date = new Date();
	            var heure = date.getHours();
	            var minutes = date.getMinutes();
	            var speech = "Bonjour, il est " + heure + " heure " + minutes ;
	            speak.say(speech,function() {
	                    meteo.get(function(text){ speak.say(text); });
	                  });
	            music.start();
	            state.setDort("non");

}