<?php

			// INFORMATIONS A REMPLIR CI-DESSOUS : 


			$this->dbname = "huby"; // remplir ici le nom de votre base de donnée (une nouvelle de préférence)
			$this->username = "root"; // le username pour vous connecter
			$this->password = "root"; // votre mot de passe

			

			// FIN DES INFOS A REMPLIR !

			// connexion à la base de donnée
                try
				{
					$this->bdd = new PDO('mysql:host=localhost;dbname='.$this->dbname, $this->username, $this->password);
				}
				catch (Exception $e)
				{
						die('Erreur : ' . $e->getMessage());

				}

