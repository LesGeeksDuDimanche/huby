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

var version_manager = require('./gladys_version.js');



exports.Display_version = function()
{
	version_manager.getVersion(function(version, license) 
	{ 
	    console.log("############ GLADYS v." + version + " ############");
	    console.log("License " + license);
	    console.log("http://intelligenceonline.synergize.co");
	    console.log("######################################");

	});
}