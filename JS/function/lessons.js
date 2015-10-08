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
var speak = require('./say.js');
var state = require( './state.js');
var parametre = require('./parametre.js');

var URL_SERV = parametre.getURL_SERV();
var last_lesson_reminder = "";
var lessons = new Array();
lessons[0] = new Array();
lessons[0]['number'] = 0;
var temps_avant_lesson = 10*60*1000;

exports.get_lessons = function ()
{
    var xhrlessons = new XMLHttpRequest();
                     xhrlessons.open('GET', URL_SERV + "/PHP/controller/lesson.controller.php?action=today_lessons" );
                      xhrlessons.onreadystatechange = function() 
                         {
                            if (xhrlessons.readyState == 4 && xhrlessons.status == 200) 
                            {
                                feedback.disp("------Get_lessons BDD-----");
                                lessons = JSON.parse(xhrlessons.responseText);

                            }
                            else if(xhrlessons.readyState == 4 && xhrlessons.status != 200) 
                            { // En cas d'erreur !
                                    feedback.disp("get_lessons : impossible de se connecter a la base de donnee");
                            }

                        }
                        xhrlessons.send(null);
}


exports.check_lesson = function ()
{
    feedback.disp("------Check lesson-----");
    if(lessons[0]['number'] > 0)
    {
        var date_actuelle = new Date();
        
        for(var i= 1; i < lessons.length; i++)
        {
            var heure_lesson = lessons[i]["start"].substr(0,2);
            if(heure_lesson.substr(0,1) == "0")
            {
                heure_lesson = parseInt(heure_lesson.substr(1,1)); 
            }
            else
            {
                heure_lesson = parseInt(heure_lesson); 
            }
            var minute_lesson = lessons[i]["start"].substr(3,2);
            if(minute_lesson.substr(0,1) == "0")
            {
                minute_lesson = parseInt(minute_lesson.substr(1,1)); 
            }
            else
            {
                minute_lesson = parseInt(minute_lesson); 
            }
            var lesson_date = new Date();
            lesson_date.setHours(heure_lesson);
            lesson_date.setMinutes(minute_lesson);
            var difference = (lesson_date.getTime() - date_actuelle.getTime());
            if( difference <= temps_avant_lesson && difference > 0 &&  lessons[i]["name"] != last_lesson_reminder)
            {
                this.rappel_lesson(lessons[i]["name"]);
                last_lesson_reminder = lessons[i]["name"];
            }
            else if(lessons[i]["name"] == last_lesson_reminder)
            {
                feedback.disp("Cours deja rappele.");
            }
            else
            {
                feedback.disp(heure_lesson+ ":" + minute_lesson +"=Pas de cours");
            }
        }
    }
}


exports.rappel_lesson = function (name)
{
    if(state.getPresence() == "oui")
    {
        speak.say("Monsieur, vous avez bientot cours de " + name);
    }
}   