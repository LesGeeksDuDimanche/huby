<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of History
 *
 * @author Paulisse
 */

class History {
    //put your code here
    /**
     * @Column(type="string")
     */
    public $timeBegin;
    /**
     * @Column(type="string")
     */
    private $timeEnd;
    /**
     * @Id @Column(type="integer") @GeneratedValue
     */
    protected $id;
    /**
     * @var string
     */

    /**
     * @Column(type="integer")
     */
    private $step;

    public $address="192.168.1.46";
    
    public function __construct($address,$timeBegin){
        $this->address = $address;
        $time = new DateTime($timeBegin);
        $time = $time->getTimestamp();
        $this->step = 3600;
        $this->timeBegin = $time;

                
    }

    public function getId()
    {
        return $this->id;
    }
    
    public function getBeginTime() {
        return $this->timeBegin;
    }

    public function setEndTime($time) {
        $this->timeEnd = $time;
    }

    //set ip of raspberri//
    public function setIp($ip) {
        $this->address = $ip;
    }
    //get consommation with time begin and time end//
    
    public function getConso($step, $pattern, $field, $begin, $end) {


        $history = curl_init();
        $history_option_defaults = array(
        CURLOPT_HEADER => false,
        CURLOPT_URL => $this->address."/history?field=".$field."&pattern=".$pattern."&order=desc&step=".$step."&limit=none&begin=".$begin."&end=".$end,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 5
         );
        
         curl_setopt_array($history, $history_option_defaults);
      
         $historyN = curl_exec($history);
        if(curl_exec($history) === false){
            echo curl_errno($history);
        }
         curl_close($history);
       
         $historyN = json_decode($historyN, true);
        
         
         $lengthHistory = sizeof($historyN["data"]);

         $powerEnd = $historyN["data"][0]["value"];
         $powerBegin = $historyN["data"][$lengthHistory-1]["value"];

         $diff = $powerEnd - $powerBegin;
   
         
        echo json_encode(array('diff' => $diff));
    }

    //function to get diff of consommation in Wh for a day//

        public function dailyDiff() {
        
        $dateBegin = new DateTime("now");
        $dateF = $dateBegin->format('Y-m-d H:i:s');

        $dateHours = preg_split("/\s/", $dateF);
       
        $dateF = $dateHours[0]."T".$dateHours[1]."Z";

        $yesterday = $dateBegin->sub(new DateInterval('P1D'));

        $begin = $yesterday->format('Y-m-d H:i:s');
        $dateHoursbegin = preg_split("/\s/", $begin);

        $dateFBegin =  $dateHoursbegin[0]."T".$dateHoursbegin[1]."Z";

        History::getConso($this->step, "min", "hchp", $dateFBegin,  $dateF);
         
        }
    //function to get diff of consommation in Wh for date and step//

        public function Diff($field,$step,$dateBegin) {

            //$this->step = $step;
            $date = new DateTime($dateBegin);
            $dateF = $date->format('Y-m-d H:i:s');

            $dateHours = preg_split("/\s/", $dateF);
            $dateBegin = $dateHours[0]."T".$dateHours[1]."Z";

            $dateEnd = $date->sub(new DateInterval('PT'.$step.'H'));

            $begin = $dateEnd->format('Y-m-d H:i:s');

            $dateHoursbegin = preg_split("/\s/", $begin);

            $dateFBegin =  $dateHoursbegin[0]."T".$dateHoursbegin[1]."Z";

            History::getConso($this->step, "min", "hchp", $dateFBegin, $dateBegin);

        }
}
