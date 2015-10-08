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


	serveur = "http://" + location.host + "/huby";


var button_save_step_1 = document.getElementById('save_step_1');
var button_save_step_2 = document.getElementById('save_step_2');
var button_save_step_3 = document.getElementById('save_step_3');
var button_save_step_4 = document.getElementById('save_step_4');
var button_save_step_5 = document.getElementById('save_step_5');
 var saveroombutton = document.getElementById('new_room');

  saveroombutton.addEventListener('click', new_room);

  button_save_step_1.addEventListener('click', save_step_1);
  button_save_step_2.addEventListener('click', save_step_2);
  button_save_step_3.addEventListener('click', save_step_3);
  button_save_step_4.addEventListener('click', save_step_4);
  button_save_step_5.addEventListener('click', save_step_5);

});


function save_step_1()
{
	var xhr_create = new XMLHttpRequest();
        xhr_create.open('GET', serveur + '/PHP/controller/installation.controller.php?action=install_bdd');
        xhr_create.onreadystatechange = function()
        {
            if (xhr_create.readyState == 4 && xhr_create.status == 200)
            {
                    change_step(1,2);
                    save_version_bdd("1.0");
            }
             else if(xhr_create.readyState == 4 && xhr_create.status != 200) 
             { // En cas d'erreur !
     
                     alert('Une erreur est survenue !\n\nCode :' + xhr_create.status + '\nTexte : ' + xhr_create.statusText);
             }
        };
 
        xhr_create.send(null);

}

function save_step_2()
{
	var assistant_name = document.getElementById('assistant_name').value;
    var type = 0;
    var password = "";
    var id_sleep_room = "";
    var xhr_create = new XMLHttpRequest();
        xhr_create.open('GET', serveur + '/PHP/controller/user.controller.php?action=create_user&surname=' + encodeURIComponent(assistant_name) + '&type=' + encodeURIComponent(type) + '&password=' + encodeURIComponent(password) + '&id_sleep_room=' + id_sleep_room );
        xhr_create.onreadystatechange = function()
        {
            if (xhr_create.readyState == 4 && xhr_create.status == 200)
            {
                var id = parseInt(xhr_create.responseText);
				change_step(2, 3);

            }
             else if(xhr_create.readyState == 4 && xhr_create.status != 200) 
             { // En cas d'erreur !
     
                     alert('Une erreur est survenue !\n\nCode :' + xhr_create.status + '\nTexte : ' + xhr_create.statusText);
             }
        };
 
        xhr_create.send(null);

}

function save_step_3()
{
	get_all_room();
    change_step(3, 4);
}


/*
function save_default_location()
{
     var latitude =  document.getElementById('latitude').value;
     var longitude =  document.getElementById('longitude').value;
     var xhr_create = new XMLHttpRequest();
        xhr_create.open('GET', serveur + '/PHP/controller/geolocation.controller.php?action=insert_default_location&latitude=' + encodeURIComponent(latitude) + '&longitude=' + encodeURIComponent(longitude) );
        xhr_create.onreadystatechange = function()
        {
            if (xhr_create.readyState == 4 && xhr_create.status == 200)
            {

            }
             else if(xhr_create.readyState == 4 && xhr_create.status != 200) 
             { // En cas d'erreur !
     
                     alert('Une erreur est survenue !\n\nCode :' + xhr_create.status + '\nTexte : ' + xhr_create.statusText);
             }
        };
 
        xhr_create.send(null);
}*/




function save_step_4()
{
	var surname = document.getElementById('surname').value;
    var type = 1;
    var password = document.getElementById('password').value;
    var id_sleep_room = document.getElementById('id_sleep_room').value;
    var xhr_create = new XMLHttpRequest();
        xhr_create.open('GET', serveur + '/PHP/controller/user.controller.php?action=create_user&surname=' + encodeURIComponent(surname) + '&type=' + encodeURIComponent(type) + '&password=' + encodeURIComponent(password) + '&id_sleep_room=' + id_sleep_room );
        xhr_create.onreadystatechange = function()
        {
            if (xhr_create.readyState == 4 && xhr_create.status == 200)
            {
                var id = parseInt(xhr_create.responseText);
				change_step(4, 5);

            }
             else if(xhr_create.readyState == 4 && xhr_create.status != 200) 
             { // En cas d'erreur !
     
                     alert('Une erreur est survenue !\n\nCode :' + xhr_create.status + '\nTexte : ' + xhr_create.statusText);
             }
        };
 
        xhr_create.send(null);

}

