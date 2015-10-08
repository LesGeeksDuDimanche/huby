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
 
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var feedback = require('./disp.js');
var parametre = require('./parametre.js');
var motion_sensor = require('./motion_sensor.js');
var speak = require('./say.js');
var meteo = require('./meteo.js');
var sound = require('./play_sound.js');
var state = require('./state.js');
var music = require('./music.js');
var smart_wake_up = require('./smart_wake_up.js');
var URL_SERV = parametre.getURL_SERV();
var temps_avant_annulation_reveil = 12*60*60*1000;


exports.wakeup = function ()
{
    
   motion_sensor.number_of_sensors(function(number) 
   { 
   		if(number > 0)
   		{
   			motion_sensor.get_last_motion(function(last_motion_date,err)
		    {
		        
		        if(!err)
		        {
			        last_motion = last_motion_date.getTime();
			        var date_now = new Date();  
			        now = date_now.getTime();
			        if(now-last_motion < temps_avant_annulation_reveil )
			        {
			            motion_sensor.stop_motion_sensor(function()
			            {
			                motion_sensor.launch_motion_sensor();
			            });
			            smart_wake_up.smart_wakeup();
			            
			        }
					else
			        {
			            // PUSHOVER ICI
			        }
		        }
		        else
		        {
		        	smart_wake_up.smart_wakeup();
		        }
   			});
   		}
   		else
   		{
   			smart_wake_up.smart_wakeup();
   		}
   });
    
}