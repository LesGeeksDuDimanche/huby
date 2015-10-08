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


document.addEventListener('DOMContentLoaded', function () {

if(navigator.geolocation) 
	{
		var options = {
		  enableHighAccuracy: true,
		  timeout: 5000,
		  maximumAge: 0
		};
		navigator.geolocation.getCurrentPosition(success, locate_error, options);
	}
	else 
	{
		
	}


});


function success(pos) {
  var crd = pos.coords;
  insert_location(crd.latitude, crd.longitude,crd.altitude,crd.accuracy);
};

function locate_error(error) {
    switch(error.code)
    {
	    case error.TIMEOUT:
	    break;
	    case error.PERMISSION_DENIED:
	    	alert("Vous ne m'avez pas donné l'autorisation de vous localiser, ainsi je ne peux pas afficher la météo à votre position.")
	    break;
	    case error.POSITION_UNAVAILABLE:
	    break;
	    case error.UNKNOWN_ERROR:
	    break;
    }

}

function insert_location(latitude, longitude,altitude,accuracy)
{
    var xhr_create = new XMLHttpRequest();
        xhr_create.open('GET', serveur + '/PHP/controller/geolocation.controller.php?action=insert_location&latitude=' + encodeURIComponent(latitude) + '&accuracy=' + encodeURIComponent(accuracy) + '&longitude=' + encodeURIComponent(longitude) + '&altitude=' + encodeURIComponent(altitude) );
        xhr_create.onreadystatechange = function()
        {
            if (xhr_create.readyState == 4 && xhr_create.status == 200)
            {

            }
            else if(xhr_create.readyState == 4 && xhr_create.status != 200) 
            { // En cas d'erreur !

            }
        };
 
        xhr_create.send(null);

}