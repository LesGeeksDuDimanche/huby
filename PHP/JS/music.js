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


var status = 0; // 0 => not playing

document.addEventListener('DOMContentLoaded', function () {
//var serveur = "http://127.0.0.1";

 serveur = "http://" + location.host + "/huby";




var button_start_music = document.getElementById('start_music');
var button_stop_music = document.getElementById('stop_music');
var button_pause_music = document.getElementById('pause_music');
var button_unpause_music = document.getElementById('unpause_music');
var button_next_music = document.getElementById('next_music');
var button_previous_music = document.getElementById('previous_music');

 button_start_music.addEventListener('click', function(){
                          if(status == 0)
                          {
                          		music("start_music", function() { status = 1; });
                          }
                          else
                          {
                          		music("unpause_music");
                          }
                          
                          
                         });
 button_pause_music.addEventListener('click', function(){
                          music("pause_music");
                          
                         });

  button_next_music.addEventListener('click', function(){
                          music("next_music");
                          
                         });

  button_previous_music.addEventListener('click', function(){
                          music("previous_music");
                          
                         });

  button_stop_music.addEventListener('click', function(){
                          music("stop_music", function() { status = 0; })
                          
                         });
 

});



function music(action, callback)
{
	var xhr_refresh = new XMLHttpRequest();
        xhr_refresh.open('GET', serveur + '/PHP/controller/music.controller.php?action=' + action);
        xhr_refresh.onreadystatechange = function()
        {
            if (xhr_refresh.readyState == 4 && xhr_refresh.status == 200)
            {
            	if(callback)
            	{
            		callback();
            	}
            }
             else if(xhr_refresh.readyState == 4 && xhr_refresh.status != 200) 
             { // En cas d'erreur !
     
                  
             }
        };
 
        xhr_refresh.send(null);
 
        return xhr_refresh;
}
