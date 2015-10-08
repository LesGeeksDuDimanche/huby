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


document.addEventListener('DOMContentLoaded', function () {
//var serveur = "http://127.0.0.1";

 serveur = "http://" + location.host + "/huby";


refresh_reveil();

});

function refresh_reveil()
{
	var url = serveur + '/PHP/controller/action.controller.php?action=next_wake_up&phrase=oui';
	var xhr = new XMLHttpRequest();
                     xhr.open('GET', url );
                      xhr.onreadystatechange = function() 
                         {
                            if (xhr.readyState == 4 && xhr.status == 200) 
                            {
                                var donneesreveil = JSON.parse(xhr.responseText);
                                if(donneesreveil != null)
                                {
                                        var text = "Prochain réveil : " + donneesreveil;
                                }
                                else
                                {
                                    text = "Pas de réveil aujourd'hui ni demain.";
                                }
                                disp_reveil(text);

                            }
                            else if(xhr.readyState == 4 && xhr.status != 200) 
                            { // En cas d'erreur !
        
                               return "ERROR";
 
                            }

                        }
                        xhr.send(null);
}

function disp_reveil(text)
{
    var reveil_p = document.getElementById("reveil_p");
    reveil_p.innerText = text;
}
