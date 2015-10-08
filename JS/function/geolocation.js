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
var user = require('./user.js');

var URL_SERV = parametre.getURL_SERV();
var id_assistant;
user.connect(function (id){ id_assistant = id; });

exports.get = function (callback)
{
    var  url = 'http://freegeoip.net/json/';
 
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url );
        xhr.onreadystatechange = function() 
        {
            				if (xhr.readyState == 4 && xhr.status == 200) 
                            {
                                var donnees_location = JSON.parse(xhr.responseText);
                                var latitude = donnees_location['latitude']; 
                                var longitude = donnees_location['longitude']; 
                                feedback.disp("Localise avec succes. Latitude = " + latitude + ", longitude = " + longitude);

                                feedback.var(latitude);

                                if(callback)
                                {
                                	callback(latitude, longitude);
                                }
                            }
                            else if(xhr.readyState == 4 && xhr.status != 200) 
                            { // En cas d'erreur !
        
                               feedback.disp("Je n'arrive pas a me localiser :/");
 
                            }

        }
                        xhr.send(null);
}



exports.save = function (latitude, longitude, callback)
{
    var xhr = new XMLHttpRequest();
        xhr.open('GET', URL_SERV +'/PHP/controller/geolocation.controller.php?action=insert_assistant_location&latitude=' +  encodeURIComponent(latitude) + '&longitude=' + encodeURIComponent(longitude) + '$user=' + id_assistant );
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState == 4 && xhr.status == 200)
            {
                if(callback)
                {
                    callback();
                }
            }
             else if(xhr.readyState == 4 && xhr.status != 200) 
             { // En cas d'erreur !
                    feedback.disp("Save_Geolocation : Impossible d'enregistrer votre localisation");
             }
        };
 
        xhr.send(null);
}