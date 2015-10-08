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
<<<<<<< HEAD
 * Contact : projecthuby@gmail.com
=======
 * Contact : projectgladys@gmail.com
>>>>>>> 62bf16f58ef93969525ad484b3f9317a17b67b1d
 * 
 * ========================================================== */

var serveur;

document.addEventListener('DOMContentLoaded', function () {
//var serveur = "http://127.0.0.1";

serveur = "http://" + location.host + "/huby";

get_all_devices();
 

});


function get_all_devices()
{
    var xhr_refresh = new XMLHttpRequest();
        xhr_refresh.open('GET', serveur + '/PHP/controller/electric_device.controller.php?action=get_all_devices');
        xhr_refresh.onreadystatechange = function()
        {
            if (xhr_refresh.readyState == 4 && xhr_refresh.status == 200)
            {
                 
                 var devices = JSON.parse(xhr_refresh.responseText);
                   if(devices[0]["number"] > 0)
                   {
                        analyze_devices(devices);
                   }

            }
             else if(xhr_refresh.readyState == 4 && xhr_refresh.status != 200) 
             { // En cas d'erreur !
     
                  
             }
        };
 
        xhr_refresh.send(null);
 
        return xhr_refresh;
}

function analyze_devices(devices)
{
    for(var i=1; i<=devices[0]["number"]; i++)
    {
        display_devices(devices[i]["id_device"],devices[i]["name"],devices[i]["code"], devices[i]["number"] );
    }
}




function display_devices(id,name,code,number)
{
   /* var element = document.createElement('div');

    var button_on = document.createElement('button');
    var button_off = document.createElement('button');

    button_on.className  = "on";
    button_off.className  = "off";

    button_on.innerText = "On";
    button_off.innerText = "Off";

    element.innerText = name + " : ";

    document.getElementById('electric_devices_p').appendChild(element); 



    element.appendChild(button_on); 
    element.appendChild(button_off); */

    

    var element = document.createElement('tr');
    var text_zone = document.createElement('td');
    var button_zone = document.createElement('td');

    var button_on = document.createElement('button');
    var button_off = document.createElement('button');

    button_on.className  = "btn btn-default";
    button_off.className  = "btn btn-default";

    button_on.innerText = "On";
    button_off.innerText = "Off";

    text_zone.innerText = name ;

    document.getElementById('electric_devices_table').appendChild(element); 
    element.appendChild(text_zone); 
    element.appendChild(button_zone); 


    button_zone.appendChild(button_on); 
    button_zone.appendChild(button_off); 

    
    button_on.addEventListener('click', function(){
                          send_433_signal(code,number,1);
                          
                         });

    button_off.addEventListener('click', function(){
                          send_433_signal(code,number,0);
                         });
}



function send_433_signal(code,number,status)
{

	var xhr_refresh = new XMLHttpRequest();
        xhr_refresh.open('GET', serveur + '/PHP/controller/electric_device.controller.php?action=send_433_signal&code=' + code + '&number=' + number + '&status=' + status );
        xhr_refresh.onreadystatechange = function()
        {
            if (xhr_refresh.readyState == 4 && xhr_refresh.status == 200)
            {

            }
             else if(xhr_refresh.readyState == 4 && xhr_refresh.status != 200) 
             { // En cas d'erreur !
     
                  
             }
        };
 
        xhr_refresh.send(null);
 
        return xhr_refresh;

}

