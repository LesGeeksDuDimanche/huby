<?php include_once('security.php'); ?>
<!DOCTYPE html>
<!-- ===================================================
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
 * ========================================================== -->
<html>
	<head>
		<title><?php echo $user->assistant_name; ?></title>
		<meta content="text/html; charset=UTF-8" http-equiv="content-type">
		
	 <link rel="stylesheet" href="css/bootstrap.css" />

      <link rel="stylesheet"  href="css/theme.css" />
    	 <!--<style type="text/css">
		      body {
		        padding-top: 60px;
		        padding-bottom: 40px;
		      }
		    </style>-->
    	<script type="text/javascript" src="JS/bootstrap.js"></script> 
    	<script type="text/javascript" src="JS/alarmes.js"></script> 
	</head>
	<body>
		<?php include_once("navbar.php"); ?>

<div class="container theme-showcase" role="main">
			<div class="jumbotron">
		      <div class="container">
		        <h2>Mes Alarmes</h2>
			<table  class="table table-striped">	
				 <tbody id="table_alarmes">
				<tr>
					<th>Date</th>
					<th>Heure</th>
					<th>Action</th>
					<th>Statut</th>
					<th>Répéter</th>
					<th>Enregistrer</th>
				</tr>
				<tr>
					<td><input type="date" id="date" class="form-control" /></td>
					<td><input type="time" id="hour"   class="form-control" /></td>
					<td><input type="text" id="action" value ="1" class="form-control" /></td>
					<td><select id="status" class="form-control" >
						  <option value="1">Activée</option>
						  <option value="0">Désactivée</option>S
						</select>
					</td>
					<td><select id="recurring" class="form-control" >
						  <option value="-1">Pas de récurrence</option>
						  <option value="0">Dimanche</option>
						  <option value="1">Lundi</option>
						  <option value="2">Mardi</option>
						  <option value="3">Mercredi</option>
						  <option value="4">Jeudi</option>
						  <option value="5">Vendredi</option>
						  <option value="6">Samedi</option>
						</select></td>
					<td><input type="submit" id="submit"   class="btn btn-sm btn-success"/></td>
				</tr>
			</tbody>
			</table>
		        
		      </div>
		    </div>
		 </div>

		 
	</body>
</html>