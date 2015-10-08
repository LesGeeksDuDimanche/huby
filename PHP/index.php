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

    <link rel="stylesheet" href="css/panel.css" />
    <link rel="stylesheet"  href="css/theme.css" />

    <script type="text/javascript" src="JS/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="JS/bootstrap.min.js"></script>
    <script type="text/javascript" src="JS/electric_device.js"></script>
     <script type="text/javascript" src="JS/meteo.js"></script>
      <script type="text/javascript" src="JS/reveil.js"></script>
     <script type="text/javascript" src="JS/music.js"></script>
     <script type="text/javascript" src="JS/geoloc.js"></script>
  </head>
  <body role="document">


   <?php include_once("navbar.php"); ?>



<div class="container theme-showcase" role="main">

       <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
      <div class="container">
         <img src="" id="weather_icon" />
        <h1 id="date_french">Bonjour <?php echo $user->user_surname; ?> !</h1>

        <p id="weather_p"></p>
        <p><a href="#" class="btn btn-primary btn-large">Plus d'infos</a></p>

      </div>
    </div>

    <div class="container">
      <!-- Example row of columns -->
      <div class="row">
        <div class="col-md-4">
          <h2>Réveil</h2>
           <p id="reveil_p"></p>
          <p><a class="btn btn-default" role="button" href="alarmes.php">Régler les réveils</a></p>
        </div>
        <div class="col-md-4">
             <h2>Appareils</h2>
          <p id="electric_devices_p">
          <table class="table-condensed" id="electric_devices_table">
          </table></p>
          <?php if( isset($_COOKIE['user']) && $user->check_cookies($_COOKIE['user']) && $user->check_if_admin($_COOKIE['user']) )
                    {
                        ?>
              <p><a class="btn btn-default" role="button" href="devices.php">Ajouter un appareil</a></p>
              <?php } ?>
       </div>
        <div class="col-md-4">
          <h2>Musique</h2>
          <p id="music_p"><!--<div><button id="start_music" class="btn">Lancer musique</button></div>
            <br />
          <div><button id="stop_music" class="btn">Couper musique</button></div>-->
         <button type="button" class="btn btn-default btn-lg" id="start_music"> <img src="img/play_icon.png" width="17"/></button>
         <button type="button" class="btn btn-default btn-lg" id="previous_music"> <img src="img/previous_icon.png" width="17"/></button>
         <button type="button" class="btn btn-default btn-lg" id="pause_music"> <img src="img/pause_icon.png" width="17"/></button>
         <button type="button" class="btn btn-default btn-lg" id="next_music"> <img src="img/next_icon.png" width="17"/></button>
         <button type="button" class="btn btn-default btn-lg" id="stop_music"> <img src="img/stop_icon.png" width="17"/></button>
          </p>
        </div>
      </div>

      <hr>

      <footer>
        <p>© Gladys 2014</p>
      </footer>

    </div> <!-- /container -->


    </div>
  </body>
</html>