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

document.getElementById('user_nav').className = "active";

get_all_room(function () { refresh(); });
 var savebutton = document.getElementById('submit');
  savebutton.addEventListener('click', new_user);

});



function refresh()
{
     var xhr_refresh = new XMLHttpRequest();
        xhr_refresh.open('GET', serveur + '/PHP/controller/user.controller.php?action=get_all_users');
        xhr_refresh.onreadystatechange = function()
        {
            if (xhr_refresh.readyState == 4 && xhr_refresh.status == 200)
            {
                 var users = JSON.parse(xhr_refresh.responseText);
                   if(users[0]["number"] > 0)
                   {
                        analyze_user(users);
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



function analyze_user(users)
{
    for(var i=1; i<=users[0]["number"]; i++)
    {
        display_user(users[i]["id_user"],users[i]["surname"],users[i]["type"],users[i]["id_sleep_room"] );
    }
}




function display_user(id,surname,type,id_sleep_room)
{
	var element = document.createElement('tr');
    //var id_element = document.createElement('td');
	var surname_element = document.createElement('td');
    var surname_box = document.createElement('input');
    var type_element = document.createElement('td');
    var type_box = document.createElement('select');
    var type_option1 = document.createElement('option');
    var type_option2 = document.createElement('option');
    var type_option3 = document.createElement('option');
    var type_option4 = document.createElement('option');
    var password_element = document.createElement('td');
    //var password_box = document.createElement('input');
    var id_sleep_room_element = document.createElement('td');
    var id_sleep_room_box = document.createElement('select');
    var id_sleep_room_default_option = document.createElement('option');

    var delete_element = document.createElement('td');
    var delete_button = document.createElement('button');

    surname_box.type = "text";
    type_box.type = "number";
    type_box.className = "form-control";
    surname_box.className = "form-control";
    id_sleep_room_box.className = "form-control";
    delete_button.className = "btn btn-sm btn-danger";
    id_sleep_room_box.id= id + '_sleep_box_id';
   // id_element.innerHTML = id;
    surname_box.value = surname; 
    type_box.value= type;
    delete_button.innerText = "Supprimer";
    type_option1.value = 2;
    type_option2.value = 1;
    type_option3.value = 0;
    type_option4.value = 3;
    type_option1.text = "Habitant";
    type_option2.text = "Administrateur";
    type_option3.text = "Super-User ( Jarvis only )";
    type_option4.text = "Invité";

    id_sleep_room_default_option.value = "0";
    id_sleep_room_default_option.text = "----";

    type_box.appendChild(type_option1);
    type_box.appendChild(type_option2);
    type_box.appendChild(type_option3);
    type_box.appendChild(type_option4);

    id_sleep_room_box.appendChild(id_sleep_room_default_option);

    document.getElementById('table_users').appendChild(element); 

    surname_element.appendChild(surname_box);
    type_element.appendChild(type_box);
    delete_element.appendChild(delete_button);
    id_sleep_room_element.appendChild(id_sleep_room_box);


	//element.appendChild(id_element); 
    element.appendChild(surname_element);
    element.appendChild(password_element); 
    element.appendChild(type_element);
    element.appendChild(id_sleep_room_element);

    element.appendChild(delete_element);
    type_box.value = type;
    analyze_room(rooms,id_sleep_room_box.id, function () {
        if(room_exist(id_sleep_room))
        {
           id_sleep_room_box.value = id_sleep_room; 
        }
        else
        {
            id_sleep_room_box.value = id_sleep_room_default_option.value;
        }
        

    });

    surname_box.addEventListener('change', function(){
                          update_user(id, surname_box, type_box,id_sleep_room_box);
                         });
    type_box.addEventListener('change', function(){
                          update_user(id, surname_box, type_box,id_sleep_room_box);
                         });
    id_sleep_room_box.addEventListener('change', function(){
                          update_user(id, surname_box, type_box,id_sleep_room_box);
                         });
        
     delete_button.addEventListener('click', function(){
                          delete_user(id,element);
                         });

}

function update_user(id, surname_box, type_box,id_sleep_room_box)
{
    var surname = surname_box.value;
    var type = type_box.value;
    var id_sleep_room =  id_sleep_room_box.value;
     var xhr_update = new XMLHttpRequest();
        xhr_update.open('GET', serveur + '/PHP/controller/user.controller.php?action=update_user&surname=' + encodeURIComponent(surname) + '&id=' + id + '&type=' + type + '&id_sleep_room=' +encodeURIComponent(id_sleep_room));
        xhr_update.onreadystatechange = function()
        {
            if (xhr_update.readyState == 4 && xhr_update.status == 200)
            {
                

            }
             else if(xhr_update.readyState == 4 && xhr_update.status != 200) 
             { // En cas d'erreur !

             }
        };
 
        xhr_update.send(null);
}

function new_user()
{
    var surname = document.getElementById('surname').value;
    var type = document.getElementById('type').value;
    var password = document.getElementById('password').value;
    var id_sleep_room = document.getElementById('id_sleep_room').value;
    var xhr_create = new XMLHttpRequest();
        xhr_create.open('GET', serveur + '/PHP/controller/user.controller.php?action=create_user&surname=' + encodeURIComponent(surname) + '&type=' + encodeURIComponent(type) + '&password=' + encodeURIComponent(password) + '&id_sleep_room=' + id_sleep_room );
        xhr_create.onreadystatechange = function()
        {
            if (xhr_create.readyState == 4 && xhr_create.status == 200)
            {
                var id = parseInt(xhr_create.responseText);
                display_user(id,surname,type);
                document.getElementById('surname').value = "";
                document.getElementById('password').value = "";
                document.getElementById('type').value = "2";

            }
             else if(xhr_create.readyState == 4 && xhr_create.status != 200) 
             { // En cas d'erreur !
     
                     alert('Une erreur est survenue !\n\nCode :' + xhr_create.status + '\nTexte : ' + xhr_create.statusText);
             }
        };
 
        xhr_create.send(null);

}

function delete_user(id,element)
{
    var xhr = new XMLHttpRequest();
        xhr.open('GET', serveur + '/PHP/controller/user.controller.php?action=delete_user&id_user=' + id );
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

function room_exist(id_room)
{
    for(var i=1; i<=rooms[0]["number"]; i++)
    {
        if(rooms[i]["id_room"] == id_room)
        {
            return true;
        }
    }

    return false;
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
