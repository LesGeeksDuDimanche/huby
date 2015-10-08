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

exports.save = function (action)
{
     var xhr_save = new XMLHttpRequest();
        xhr_save.open('GET', URL_SERV +'/PHP/controller/action.controller.php?action=save_activity&arg=' +  encodeURIComponent(action));
        xhr_save.onreadystatechange = function()
        {
            if (xhr_save.readyState == 4 && xhr_save.status == 200)
            {
                
            }
             else if(xhr_save.readyState == 4 && xhr_save.status != 200) 
             { // En cas d'erreur !
     
             }
        };
 
        xhr_save.send(null);
}