/* ===================================================
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
 * ========================================================== */

var feedback = require('./disp.js');
var nodemailer = require("nodemailer");


exports.send = function(mail_service,username, password,from,receiver,subject_text,plain_text,html_body)
{
        // create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: mail_service,
        auth: {
            user: username,
            pass: password
        }
    });

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: from+" <" + username +">", // sender address
        to: receiver, // list of receivers
        subject: subject_text, // Subject line
        text: plain_text, // plaintext body
        html: html_body // html body
    }

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            feedback.disp(error);
        }else{
            feedback.disp("Message sent: " + response.message);
        }

        smtpTransport.close();
        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
}
