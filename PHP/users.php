<?php $admin_zone = true; include_once('security.php'); ?>
<!DOCTYPE html>
<html>
  <head>
    <title><?php echo $user->assistant_name; ?></title>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type">
    
   <link rel="stylesheet" href="css/bootstrap.css" />
      <link rel="stylesheet"  href="css/theme.css" />

      <script type="text/javascript" src="JS/bootstrap.js"></script> 
      <script type="text/javascript" src="JS/users.js"></script> 
  </head>
  <body>
    <?php include_once("navbar.php"); ?>
   <div class="container theme-showcase" role="main">
      <div class="jumbotron">
          <div class="container">
        <h2>Utilisateurs</h2>
      <table  class="table table-striped">  
        <tbody id="table_users">
        <tr>
          <th>Prénom</th>
          <th>Mot de passe</th>
          <th>Type</th>
          <th>Chambre</th>
          <th>Modifier</th>
        </tr>
        <tr>
          <td><input type="text" id="surname" placeholder="Prénom" class="form-control"/></td>
          <td><input type="password" id="password" placeholder="Mot de passe" class="form-control" /></td>
          <td><select id="type" class="form-control" >
              <option value="2">Habitant</option>
              <option value="1">Administrateur</option>
              <option value="0">Super-User ( Jarvis only )</option>
              <option value="3">Invité</option>
            </select></td>
          <td><select id="id_sleep_room" class="form-control" >
            </select></td>
          <td><input type="submit" id="submit" value="Ajouter"  class="btn btn-sm btn-success"/></td>
        </tr>
         <tbody>
      </table>
      </div>
    </div>
  </div>
  </body>
</html>