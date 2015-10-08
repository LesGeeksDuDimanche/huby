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

document.getElementById('alarme_nav').className = "active";
refresh();
 var savebutton = document.getElementById('submit');
  savebutton.addEventListener('click', new_alarm);

});



function refresh()
{
     var xhr_refresh = new XMLHttpRequest();
        xhr_refresh.open('GET', serveur + '/PHP/controller/action.controller.php?action=all_alarme_user');
        xhr_refresh.onreadystatechange = function()
        {
            if (xhr_refresh.readyState == 4 && xhr_refresh.status == 200)
            {
                 
                 var alarmes = JSON.parse(xhr_refresh.responseText);
                   if(alarmes[0]["number"] > 0)
                   {
                        analyze_alarme(alarmes);
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



function analyze_alarme(alarme)
{
    for(var i=1; i<=alarme[0]["number"]; i++)
    {
        display_alarme(alarme[i]["id_alarme"],alarme[i]["date"],alarme[i]["time"],alarme[i]["action"], alarme[i]["status"], alarme[i]["recurring"]);
    }
}




function display_alarme(id,date,time,action,status,recurring)
{
	var element = document.createElement('tr');
    //var id_element = document.createElement('td');
	var date_element = document.createElement('td');
    var date_box = document.createElement('input');
    var time_element = document.createElement('td');
    var time_box = document.createElement('input');
    var action_element = document.createElement('td');
    var action_box = document.createElement('input');
    var status_element = document.createElement('td');
    var status_box = document.createElement('select');
    var status_option = document.createElement('option');
    var status_option2 = document.createElement('option');
    var recurring_element = document.createElement('td');
    var recurring_box = document.createElement('select');
        var recurring_option1 = document.createElement('option');
        var recurring_option2 = document.createElement('option');
        var recurring_option3 = document.createElement('option');
        var recurring_option4 = document.createElement('option');
        var recurring_option5 = document.createElement('option');
        var recurring_option6 = document.createElement('option');
        var recurring_option7 = document.createElement('option');
        var recurring_option8 = document.createElement('option');
    var delete_element = document.createElement('td');
    var delete_button = document.createElement('button');

    date_box.type = "date";
    time_box.type = "time";
    action_box.type = "number";
    recurring_box.type= "number";

    date_box.className = "form-control";
    time_box.className = "form-control";
    action_box.className = "form-control";
    status_box.className = "form-control";
    recurring_box.className = "form-control";
    delete_button.className = "btn btn-sm btn-danger";

   // id_element.innerHTML = id;
    date_box.value = date; 
    time_box.value= time;
    action_box.value = action; 
    //status_box.value = status; 
    recurring_box.value=recurring;
    delete_button.innerText = "Supprimer";
    document.getElementById('table_alarmes').appendChild(element); 
    status_option.value = 1;
    status_option2.value = 0;
    status_option.innerText = "Activée";
    status_option2.innerText = "Désactivée";

    recurring_option1.value = -1;
    recurring_option2.value = 0;
    recurring_option3.value = 1;
    recurring_option4.value = 2;
    recurring_option5.value = 3;
    recurring_option6.value = 4;
    recurring_option7.value = 5;
    recurring_option8.value = 6;
    recurring_option1.text = "Pas de récurrence";
    recurring_option2.text = "Dimanche";
    recurring_option3.text = "Lundi";
    recurring_option4.text = "Mardi";
    recurring_option5.text = "Mercredi";
    recurring_option6.text = "Jeudi";
    recurring_option7.text = "Vendredi";
    recurring_option8.text = "Samedi";


    recurring_box.appendChild(recurring_option1);
    recurring_box.appendChild(recurring_option2);
    recurring_box.appendChild(recurring_option3);
    recurring_box.appendChild(recurring_option4);
    recurring_box.appendChild(recurring_option5);
    recurring_box.appendChild(recurring_option6);
    recurring_box.appendChild(recurring_option7);
    recurring_box.appendChild(recurring_option8);

    status_box.appendChild(status_option);
    status_box.appendChild(status_option2);

    date_element.appendChild(date_box);
    time_element.appendChild(time_box);
    action_element.appendChild(action_box);
    status_element.appendChild(status_box);
    recurring_element.appendChild(recurring_box);
    delete_element.appendChild(delete_button);


	//element.appendChild(id_element); 
    element.appendChild(date_element);
    element.appendChild(time_element);
    element.appendChild(action_element); 
    element.appendChild(status_element);  
    element.appendChild(recurring_element); 
    element.appendChild(delete_element); 

    status_box.value= status;
    recurring_box.value = recurring;

    date_box.addEventListener('change', function(){
                          update_alarme(id,date_box,time_box,action_box,status_box,recurring_box );
                         });
     time_box.addEventListener('change', function(){
                          update_alarme(id,date_box,time_box,action_box,status_box,recurring_box );
                         });
      action_box.addEventListener('change', function(){
                          update_alarme(id,date_box,time_box,action_box,status_box,recurring_box );
                         });
       status_box.addEventListener('change', function(){
                          update_alarme(id,date_box,time_box,action_box,status_box,recurring_box );
                         });
        recurring_box.addEventListener('change', function(){
                          update_alarme(id,date_box,time_box,action_box,status_box,recurring_box );
                         });

     delete_button.addEventListener('click', function(){
                          delete_alarme(id,element);
                         });

}

function update_alarme(id,date_box,time_box,action_box,status_box,recurring_box )
{
    var date = date_box.value; 
    var hour = time_box.value;
    var action = action_box.value;
    var status = status_box.value;
    var recurring = recurring_box.value;

     var xhr_update = new XMLHttpRequest();
        xhr_update.open('GET', serveur + '/PHP/controller/action.controller.php?action=update_alarm&date=' + encodeURIComponent(date) + '&id='+id+ '&hour=' + encodeURIComponent(hour) + '&action_alarme=' + encodeURIComponent(action) + '&status=' + status + '&recurring=' + encodeURIComponent(recurring));
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

function new_alarm()
{
    var date = document.getElementById('date').value;
    var hour = document.getElementById('hour').value;
    var action = document.getElementById('action').value;
    var recurring = document.getElementById('recurring').value;
    var xhr_create = new XMLHttpRequest();
        xhr_create.open('GET', serveur + '/PHP/controller/action.controller.php?action=create_alarme&date=' + encodeURIComponent(date) + '&hour=' + encodeURIComponent(hour) + '&action_alarme=' + encodeURIComponent(action) + '&status=1' + '&recurring=' + encodeURIComponent(recurring));
        xhr_create.onreadystatechange = function()
        {
            if (xhr_create.readyState == 4 && xhr_create.status == 200)
            {
                 
                 //alert('Alarme enregistrée !');
                 var id = parseInt(xhr_create.responseText);
                 var time = hour;
                    display_alarme(id,date,time,action,status,recurring);

            }
             else if(xhr_create.readyState == 4 && xhr_create.status != 200) 
             { // En cas d'erreur !
     
                     alert('Une erreur est survenue !\n\nCode :' + xhr_create.status + '\nTexte : ' + xhr_create.statusText);
             }
        };
 
        xhr_create.send(null);

}

function delete_alarme(id,element)
{
    var xhr = new XMLHttpRequest();
        xhr.open('GET', serveur + '/PHP/controller/action.controller.php?action=delete_alarme&id_alarme=' + id );
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState == 4 && xhr.status == 200)
            {
                 element.parentNode.removeChild(element);
                 //alert('Alarme supprimée !');
                

            }
             else if(xhr.readyState == 4 && xhr.status != 200) 
             { // En cas d'erreur !
     
                     alert('Une erreur est survenue !\n\nCode :' + xhr.status + '\nTexte : ' + xhr.statusText);
             }
        };
 
        xhr.send(null);
}
