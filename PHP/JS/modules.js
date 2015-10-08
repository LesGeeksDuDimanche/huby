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

document.getElementById('module_nav').className = "active";
refresh();
 var savebutton = document.getElementById('submit');
  savebutton.addEventListener('click', new_module);

});



function refresh()
{
     var xhr_refresh = new XMLHttpRequest();
        xhr_refresh.open('GET', serveur + '/PHP/controller/module.controller.php?action=get_all_modules');
        xhr_refresh.onreadystatechange = function()
        {
            if (xhr_refresh.readyState == 4 && xhr_refresh.status == 200)
            {
                 
                 var modules = JSON.parse(xhr_refresh.responseText);
                   if(modules[0]["number"] > 0)
                   {
                        analyze_module(modules);
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



function analyze_module(modules)
{
    for(var i=1; i<=modules[0]["number"]; i++)
    {
        display_module(modules[i]["id_module"],modules[i]["name"],modules[i]["link"],modules[i]["widget_path"] );
    }
}




function display_module(id,name,link, widget_path)
{
	var element = document.createElement('div');
    var panel = document.createElement('div');
    var panel_heading = document.createElement('div');
    var link_element = document.createElement('a');
	var name_element = document.createElement('h3');
    var delete_button = document.createElement('button');
    var panel_body = document.createElement('div');
    var script_element = document.createElement('script');

    script_element.type = 'text/javascript';
    script_element.src = serveur + "/PHP/minuteur/minuteur.js";
    element.className ="col-md-4";
    panel.className ="panel panel-default";
    panel_heading.className ="panel-heading";
    name_element.className ="panel-title";
    panel_body.className ="panel-body";
    delete_button.className ="btn btn-default btn-xs pull-right";
    delete_button.type="button";

    link_element.href= serveur+ link;
    link_element.innerText = name;
    delete_button.innerText = "Supprimer";

    get_widget_content(widget_path, function (content) {
        panel_body.innerHTML = content;

         element.appendChild(panel);
    
    
        panel.appendChild(panel_heading);
        panel_heading.appendChild(name_element);
        
        name_element.appendChild(link_element);
        name_element.appendChild(delete_button);
        panel.appendChild(panel_body);


        document.getElementById('module_zone').appendChild(element);

        
         element.appendChild(script_element);
        

         delete_button.addEventListener('click', function(){
                              delete_module(id,element);
                             });
    });

    
   



}

function get_widget_content(path,callback)
{
    var xhr_get = new XMLHttpRequest();
        xhr_get.open('GET', serveur + path);
        xhr_get.onreadystatechange = function()
        {
            if (xhr_get.readyState == 4 && xhr_get.status == 200)
            {
                 
                 var widget_content = xhr_get.responseText
                if(callback)
                {
                    callback(widget_content);
                }

            }
             else if(xhr_get.readyState == 4 && xhr_get.status != 200) 
             { // En cas d'erreur !
     
                     alert('Une erreur est survenue !\n\nCode :' + xhr_get.status + '\nTexte : ' + xhr_get.statusText);
             }
        };
 
        xhr_get.send(null);
 
}

function update_module(id, name_box)
{
    var name = name_box.value; 
     var xhr_update = new XMLHttpRequest();
        xhr_update.open('GET', serveur + '/PHP/controller/module.controller.php?action=update_module&name=' + encodeURIComponent(name) + '&id=' + id );
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

function new_module()
{
    var name = document.getElementById('name_module').value;
    var link = document.getElementById('link_module').value;
    var widget_path = document.getElementById('widget_path').value;
    var xhr_create = new XMLHttpRequest();
        xhr_create.open('GET', serveur + '/PHP/controller/module.controller.php?action=create_module&name=' + encodeURIComponent(name) + '&link='+ encodeURIComponent(link)+ '&widget_path=' + encodeURIComponent(widget_path) );
        xhr_create.onreadystatechange = function()
        {
            if (xhr_create.readyState == 4 && xhr_create.status == 200)
            {
                var id = parseInt(xhr_create.responseText);
                display_module(id,name,link, widget_path);
                document.getElementById('name_module').value = "";
                document.getElementById('link_module').value = "";
                document.getElementById('widget_path').value = "";

            }
             else if(xhr_create.readyState == 4 && xhr_create.status != 200) 
             { // En cas d'erreur !
     
                     alert('Une erreur est survenue !\n\nCode :' + xhr_create.status + '\nTexte : ' + xhr_create.statusText);
             }
        };
 
        xhr_create.send(null);

}

function delete_module(id,element)
{
    var xhr = new XMLHttpRequest();
        xhr.open('GET', serveur + '/PHP/controller/module.controller.php?action=delete_module&id_module=' + id );
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
