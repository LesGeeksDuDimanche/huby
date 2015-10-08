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


exports.play_sound = function (url,callback)
{
     feedback.disp("Playing: " + url);
     var xhr_sound = new XMLHttpRequest();
        xhr_sound.open('GET', URL_SERV +'/PHP/controller/action.controller.php?action=play&arg=' +  encodeURIComponent(url) );
        xhr_sound.onreadystatechange = function()
        {
            if (xhr_sound.readyState == 4 && xhr_sound.status == 200)
            {
                if(callback)
                {
                    callback();
                }
           }
            else if(xhr_sound.readyState == 4 && xhr_sound.status != 200) 
            { // En cas d'erreur !
     
            }
        };
 
        xhr_sound.send(null);
 
        return xhr_sound;
}