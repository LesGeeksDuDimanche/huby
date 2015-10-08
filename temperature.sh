#!/bin/bash

#create table temperature if not exists

mysql -h "localhost" -u root -proot -Bse "USE huby; CREATE TABLE IF NOT EXISTS temperature(timestamp DATE NOT NULL,status TINYINT NOT NULL, place_id int not null, FOREIGN KEY fk_place_id(place_id) REFERENCES rooms(id_room) ON DELETE CASCADE)ENGINE= InnoDB;" 