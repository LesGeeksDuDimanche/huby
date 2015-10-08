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

// EXPERIMENTAL 


var serveur;
var chat_input;

document.addEventListener('DOMContentLoaded', function () {
//var serveur = "http://127.0.0.1";

serveur = "http://" + location.host + "/huby";


get_message(1,2);
chat_input = document.getElementById('chat_input');
chat_input.addEventListener('keydown', function (evt) {
                    if(evt.keyCode == 13)
                    {
                        send_message(chat_input.value,1);
                    }
                
            }, true);


});





function get_message(id_user,id_other)
{
	 var xhr_refresh = new XMLHttpRequest();
        xhr_refresh.open('GET', serveur + '/PHP/controller/message.controller.php?action=get_last_message&id_user=' + id_user +'&id_other=' + id_other);
        xhr_refresh.onreadystatechange = function()
        {
            if (xhr_refresh.readyState == 4 && xhr_refresh.status == 200)
            {
                 
                 var messages = JSON.parse(xhr_refresh.responseText);
                   if(messages[0]["number"] > 0)
                   {
                        analyze_messages(messages);
                   }
                

            }
             else if(xhr_refresh.readyState == 4 && xhr_refresh.status != 200) 
             { // En cas d'erreur !
     
                     alert('Une erreur est survenue !\n\nCode :' + xhr_refresh.status + '\nTexte : ' + xhr_refresh.statusText);
             }
        };
 
        xhr_refresh.send(null);
 
        return xhr_refresh;
}

function analyze_messages(messages,id_user)
{
    for(var i=1; i<=messages[0]["number"]; i++)
    {
        if(messages[i]["id_sender"] == id_user)
        {
        	var my_message = "yes";
        }
        else
        {
        	var my_message = "no";
        }
        display_messages(messages[i]["id_alarme"],messages[i]["datetime"],my_message, messages[i]["text"]);
    }
}




function display_messages(id,datetime,my_message,text)
{
	var element = document.createElement('div');
	var date_element = document.createElement('div');
    var text_element = document.createElement('div');

    date_element.className  = "date";
    text_element.className  = "text";

    if(my_message == "yes")
    {
    	element.className  = "my_message";
    }
    else
    {
    	element.className  = "his_message";
    }

    date_element.innerHTML = datetime;
    text_element.innerHTML = text;
    document.getElementById('chatbox_p').appendChild(element); 


	//element.appendChild(date_element); 
    element.appendChild(text_element);
}

function send_message(text, id_receiver)
{
    var xhr_send = new XMLHttpRequest();
        xhr_send.open('GET', serveur + '/PHP/controller/message.controller.php?action=send_message&text=' + encodeURIComponent(text) +'&id_receiver=' + id_receiver);
        xhr_send.onreadystatechange = function()
        {
            if (xhr_send.readyState == 4 && xhr_send.status == 200)
            {
                var datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
                display_messages(2,datetime,"yes",text);
                chat_input.value= "";


            }
             else if(xhr_send.readyState == 4 && xhr_send.status != 200) 
             { // En cas d'erreur !
     
                     alert('Une erreur est survenue !\n\nCode :' + xhr_send.status + '\nTexte : ' + xhr_send.statusText);
             }
        };
 
        xhr_send.send(null);
 
        return xhr_send;

}

