-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb2
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Lun 21 Avril 2014 à 01:16
-- Version du serveur: 5.5.35
-- Version de PHP: 5.4.4-14+deb7u8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `assistant`
--

-- --------------------------------------------------------

--
-- Structure de la table `activity_history`
--

CREATE TABLE IF NOT EXISTS `activity_history` (
  `id_activity` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `action` int(11) NOT NULL,
  PRIMARY KEY (`id_activity`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

-- --------------------------------------------------------

--
-- Structure de la table `alarmes`
--

CREATE TABLE IF NOT EXISTS `alarmes` (
  `id_alarme` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `action` tinyint(4) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `recurring` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_alarme`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

-- --------------------------------------------------------

--
-- Structure de la table `bdd_version`
--

CREATE TABLE IF NOT EXISTS `bdd_version` (
  `id_version` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `version` tinytext NOT NULL,
  PRIMARY KEY (`id_version`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `cookies`
--

CREATE TABLE IF NOT EXISTS `cookies` (
  `id_cookie` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `value` text NOT NULL,
  `validity_date` datetime NOT NULL,
  PRIMARY KEY (`id_cookie`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=27 ;

-- --------------------------------------------------------

--
-- Structure de la table `electric_devices`
--

CREATE TABLE IF NOT EXISTS `electric_devices` (
  `id_device` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `id_room` int(11) NOT NULL,
  `code` tinytext NOT NULL,
  `number` int(11) NOT NULL,
  PRIMARY KEY (`id_device`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

-- --------------------------------------------------------

--
-- Structure de la table `geolocation`
--

CREATE TABLE IF NOT EXISTS `geolocation` (
  `id_location` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `latitude` float NOT NULL,
  `longitude` int(11) NOT NULL,
  `altitude` float NOT NULL,
  `accuracy` float NOT NULL,
  PRIMARY KEY (`id_location`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=50 ;

-- --------------------------------------------------------

--
-- Structure de la table `lessons`
--

CREATE TABLE IF NOT EXISTS `lessons` (
  `id_lesson` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `day` tinyint(4) NOT NULL,
  `name` text NOT NULL,
  `start` time NOT NULL,
  `end` time NOT NULL,
  PRIMARY KEY (`id_lesson`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE IF NOT EXISTS `messages` (
  `id_message` int(11) NOT NULL AUTO_INCREMENT,
  `id_sender` int(11) NOT NULL,
  `id_receiver` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `text` text NOT NULL,
  `read` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_message`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `motion_history`
--

CREATE TABLE IF NOT EXISTS `motion_history` (
  `motion_id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  PRIMARY KEY (`motion_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `other_boxs`
--

CREATE TABLE IF NOT EXISTS `other_boxs` (
  `id_box` int(11) NOT NULL AUTO_INCREMENT,
  `IP` tinytext NOT NULL,
  PRIMARY KEY (`id_box`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `output_history`
--

CREATE TABLE IF NOT EXISTS `output_history` (
  `id_output` int(11) NOT NULL AUTO_INCREMENT,
  `action` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id_output`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

-- --------------------------------------------------------

--
-- Structure de la table `rooms`
--

CREATE TABLE IF NOT EXISTS `rooms` (
  `id_room` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  PRIMARY KEY (`id_room`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

-- --------------------------------------------------------

--
-- Structure de la table `sensors`
--

CREATE TABLE IF NOT EXISTS `sensors` (
  `id_sensor` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `id_room` int(11) NOT NULL,
  PRIMARY KEY (`id_sensor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL DEFAULT '2',
  `surname` tinytext NOT NULL,
  `id_sleep_room` int(11) NOT NULL,
  `password` mediumtext NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
