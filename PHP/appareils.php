<?php include_once('security.php'); ?>
<!DOCTYPE html>
<html>
  <head>
    <title><?php echo $user->assistant_name; ?></title>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type">
    
     <link rel="stylesheet" href="css/bootstrap.css" />
      <link rel="stylesheet" href="css/bootstrap-responsive.css" />
       <style type="text/css">
          body {
            padding-top: 60px;
            padding-bottom: 40px;
          }
        </style>
      <script type="text/javascript" src="JS/bootstrap.js"></script> 
      <script type="text/javascript" src="JS/users.js"></script> 
  </head>
  <body>
    <?php include_once("navbar.php"); ?>
     <div class="container">
       <div class="hero-unit">
        <h2>Utilisateurs</h2>
      <table id="table_users" class="table table-striped">  
        <tr>
          <th>Prénom</th>
          <th>Mot de passe</th>
          <th>Type</th>
          <th>Chambre</th>
          <th>Modifier</th>
        </tr>
        <tr>
          <td><input type="text" id="surname" placeholder="Prénom" /></td>
          <td><input type="password" id="password" placeholder="Mot de passe" /></td>
          <td><select id="type" class="input-small" >
              <option value="2">Habitant</option>
              <option value="1">Administrateur</option>
              <option value="0">Super-User ( Jarvis only )</option>
              <option value="3">Invité</option>
            </select></td>
          <td><select id="id_sleep_room" class="input-medium" >
            </select></td>
          <td><input type="submit" id="submit" value="Ajouter"/></td>
        </tr>
      </table>
</div>
</div>
  </body>
</html>