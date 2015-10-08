
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
var alarm_launch = require('./alarm_launch.js');

var URL_SERV = parametre.getURL_SERV();

var alarmes = new Array();
alarmes[0] = new Array();
alarmes[0]['number'] = 0;

exports.get_alarmes = function ()
{
    var xhralarme = new XMLHttpRequest();
                     xhralarme.open('GET', URL_SERV + "/PHP/controller/action.controller.php?action=today_alarme" );
                      xhralarme.onreadystatechange = function() 
                         {
                            if (xhralarme.readyState == 4 && xhralarme.status == 200) 
                            {
                                feedback.disp("------Get_alarmes BDD-----");
                                alarmes = JSON.parse(xhralarme.responseText);

                            }
                            else if(xhralarme.readyState == 4 && xhralarme.status != 200) 
                            { // En cas d'erreur !
                                  feedback.disp("get_alarme : impossible de se connecter a la base de donnee");
                            }

                        }
                        xhralarme.send(null);

}

exports.check_alarm = function ()
{
    feedback.disp("------Check alarm-----");
    if(alarmes[0]['number'] > 0)
    {
        var date = new Date();
        var heure_actuelle = date.getHours();
        var minute_actuelle = date.getMinutes();
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
            var minute_alarme = alarmes[i]["time"].substr(3,2);
            if(minute_alarme.substr(0,1) == "0")
            {
                minute_alarme = parseInt(minute_alarme.substr(1,1)); 
            }
            else
            {
                minute_alarme = parseInt(minute_alarme); 
            }
            if(heure_alarme == heure_actuelle && minute_alarme == minute_actuelle)
            {
                alarm_launch.wakeup();
            }
            else
            {
                 feedback.disp(heure_alarme+ ":" + minute_alarme +"=Pas de reveil");
            }
        }
    }
}


exports.return_alarmes = function ()
{
    return alarmes;
}


