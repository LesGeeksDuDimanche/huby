/*
  RF_Sniffer
  
  Hacked from http://code.google.com/p/rc-switch/
  
  by @justy to provide a handy RF code sniffer
*/

#include "RCSwitch.h"
#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <curl/curl.h>     
     
RCSwitch mySwitch;
 
void send_motion(int value)
{
    CURL *curl;
  CURLcode res;

  curl = curl_easy_init();
  if(curl) {

    char url[200];
    sprintf(url,"%s%d","http://127.0.0.1/gladys/PHP/controller/motion.controller.php?action=motion&sensor=",value);
    curl_easy_setopt(curl, CURLOPT_URL,url );
   
    res = curl_easy_perform(curl);
    /* Check for errors */
    if(res != CURLE_OK)
      fprintf(stderr, "curl_easy_perform() failed: %s\n",
              curl_easy_strerror(res));

    /* always cleanup */
    curl_easy_cleanup(curl);
  }
}

int main(int argc, char *argv[]) {
  
     int PIN = 2;

     if(wiringPiSetup() == -1)
       return 0;

     mySwitch = RCSwitch();
     mySwitch.enableReceive(PIN);  // Receiver on inerrupt 0 => that is pin #2
    
     while(1) {
  
      if (mySwitch.available()) {
    
        int value = mySwitch.getReceivedValue();
    
        if (value == 0) {
          printf("Unknown encoding");
        } else {    
   
          printf("Received %i\n", mySwitch.getReceivedValue() );
          send_motion(value);
        }
    
        mySwitch.resetAvailable();
    
      }
      
    sleep(1.5);
  }

  exit(0);


}




