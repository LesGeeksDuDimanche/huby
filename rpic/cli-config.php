<?php
/**
 * Created by PhpStorm.
 * User: Paulisse
 * Date: 09/03/2015
 * Time: 13:19

**/
require_once "bootstrap.php";

return \Doctrine\ORM\Tools\Console\ConsoleRunner::createHelperSet($entityManager);