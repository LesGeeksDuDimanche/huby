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


exports.start = function (callback)
{
     var token = "123456";
     var xhr_sound = new XMLHttpRequest();
        xhr_sound.open('GET', URL_SERV +'/PHP/controller/music.controller.php?action=start_music&token=' + token);
        xhr_sound.onreadystatechange = function()
        {
            if (xhr_sound.readyState == 4 && xhr_sound.status == 200)
            {
                feedback.disp("Lancement de la musique...");
                if(callback)
                {
                    callback();
                }
           }
            else if(xhr_sound.readyState == 4 && xhr_sound.status != 200) 
            { // En cas d'erreur !
     				feedback.disp("Impossible de lancer la musique " + xhr_sound.statusText);
            }
        };
 
        xhr_sound.send(null);
 
        return xhr_sound;
}