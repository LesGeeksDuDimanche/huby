var speak = require('../function/say.js');
var static_nombre = 0;  
  
module.exports = function()  
{  
    //private variables  
    var test;
  
    //end privates  
      
  
    //constructor  
  
    static_nombre++;  
    console.log("Hello World !");
    speak.say("Bonjour !");
  
    //end constructor  
   
};  