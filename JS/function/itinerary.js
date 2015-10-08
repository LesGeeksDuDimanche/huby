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

var gm = require('googlemaps');


exports.temps_itineraire = function (start, end, callback)
{
    gm.directions(start, end , 
    function(err, data){
        var duration = data['routes'][0]['legs'][0]['duration']['value'];
        duration /= 60;
        duration = Math.round(duration);
        if(callback)
        {
            callback(duration);
        }
    });
    
}