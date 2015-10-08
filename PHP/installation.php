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
    <title>Votre assistant - Installation</title>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type">
    <link rel="stylesheet" href="css/bootstrap.css" />

    <link rel="stylesheet" href="css/installation.css" />
    <script type="text/javascript" src="JS/bootstrap.js"></script> 
    <script type="text/javascript" src="JS/installation.js"></script> 
  </head>
  <body role="document">


<header>
  <h1>Configuration de votre assistant domotique intelligent</h1>
</header>   

<div class="container" >

  <div class="stepwizard">
    <div class="stepwizard-row">
       <div class="stepwizard-step">
            <button type="button" class="btn btn-primary btn-circle" id="button_1">1</button>
            <p>Bienvenue</p>
        </div>
        <div class="stepwizard-step">
            <button type="button" class="btn btn-default btn-circle" id="button_2">2</button>
            <p>Votre assistant</p>
        </div>
        <div class="stepwizard-step">
            <button type="button" class="btn btn-default btn-circle" id="button_3">3</button>
            <p>Votre logement</p>
        </div> 
         <div class="stepwizard-step">
            <button type="button" class="btn btn-default btn-circle" id="button_4">4</button>
            <p>Compte administrateur</p>
        </div>
        <div class="stepwizard-step">
            <button type="button" class="btn btn-default btn-circle" id="button_5">5</button>
            <p>Finalisation</p>
        </div>
    </div>
