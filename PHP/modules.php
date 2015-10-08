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
      <link rel="stylesheet"  href="css/modules.css" />

      <script type="text/javascript" src="JS/bootstrap.js"></script> 
      <script type="text/javascript" src="JS/modules.js"></script> 
  </head>
  <body>
    <?php include_once("navbar.php"); ?>
     <div class="container theme-showcase" role="main">
      <div class="jumbotron">
          <div class="container">
        <h2>Modules</h2>
        <div class="row">
          <div class="col-md-2"><input type="text" id="name_module" placeholder="Nom du module" class="form-control" /></div>
          <div class="col-md-4"><input type="text" id="link_module" placeholder="Lien vers le module (relatif)" class="form-control" /></div>
          <div class="col-md-4"><input type="text" id="widget_path" placeholder="Chemin du widget HTML (relatif)" class="form-control" /></div>
          <input type="submit" id="submit" value="Ajouter" class="btn btn-sm btn-success"/>
        </div>
</div>
</div>


    <div id="module_zone">

     

    </div>

</div>
  </body>
</html>