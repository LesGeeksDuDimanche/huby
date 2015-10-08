

    <!-- Fixed navbar -->
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#"><?php echo $user->assistant_name; ?></a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
               <li id="accueil_nav"><a href="index.php">Accueil</a></li>
               <li id="alarme_nav"><a href="alarmes.php">Mes Alarmes</a></li>
               <li id="module_nav"><a href="modules.php">Mes Modules</a></li>
                <? if( isset($_COOKIE['user']) && $user->check_cookies($_COOKIE['user']) && $user->check_if_admin($_COOKIE['user']) )
                    {
                        ?>
                  <li id="user_nav"><a href="users.php">Utilisateurs</a></li>
                  <li id="room_nav"><a href="rooms.php">Votre logement</a></li>
                  <li id="device_nav"><a href="devices.php">Appareils électriques</a></li>
                    <?php
                  }
                  ?>
          </ul>

          <ul class="nav navbar-nav navbar-right">
            <li><a href="connexion.php?action=log_out">Déconnexion</a></li>
          </ul>


        </div><!--/.nav-collapse -->
      </div>
    </div>