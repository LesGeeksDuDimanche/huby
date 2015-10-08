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



exports.maj_bdd = function (callback)
{
     var xhr_maj = new XMLHttpRequest();
        xhr_maj.open('GET', URL_SERV +'/PHP/controller/installation.controller.php?action=maj_bdd');
        xhr_maj.onreadystatechange = function()
        {
            if (xhr_maj.readyState == 4 && xhr_maj.status == 200)
            {
                if(callback)
                {
                    callback();
                }
                
            }
             else if(xhr_maj.readyState == 4 && xhr_maj.status != 200) 
             { // En cas d'erreur !
                    feedback.disp("Erreur lors de la mise à jour");
             }
        };
 
        xhr_maj.send(null);
}