</div>

     <!-- STEP 1 -->

    <div class="row" id="step1">
        <div class="col-md-8 col-md-offset-2">
          <div class="well well-sm">

            <fieldset>
              <legend class="text-center">Bienvenue</legend>
            
              <p>Bienvenue sur la page de configuration de votre assistant domotique !</p>
              <p>Nous allons régler pas à pas vos préférences pour votre assistant.</p>
              <p>Tout d'abord, avez-vous bien rentré les paramètres de connexion de votre base de donnée dans le fichier "gladys/PHP/parametres/connexion_bdd1.php" ? Si oui, cliquez-sur suivant.</p>
             <p class="text-muted">(Si lors d'une étape, vous vous trompiez, pas de panique tout est modifiable par la suite dans le panneau d'administration)</p>
              
      
              <!-- Form actions -->
              <div class="form-group">
                <div class="col-md-12 text-right">
                  <button id="save_step_1" class="btn btn-primary btn-lg">Suivant</button>
                </div>
              </div>
            </fieldset>

          </div>
        </div>
    </div>

     <!-- END OF STEP 1 -->

    <!-- STEP 2 -->

    <div class="row" id="step2">
        <div class="col-md-8 col-md-offset-2">
          <div class="well well-sm">

            <fieldset>
              <legend class="text-center">Nommez votre assistant</legend>
            
              <p>Il est important de donner un nom à votre assistant. Le nom par défaut est "Gladys", mais vous pouvez lui donner un autre nom !</p>

              <!-- Name input-->
              <div class="form-group">
                <label class="col-md-3 control-label" for="assistant_name">Nom de votre assistant :</label>
                <div class="col-md-9">
                  <input id="assistant_name" name="assistant_name" type="text" placeholder="Entrez un nom" value="Gladys" class="form-control">
                </div>
              </div>

              
      
              <!-- Form actions -->
              <div class="form-group">
                <div class="col-md-12 text-right">
                  <button id="save_step_2" class="btn btn-primary btn-lg">Suivant</button>
                </div>
              </div>
            </fieldset>

          </div>
        </div>
    </div>

     <!-- END OF STEP 2 -->

      <!-- STEP 3 -->

    <div class="row" id="step3">
        <div class="col-md-8 col-md-offset-2">
          <div class="well well-sm">

            <fieldset>
              <legend class="text-center">Votre logement</legend>
            
              <p>Il faut maintenant rentrer les pièces de votre logement, afin que votre assistant connaisse la configuration de celui-ci. (Il n'est pas nécessaire de rentrer toutes les pièces, mais seulement celles qui contiendront des capteurs, hauts-parleurs, modules...)</p>

              <!-- Name input-->
             <table  class="table table-striped">  
                <tbody id="table_rooms">
                <tr>
                  <th>Nom</th>
                  <th>Modifier</th>
                </tr>
                <tr>
                  <td><input type="text" id="name" placeholder="Nom de la pièce" class="form-control" /></td>
                  <td><input type="submit" id="new_room" value="Ajouter" class="btn btn-sm btn-success"/></td>
                </tr>
                </tbody>
              </table>
              
      
              <!-- Form actions -->
              <div class="form-group">
                <div class="col-md-12 text-right">
                  <button id="save_step_3" class="btn btn-primary btn-lg">Suivant</button>
                </div>
              </div>
            </fieldset>

          </div>
        </div>
    </div>

     <!-- END OF STEP 3 -->


    <!-- STEP 4 -->



      <div class="row" id="step4">
        <div class="col-md-8 col-md-offset-2">
          <div class="well well-sm">

            <fieldset>
              <legend class="text-center">Créer votre compte administrateur</legend>
      
              <!-- Name input-->
              <div class="form-group">
                <label class="col-md-3 control-label" for="surname">Votre prénom :</label>
                <div class="col-md-9">
                  <input id="surname" name="surname" type="text" placeholder="Entrez votre prénom ici" class="form-control">
                </div>
              </div>
      
              <!-- Email input-->
              <div class="form-group">
                <label class="col-md-3 control-label" for="password">Votre mot de passe :</label>
                <div class="col-md-9">
                  <input id="password" name="password" type="password" placeholder="Entre un mot de passe" class="form-control">
                </div>
              </div>

               <div class="form-group">
                <label class="col-md-3 control-label" for="id_sleep_room">Votre chambre :</label>
                <div class="col-md-9">
                 <select id="id_sleep_room" class="form-control" >
                 </select>
                  <p class="text-muted">(Votre chambre désigne le lieu ou vous dormez et où vous souhaitez que votre assistant vous réveille)</p>
              
                </div>
               </div>

                <div class="form-group">
                <div class="col-md-12 text-right">
                  <button id="save_step_4" class="btn btn-primary btn-lg">Suivant</button>
                </div>
                </div>
                 </fieldset>

          </div>
        </div>
    </div>

        <!-- END OF STEP 4 -->

        <!-- STEP 5 -->

    <div class="row" id="step5">
        <div class="col-md-8 col-md-offset-2">
          <div class="well well-sm">

            <fieldset>
              <legend class="text-center">Finalisation</legend>
            
              <p>Votre assistant est maintenant correctement réglé ! Vous pourrez néanmoins modifier tous ces paramètres depuis votre panneau d'administration !</p>
              <p>Je vous invite maintenant à vous connectez au panneau de contrôle, et à l'ajouter à vos favoris.</p>
               <div>Faites connaître le projet ! <a href="https://twitter.com/share" class="twitter-share-button" data-url="http://intelligenceonline.synergize.co" data-text="J'utilise Gladys, un assistant domotique intelligent pour Raspberry Pi !"  data-related="yourownjarvis" data-lang="fr" data-size="large" data-count="none">Tweet</a></div>
                <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script></div>

              
      
              <!-- Form actions -->
              <div class="form-group">
                <div class="col-md-12 text-right">
                  <button id="save_step_5" class="btn btn-primary btn-lg">Accéder au panneau de contrôle</button>
                </div>
              </div>
            </fieldset>

          </div>
        </div>
    </div>

     <!-- END OF STEP 5 -->

</div>




      <footer>
        <p>© Gladys 2014 - En cas de bug/erreur, vous pouvez poser vos questions sur le forum : <a href="http://intelligenceonline.synergize.co/forum/">http://intelligenceonline.synergize.co/forum/</a></p>
      </footer>
      


  </body>
</html>