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
var id_assistant;

exports.connect = function (callback)
{
	var  url = URL_SERV + '/PHP/controller/user.controller.php?action=get_assistant_id';
 
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url );
        xhr.onreadystatechange = function() 
        {
            				if (xhr.readyState == 4 && xhr.status == 200) 
                            {
                                var id = xhr.responseText;
                               	id_assistant = id;
                               	feedback.disp("Connecte, id_assistant =" + id_assistant);
                                if(callback)
                                {
                                	callback(id);
                                }
                            }
                            else if(xhr.readyState == 4 && xhr.status != 200) 
                            { // En cas d'erreur !
        
                               feedback.disp("Erreur lors de la connexion");
 
                            }

        }
                        xhr.send(null);
}


exports.getID = function ()
{
	return id_assistant;
}

