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

var serveur;


document.addEventListener('DOMContentLoaded', function () {
//var serveur = "http://127.0.0.1";

 serveur = "http://" + location.host + "/huby";


if(navigator.geolocation) 
  {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(meteo_locate, locate_error, options);
  }
  else 
  {
    
  }

});

function meteo_locate(pos)
{
  var crd = pos.coords;
  openweathermeteo(crd.latitude,crd.longitude);
}

function openweathermeteo(latitude,longitude)
{
    var  url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+ encodeURIComponent(latitude) +'&lon='+ encodeURIComponent(longitude) +'&cnt=14&mode=json&units=metric&lang=fr';
 
    var xhrmeteo = new XMLHttpRequest();
                     xhrmeteo.open('GET', url );
                      xhrmeteo.onreadystatechange = function() 
                         {
                            if (xhrmeteo.readyState == 4 && xhrmeteo.status == 200) 
                            {
                                var donneesmeteo = JSON.parse(xhrmeteo.responseText);
                                var text = 'A '+donneesmeteo.city.name+', la température aujourd\'hui est de '+Math.round(donneesmeteo.list[0].temp.day)+'° C';
                                apply(text);
                                decode(donneesmeteo);

                            }
                            else if(xhrmeteo.readyState == 4 && xhrmeteo.status != 200) 
                            { // En cas d'erreur !
        
                               return "ERROR";
 
                            }

                        }
                        xhrmeteo.send(null);
}


function apply(text)
{
    var meteo_p = document.getElementById("weather_p");
    meteo_p.innerText = text;
}

function decode(donneesmeteo)
{
    switch(donneesmeteo.list[0].weather[0].main)
    {
        case 'Rain':
          url = "rain4.png";
        break;
        case 'Clear':
          url = "clear3.png";
        break;
         case 'Thunderstorm':
          url = "cloud30.png";
        break;
        case 'Drizzle':
          url = "rain4.png";
        break;
         case 'Snow':
          url = "snowing1.png";
        break;
        case 'Atmosphere':
          url = "cloud29.png";
        break;
         case 'Clouds':
          url = "simple33.png";
        break;
         case 'Extreme':
          url = "windy4.png";
        break;

        default :
          url=""
        break;

    }

    display_weather_icon(url);


}

function display_weather_icon(url)
{
    var weather_icon= document.getElementById("weather_icon");
    weather_icon.src = "img/" +url;

}

