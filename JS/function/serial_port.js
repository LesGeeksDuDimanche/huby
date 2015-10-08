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

var feedback = require('./disp.js');
var motion_sensor = require('./motion_sensor.js');

var serialport = require("serialport");
var SerialPort = serialport.SerialPort; 

var sp = new SerialPort("/dev/ttyACM0", {
  parser: serialport.parsers.readline("\n")
});

var last_time_data_received = new Array();
var time_before_new_receive = 1000;

sp.on("data", function (data) {


  var result = JSON.parse(data);
  if(result[0]['action'] == "received")
  {
  		var actual_time = (new Date()).getTime();

  		if( typeof(last_time_data_received[result[0]['value']]) == "undefined"  || (actual_time - last_time_data_received[result[0]['value']]) >= time_before_new_receive )
  		{
  			last_time_data_received[result[0]['value']] = (new Date()).getTime();
	  		motion_sensor.save_motion(result[0]['value']);
	  		feedback.disp("Signal reçu, code capteur reçu : "+ result[0]['value']);
  		}
  }
  
});

exports.write = function(text)
{
	sp.write(text);
}