function save_step_5()
{
	window.open(serveur + "/PHP/");
}

function save_version_bdd(version)
{
    var xhr_create = new XMLHttpRequest();
        xhr_create.open('GET', serveur + '/PHP/controller/installation.controller.php?action=set_version_bdd&version=' + version);
        xhr_create.onreadystatechange = function()
        {
            if (xhr_create.readyState == 4 && xhr_create.status == 200)
            {

            }
             else if(xhr_create.readyState == 4 && xhr_create.status != 200) 
             { // En cas d'erreur !
     
                     alert('Une erreur est survenue !\n\nCode :' + xhr_create.status + '\nTexte : ' + xhr_create.statusText);
             }
        };
 
        xhr_create.send(null);
}

function change_step(step_old, new_step)
{
	document.getElementById("step" + step_old).style.display ="none";
	document.getElementById("step" + new_step).style.display ="block";

	document.getElementById("button_" + step_old).className = "btn btn-default btn-circle";
	document.getElementById("button_" + new_step).className = "btn btn-primary btn-circle";


}


function display_new_room(id,name)
{
	var element = document.createElement('tr');
    //var id_element = document.createElement('td');
	var name_element = document.createElement('td');
    var name_box = document.createElement('input');
    var delete_element = document.createElement('td');
    var delete_button = document.createElement('button');

    name_box.type = "text";
    name_box.className ="form-control";
    delete_button.className = "btn btn-sm btn-danger";

    name_box.value = name; 
    delete_button.innerText = "Supprimer";
    document.getElementById('table_rooms').appendChild(element); 

    name_element.appendChild(name_box);
    delete_element.appendChild(delete_button);

    element.appendChild(name_element);
    element.appendChild(delete_element);

        
     delete_button.addEventListener('click', function(){
                          delete_room(id,element);
                         });

}

function new_room()
{
    var name = document.getElementById('name').value;
    var xhr_create = new XMLHttpRequest();
        xhr_create.open('GET', serveur + '/PHP/controller/room.controller.php?action=create_room&name=' + encodeURIComponent(name) );
        xhr_create.onreadystatechange = function()
        {
            if (xhr_create.readyState == 4 && xhr_create.status == 200)
            {
                var id = parseInt(xhr_create.responseText);
                display_new_room(id,name);
                document.getElementById('name').value = "";
                

            }
             else if(xhr_create.readyState == 4 && xhr_create.status != 200) 
             { // En cas d'erreur !
     
                     alert('Une erreur est survenue !\n\nCode :' + xhr_create.status + '\nTexte : ' + xhr_create.statusText);
             }
        };
 
        xhr_create.send(null);

}

function delete_room(id,element)
{
    var xhr = new XMLHttpRequest();
        xhr.open('GET', serveur + '/PHP/controller/room.controller.php?action=delete_room&id_room=' + id );
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState == 4 && xhr.status == 200)
            {
                 element.parentNode.removeChild(element);

            }
             else if(xhr.readyState == 4 && xhr.status != 200) 
             { // En cas d'erreur !
     
                     alert('Une erreur est survenue !\n\nCode :' + xhr.status + '\nTexte : ' + xhr.statusText);
             }
        };
 
        xhr.send(null);
}


function get_all_room(callback)
{
    var xhr_refresh = new XMLHttpRequest();
        xhr_refresh.open('GET', serveur + '/PHP/controller/room.controller.php?action=get_all_rooms');
        xhr_refresh.onreadystatechange = function()
        {
            if (xhr_refresh.readyState == 4 && xhr_refresh.status == 200)
            {
                 
                 rooms = JSON.parse(xhr_refresh.responseText);
                   if(rooms[0]["number"] > 0)
                   {
                        analyze_room(rooms, 'id_sleep_room');
                   }

                   if(callback)
                   {
                        callback();
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

function analyze_room(rooms,id_select,callback)
{
    for(var i=1; i<=rooms[0]["number"]; i++)
    {
        display_room(rooms[i]["id_room"],rooms[i]["name"], id_select,callback);
    }
}

function display_room(id,name,id_select,callback)
{
    var element = document.createElement('option');

    element.value = id;
    element.text = name;
   
    document.getElementById(id_select).appendChild(element);
    if(callback)
    {
        callback();
    }


}
