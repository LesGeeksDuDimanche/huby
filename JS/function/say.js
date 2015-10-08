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


exports.say = function(text,callback) {

	feedback.disp("- " + text);
    var xhr_say = new XMLHttpRequest();
        xhr_say.open('GET', URL_SERV +'/PHP/controller/action.controller.php?action=say&arg=' +  encodeURIComponent(text));
        xhr_say.onreadystatechange = function()
        {
            if (xhr_say.readyState == 4 && xhr_say.status == 200)
            {
                if(callback)
                {
                    callback();
                }
            }
             else if(xhr_say.readyState == 4 && xhr_say.status != 200) 
             { // En cas d'erreur !
     
             }
        };
 
        xhr_say.send(null);
 };