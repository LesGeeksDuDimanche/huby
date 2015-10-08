<?php $admin_zone = true; include_once('security.php'); ?>
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
<!DOCTYPE html>
<html>
  <head>
    <title><?php echo $user->assistant_name; ?></title>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type">
    
   <link rel="stylesheet" href="css/bootstrap.css" />
      <link rel="stylesheet"  href="css/theme.css" />

      <script type="text/javascript" src="JS/bootstrap.js"></script> 
      <script type="text/javascript" src="JS/devices.js"></script> 
      <script type="text/javascript" src="JS/sensors.js"></script> 
  </head>
  <body>
    <?php include_once("navbar.php"); ?>
   <div class="container theme-showcase" role="main">
      <div class="jumbotron">
          <div class="container">
        <h2>Appareils</h2>
        <p>Vous pouvez ici déclarer vos appareils électriques branchés sur des prises télécommandées</p>
        <small class="bg-info">Le code correspond aux 5 premiers chiffres de votre prise (par exemple "01111"), et le numéro à la lettre ( A=1, B=2, etc... ). Plus d'infos <a href="http://intelligenceonline.synergize.co/news/gerer-les-appareils-electrique">ici</a>.</small>
      <table  class="table table-striped">  
        <tbody id="table_devices">
        <tr>
          <th>Nom</th>
          <th>Code</th>
          <th>Numéro</th>
          <th>Pièce</th>
          <th>Modifier</th>
        </tr>
        <tr>
          <td><input type="text" id="name" placeholder="Nom" class="form-control"/></td>
          <td><input type="number" id="code" placeholder="Code" class="form-control" /></td>
          <td><input type="number" id="number" placeholder="Numéro" class="form-control" /></td>
          <td><select id="id_room" class="form-control" >
            </select></td>
          <td><input type="submit" id="submit" value="Ajouter"  class="btn btn-sm btn-success"/></td>
        </tr>
         <tbody>
      </table>

      <h2>Capteurs</h2>
      <table  class="table table-striped">  
        <tbody id="table_sensors">
        <tr>
          <th>Nom</th>
          <th>Code</th>
          <th>Pièce</th>
          <th>Modifier</th>
        </tr>
        <tr>
          <td><input type="text" id="name_sensor" placeholder="Nom" class="form-control"/></td>
          <td><input type="number" id="code_sensor" placeholder="Code" class="form-control" /></td>
          <td><select id="id_room_sensor" class="form-control" >
            </select></td>
          <td><input type="submit" id="submit_sensor" value="Ajouter"  class="btn btn-sm btn-success"/></td>
        </tr>
         <tbody>
      </table>
      </div>
    </div>
  </div>
  </body>
</html>