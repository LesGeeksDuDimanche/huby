<?php
    require_once dirname(dirname(__DIR__)).'/bootstrap.php';


    $history  = new History('192.168.1.46','2015-03-09 11:45:43');
    $history->getBeginTime();
    $conso = $history->getConso(60,'desc','none');
    $history->setEndTime('2015-03-09 12:42:50');
    $entityManager->persist($history);
    $entityManager->flush();

echo "History saved with ID " . $history->getId() . "\n";




