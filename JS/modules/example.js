//a private static variable  
var static_nombre = 0;  
  
module.exports = function()  
{  
    //private variables  
    var test;  
  
    //end privates  
      
  
    //constructor  
  
    static_nombre++;  
    console.log("Ceci est le module example !");
  
    //end constructor  
   
    return {  
        getter: function()  
        {  
            return test;  
        },  
        setter: function(value)  
        {  
            test = value;  
        },  
        getStatic : function()  
        {  
            return static_nombre;  
        }  
    };  
};  