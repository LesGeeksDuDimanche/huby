-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb2
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Lun 28 Avril 2014 à 15:45
-- Version du serveur: 5.5.35
-- Version de PHP: 5.4.4-14+deb7u8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `test2`
--

-- --------------------------------------------------------

--
-- Structure de la table `motion`
--

CREATE TABLE IF NOT EXISTS `motion` (
  `id_motion` int(11) NOT NULL AUTO_INCREMENT,
  `sensor` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id_motion`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;


ALTER TABLE  `sensors` ADD  `name` TEXT NOT NULL AFTER  `id_sensor`;

ALTER TABLE  `sensors` ADD  `code` INT NOT NULL AFTER  `type`;

ALTER TABLE `sensors` DROP `type`;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
