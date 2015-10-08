#!/usr/bin/python
#+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
#|R|a|s|p|b|e|r|r|y|P|i|-|S|p|y|.|c|o|.|u|k|
#+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
#
# Detecter des mouvements avec un capteur infrarouge
#
# Auteur original du script : Matt Hawkins
# Date : 21/01/2013
# 
# Traduit pour "Build You Own Jarvis"
# http://intelligenceonline.synergize.co/
#


# Importation des librairies pythons
import RPi.GPIO as GPIO
import time
import urllib

# Utilisation des BCM GPIO
# Au lieu des numeros de pin physique
GPIO.setmode(GPIO.BCM)

# Definir les GPIOs a utiliser
GPIO_PIR = 7

print "PIR Module Test (CTRL-C pour quitter)"

# Determine les pins d'entrees
GPIO.setup(GPIO_PIR,GPIO.IN)      # Echo

Current_State  = 0
Previous_State = 0

try:

  print "Waiting for PIR to settle ..."

  # Tourne en boucle jusqu'a ce que la sortie du capteur soit 0
  while GPIO.input(GPIO_PIR)==1:
    Current_State  = 0    

  print "  Ready"     
    
  # Tourne en boucle jusqu'a ce que l'utilisateur quitte ( CTRL + C )
  while True :
   
    # Lis l'etat du capteur
    Current_State = GPIO.input(GPIO_PIR)
   
    if Current_State==1 and Previous_State==0:
      # Un mouvement est detecte
      print "  Mouvement detecte !"
      test = urllib.urlopen("http://127.0.0.1/gladys/PHP/controller/action.controller.php?action=motion")
      # On attend 80 secondes
      time.sleep(80) 
      # On enregistre l'ancien etat
      Previous_State=1
    elif Current_State==0 and Previous_State==1:
      # Le capteur est a nouveau pret
      print "  Ready"
      Previous_State=0
      
    # On attend 10 millisecondes
    time.sleep(0.01)      
      
except KeyboardInterrupt:
  print "  Quit" 
  # Reinitialisation des parametres GPIOs
  GPIO.cleanup()