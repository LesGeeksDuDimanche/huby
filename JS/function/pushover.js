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

exports.send = function (token, user, message, title, priority, callback)
{
	var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.pushover.net/1/messages.json');
                      xhr.onreadystatechange = function() 
                         {
                            if (xhr.readyState == 4 && xhr.status == 200) 
                            {
                                feedback.disp("Pushover - " + title + " : " + message);
                                if(callback)
                                {
                                	callback();
                                }

                            }
                            else if(xhr.readyState == 4 && xhr.status != 200) 
                            { // En cas d'erreur !
 
                            }

                        }
    xhr.send('token=' + token + '&user=' + user + "&message=" + message + "&title=" + title + "&priority=" + priority);
}