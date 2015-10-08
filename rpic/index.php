   <?php 
   require 'vendor/autoload.php';

   require_once 'src/History.php';
   //require 'views/Render.php';

   header('Cache-Control: no-cache, must-revalidate');

   header('Content-type: application/json');
   Twig_Autoloader::register();


   $loader = new Twig_Loader_Filesystem('./views');
   $twig = new Twig_Environment($loader, array(
       'cache' => 'cache',
       'debug' => true,
       'log.enabled' => true));

   $twig->addExtension(new Twig_Extension_Debug());

   $app = new \Slim\Slim();

   //set ip raspberric//
   $app->ip = "http://rpic-remixmyenergy-edf.local";

   $app->container->set('history', function() use($app) {
       $date = new DateTime('now');
       $dateF = $date->format('Y-m-d H:i:s');
     return new History($app->ip, $dateF);
   });

   $app->config(array(
       'debug' => true,
       'templates.path' => 'views'
   ));
   $app->post('/', function() use($app){
       if($app->request->isPost()){
           var_dump($app->request->post("ip"));
       }
   });
    $app->get('/', function() use($app,$twig){



        $template = $twig->loadTemplate('panel.html');
        echo $template->render( array('fields'=>array("hchp","papp"),"stepHours"=>array(10,24)));

    });

   //get difference consommation during a day//
   $app->get('/day', function () use($app) {

          echo $app->container->get('history')->dailyDiff();
   });

   //get difference consommation during hours and specific date//
   $app->post('/diff', function() use($app){
       if($app->request->isPost()){
           $field = $app->request->post("field");
           $step = $app->request->post("step");
           $date = $app->request->post("dateBegin");
           $hour = $app->request->post("hour");
           $date = $date.' '.$hour.':00';

           $app->container->get('history')->diff($field,$step,$date);
       }
   });

   $app->run();
        // put your code here
        
     
       // $conso = $history->getConso(1, "desc", "none");
       /** foreach($conso->data as $val) {
            $conso = $val->value;
            $time = $val->time;
            echo "conso a:".$time." value: ".$conso;
        }
        //var_dump($conso->data);***/
      
        ?>

