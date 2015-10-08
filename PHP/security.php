<?php
	
	include_once("class/Installation.class.php");
	$installation = new Installation("parametres/connexion_bdd1.php");
	ini_set('display_errors', 1);

	if($installation->table_exist())
	{
		include_once("class/User.class.php");
		$user = new User("parametres/connexion_bdd1.php");

		if($user->connect())
		{
			if(isset($admin_zone) && $admin_zone)
			{
				if(!(isset($_COOKIE['user']) && $user->check_cookies($_COOKIE['user']) && $user->check_if_admin($_COOKIE['user'])))
				{
					header("Location: index.php");
				}
			}
		}
		else
		{
			header("Location: connexion.php");
		}
	}
	else // Sinon on redirige vers l'assistant d'installation
	{	
		header("Location: installation.php");
	}
	