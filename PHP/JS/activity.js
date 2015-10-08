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



var last_action = "depart";

document.addEventListener('DOMContentLoaded', function () {

refresh();

});


var serveur = "http://127.0.0.1/huby";

function refresh()
{
     var xhr_refresh = new XMLHttpRequest();
        xhr_refresh.open('GET', serveur + '/PHP/controller/action.controller.php?action=get_activity');
        xhr_refresh.onreadystatechange = function()
        {
            if (xhr_refresh.readyState == 4 && xhr_refresh.status == 200)
            {
                 
                 var activity = JSON.parse(xhr_refresh.responseText);
                   if(activity[0]["number"] > 0)
                   {
                        analyze_activity(activity);
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

function analyze_activity(activity)
{
    for(var i=1; i<=activity[0]["number"]; i++)
    {
        display_activity(activity[i]["id_activity"],activity[i]["date"],activity[i]["action"]);
    }
}




function display_activity(id,date,action)
{
	 switch(action)
      {
      case 1:
              var element = document.createElement('tr');
              var presence_element = document.createElement('td');
              presence_element.innerHTML = date;
              document.getElementById('table_activity_presence').appendChild(element); 
              element.appendChild(presence_element); 

         last_action = "retour";
      break;
      case 3:
        if(last_action == "retour")
         {
              var table = document.getElementById('table_activity_presence');
              var ligne = table.getElementsByTagName('td');
              var last_ligne = ligne.lastChild;
              last_ligne.innerHTML += " - " + date;  
         }
         else
         {
             var element = document.createElement('tr');
              var presence_element = document.createElement('td');
              presence_element.innerHTML = "        - "+date;
              document.getElementById('table_activity_presence').appendChild(element); 
              element.appendChild(presence_element); 
         }
           last_action = "depart";
        
        break;
      }


}
