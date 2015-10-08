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
var geolocation = require('./geolocation.js');
var latitude;
var longitude
geolocation.get(function (lat, long) {  latitude = lat; longitude = long; geolocation.save(latitude,longitude); });

exports.get = function (callback)
{
    var  url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+ latitude +'&lon='+ longitude +'&cnt=14&mode=json&units=metric&lang=fr';
 
    var xhrmeteo = new XMLHttpRequest();
    xhrmeteo.open('GET', url );
        xhrmeteo.onreadystatechange = function() 
        {
            				if (xhrmeteo.readyState == 4 && xhrmeteo.status == 200) 
                            {
                                var donneesmeteo = JSON.parse(xhrmeteo.responseText);
                                var text = 'A '+donneesmeteo.city.name+', la température aujourd\'hui est de '+Math.round(donneesmeteo.list[0].temp.day)+'degrés Celsius.';
                                feedback.disp(text);
                                if(callback)
                                {
                                	callback(text);
                                }
                            }
                            else if(xhrmeteo.readyState == 4 && xhrmeteo.status != 200) 
                            { // En cas d'erreur !
        
                               feedback.disp("Impossible de telecharger la meteo");
 
                            }

        }
                        xhrmeteo.send(null);
}