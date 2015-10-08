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


/*
//////// Variable globales ////////
*/ 

var module_tab = new Array();

/*
//////// Chargement des modules node utilisés ////////
*/ 

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var fs = require('fs');


/*
//////// Chargement des fonctions persos utilisées ////////
*/ 

var function_repertory = "./function/";

var feedback = require(function_repertory +'disp.js');
var speak = require(function_repertory + 'say.js');
var sound = require(function_repertory +'play_sound.js');
var alarmes = require(function_repertory +'alarmes.js');
var lessons = require(function_repertory +'lessons.js');
var itinerary = require(function_repertory +'itinerary.js');
var pushover = require(function_repertory +'pushover.js');
var geolocation = require(function_repertory +'geolocation.js');
var state = require(function_repertory +'state.js');
var motion_sensor = require(function_repertory +'motion_sensor.js');
var music = require(function_repertory +'music.js');
var version_manager = require(function_repertory +'gladys_version.js');
var display_version = require(function_repertory +'display_version.js');
var maj = require(function_repertory +'maj_bdd.js');
var wake = require(function_repertory +'smart_wake_up.js');
var mail_sender = require(function_repertory +'send_mail.js');
var mail_listener = require(function_repertory+'mail.js');
var serial_port = require(function_repertory +'serial_port.js');

console.log("altitude::"+latitude);

/*
//////// Bienvenue ////////
*/

display_version.Display_version();

/*
//////// Modules loader ////////
*/
fs.readdir(__dirname+"/modules/", function(err, files){
    if (err) throw err;
    for (var i=0; i<files.length; i++)
    {
        feedback.disp('Lancement du module externe : ' + files[i]);
        module_tab[i]= new require('./modules/'+files[i])();
    }

});


 /*
//////// Lancement des tâche à l'allumage ////////
*/

var latitude;
var longitude;

maj.maj_bdd();
alarmes.get_alarmes();
lessons.get_lessons();
state.refresh_presence();
state.refresh_dort(function()
  {
    if(state.getDort() == "non")
    {
        motion_sensor.launch_motion_sensor();
    }
  });

user = "huby@lamyne.com";
pass = "jesuispassepartout";
mail_listener.connect(user, pass);

/*
//////// Lancement des tâches à intervalles ////////
*/
:


var check_alarme_interval = setInterval(alarmes.check_alarm, 1000*60);
var get_alarme_interval = setInterval(alarmes.get_alarmes, 1000*60*60);
var check_lessons_interval = setInterval(lessons.check_lesson, 1000*60);
var get_lessons_interval = setInterval(lessons.get_lessons, 1000*60*60*6);
var refresh_presence_interval = setInterval(state.refresh_presence, 1000*60*15);

var refresh_dort_interval = setInterval(state.refresh_dort, 1000*60*40);
var check_inmail = setInterval(mail_listener.start, 1000 * 60 );
//verification de mails toutes les 10 mins.//
var check_inmail_home = setInterval(mail_listener.search_for_home, 1000 * 60 * 10 );
//envoie de mail

var refresh_dort_interval = setInterval(state.refresh_dort, 1000*60*40);

