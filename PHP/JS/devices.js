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
var rooms;
var select; 


document.addEventListener('DOMContentLoaded', function () {
//var serveur = "http://127.0.0.1";

serveur = "http://" + location.host + "/huby";

document.getElementById('device_nav').className = "active";

get_all_room(function () { refresh(); });
 var savebutton = document.getElementById('submit');
  savebutton.addEventListener('click', new_device);

});



function refresh()
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
                        analyze_device(devices);
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



function analyze_device(devices)
{
    for(var i=1; i<=devices[0]["number"]; i++)
    {
        display_device(devices[i]["id_device"],devices[i]["name"],devices[i]["code"],devices[i]["number"],devices[i]["id_room"] );
    }
}




function display_device(id,name,code,number,id_room)
{
	var element = document.createElement('tr');
    //var id_element = document.createElement('td');
	var name_element = document.createElement('td');
    var name_box = document.createElement('input');

    var code_element = document.createElement('td');
    var code_box = document.createElement('input');

    var number_element = document.createElement('td');
    var number_box = document.createElement('input');

    var id_room_element = document.createElement('td');
    var id_room_box = document.createElement('select');
    var id_room_default_option = document.createElement('option');

    var delete_element = document.createElement('td');
    var delete_button = document.createElement('button');

    name_box.type = "text";
    number_box.type = "number";
    code_box.type = "number";
    code_box.className = "form-control";
    number_box.className = "form-control";
    name_box.className = "form-control";
    id_room_box.className = "form-control";
    delete_button.className = "btn btn-sm btn-danger";
    id_room_box.id= id + '_sleep_box_id';
   // id_element.innerHTML = id;
    name_box.value = name; 
    code_box.value = code;
    number_box.value = number;

    delete_button.innerText = "Supprimer";


    id_room_default_option.value = "0";
    id_room_default_option.text = "----";

    id_room_box.appendChild(id_room_default_option);

    document.getElementById('table_devices').appendChild(element); 

    name_element.appendChild(name_box);
    code_element.appendChild(code_box);
    number_element.appendChild(number_box);
    delete_element.appendChild(delete_button);
    id_room_element.appendChild(id_room_box);


	//element.appendChild(id_element); 
    element.appendChild(name_element);
    element.appendChild(code_element); 
    element.appendChild(number_element);
    element.appendChild(id_room_element);

    element.appendChild(delete_element);
    analyze_room(rooms,id_room_box.id, function () {
        if(room_exist(id_room))
        {
           id_room_box.value = id_room; 
        }
        else
        {
            id_room_box.value = id_room_default_option.value;
        }
        

    });

    name_box.addEventListener('change', function(){
                          update_device(id,name_box,code_box,number_box,id_room_box);
                         });
    code_box.addEventListener('change', function(){
                          update_device(id,name_box,code_box,number_box,id_room_box);
                         });
    number_box.addEventListener('change', function(){
                          update_device(id,name_box,code_box,number_box,id_room_box);
                         });
    id_room_box.addEventListener('change', function(){
                          update_device(id,name_box,code_box,number_box,id_room_box);
                         });

        
     delete_button.addEventListener('click', function(){
                          delete_device(id,element);
                         });

}

function update_device(id,name_box,code_box,number_box,id_room_box )
{
    var name = name_box.value; 
    var code = code_box.value;
    var number = number_box.value;
    var id_room = id_room_box.value;

     var xhr_update = new XMLHttpRequest();
        xhr_update.open('GET', serveur + '/PHP/controller/electric_device.controller.php?action=update_device&name=' + encodeURIComponent(name) + '&id=' + id + "&code=" + code + '&number=' + number + '&id_room=' + id_room);
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

function new_device()
{
    var name = document.getElementById('name').value;
    var code = document.getElementById('code').value;
    var number = document.getElementById('number').value;
    var id_room = document.getElementById('id_room').value;
    var xhr_create = new XMLHttpRequest();
        xhr_create.open('GET', serveur + '/PHP/controller/electric_device.controller.php?action=insert_device&name=' + encodeURIComponent(name) + '&code=' + encodeURIComponent(code) + '&number=' + encodeURIComponent(number) + '&id_room=' + id_room );
        xhr_create.onreadystatechange = function()
        {
            if (xhr_create.readyState == 4 && xhr_create.status == 200)
            {
                var id = parseInt(xhr_create.responseText);
                display_device(id,name,code,number,id_room);
                document.getElementById('name').value = "";
                document.getElementById('code').value = "";
                document.getElementById('number').value = "";

            }
             else if(xhr_create.readyState == 4 && xhr_create.status != 200) 
             { // En cas d'erreur !
     
                     alert('Une erreur est survenue !\n\nCode :' + xhr_create.status + '\nTexte : ' + xhr_create.statusText);
             }
        };
 
        xhr_create.send(null);

}

function delete_device(id,element)
{
    var xhr = new XMLHttpRequest();
        xhr.open('GET', serveur + '/PHP/controller/electric_device.controller.php?action=delete_device&id_device=' + id );
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
                        analyze_room(rooms, 'id_room');
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
