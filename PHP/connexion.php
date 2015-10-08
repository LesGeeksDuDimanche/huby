<?php 
include_once("class/User.class.php");
$user = new User("parametres/connexion_bdd1.php");
if(isset($_POST['user']) && isset($_POST['password']))
{
    if($user->connexion($_POST['user'],$_POST['password']))
    {
        header("Location: index.php");
    }
    else
    {
        $infos = "Mot de passe ou nom invalide.";
    }
}
else if(isset($_GET['action']) && $_GET['action'] == "log_out")
{
    $user->log_out();
}

?>

<!DOCTYPE html>
<html>
  <head>
    <title>Connexion</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/signin.css" rel="stylesheet">
  </head>

  <body>

    <div class="container">

      <form class="form-signin" role="form" method="post" >
        <h2 class="form-signin-heading">Connectez-vous :</h2>
        <input type="text" name="user" class="form-control" placeholder="Nom d'utilisateur" required autofocus>
        <input type="password" name="password" class="form-control" placeholder="Mot de passe" required>
        <input class="btn btn-lg btn-primary btn-block" type="submit" value="Connexion" />
      </form>

    </div>
  </body>
</html>