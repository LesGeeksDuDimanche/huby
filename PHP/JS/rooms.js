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

 * Contact : projecthuby@gmail.com

 * 
 * ========================================================== */


var serveur;


document.addEventListener('DOMContentLoaded', function () {
//var serveur = "http://127.0.0.1";

 serveur = "http://" + location.host + "/huby";

document.getElementById('room_nav').className = "active";
refresh();
 var savebutton = document.getElementById('submit');
  savebutton.addEventListener('click', new_room);

});



function refresh()
{
     var xhr_refresh = new XMLHttpRequest();
        xhr_refresh.open('GET', serveur + '/PHP/controller/room.controller.php?action=get_all_rooms');
        xhr_refresh.onreadystatechange = function()
        {
            if (xhr_refresh.readyState == 4 && xhr_refresh.status == 200)
            {
                 
                 var rooms = JSON.parse(xhr_refresh.responseText);
                   if(rooms[0]["number"] > 0)
                   {
                        analyze_room(rooms);
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



function analyze_room(rooms)
{
    for(var i=1; i<=rooms[0]["number"]; i++)
    {
        display_room(rooms[i]["id_room"],rooms[i]["name"]);
    }
}




function display_room(id,name)
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

    name_box.addEventListener('change', function(){
                          update_room(id,name_box);
                         });
        
     delete_button.addEventListener('click', function(){
                          delete_room(id,element);
                         });

}

function update_room(id, name_box)
{
    var name = name_box.value; 
     var xhr_update = new XMLHttpRequest();
        xhr_update.open('GET', serveur + '/PHP/controller/room.controller.php?action=update_room&name=' + encodeURIComponent(name) + '&id=' + id );
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
                display_room(id,name);
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
