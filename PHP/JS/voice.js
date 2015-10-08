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
var rooms;
var select; 


document.addEventListener('DOMContentLoaded', function () {
//var serveur = "http://127.0.0.1";

 serveur = "http://" + location.host + "/huby";



});


function speak(text)
{
	var voix= document.getElementById('voice');
    if(isPlaying("voice"))
    {
        window.setTimeout(function() { say(text); }, 500);
    }
    else
    {
        voix.src = "http://translate.google.com/translate_tts?tl=fr&q=" + encodeURIComponent(text);
        voix.load();
        voix.play();
    }
}

function isPlaying(player){
        return document.getElementById(player).currentTime > 0 && !document.getElementById(player).paused &&  !document.getElementById(player).ended;

    }

