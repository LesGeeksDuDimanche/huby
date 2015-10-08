<?php $admin_zone = true; include_once('security.php'); ?>
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

      <script type="text/javascript" src="JS/bootstrap.js"></script> 
      <script type="text/javascript" src="JS/rooms.js"></script> 
  </head>
  <body>
    <?php include_once("navbar.php"); ?>
     <div class="container theme-showcase" role="main">
      <div class="jumbotron">
          <div class="container">
        <h2>Pièces</h2>
      <table  class="table table-striped">  
        <tbody id="table_rooms">
        <tr>
          <th>Nom</th>
          <th>Modifier</th>
        </tr>
        <tr>
          <td><input type="text" id="name" placeholder="Nom de la pièce" class="form-control" /></td>
          <td><input type="submit" id="submit" value="Ajouter" class="btn btn-sm btn-success"/></td>
        </tr>
        </tbody>
      </table>
</div>
</div>
</div>
  </body>
</html>