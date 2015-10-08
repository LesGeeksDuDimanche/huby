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
var fs = require('fs');
var parametre = require('./parametre.js');

var path = parametre.getPath();

exports.getVersion = function(callback)
{
	fs.readFile(path + '/manifest.json',{encoding: 'utf-8'}, function (err, data) {
	 	if (err)
	 	{ feedback.disp(err); 
	 	}
	 	else
	 	{
	 		var donnees = JSON.parse(data);
			  if(callback)
			  {
			  		callback(donnees['version'], donnees['License']);
			  }

	 	}
	  
	});
}