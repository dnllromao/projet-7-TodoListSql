-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2017 at 11:12 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todolist`
--

-- --------------------------------------------------------

--
-- Table structure for table `todos`
--

CREATE TABLE `todos` (
  `id` int(11) NOT NULL,
  `task` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL,
  `ord` int(11) NOT NULL,
  `deadline` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `todos`
--

INSERT INTO `todos` (`id`, `task`, `active`, `ord`, `deadline`) VALUES
(1, 'preparer la veille', 0, 8, '2010-04-02 16:32:22'),
(2, 'faire le con1', 0, 3, NULL),
(3, 'faire le con2', 1, 1, NULL),
(4, 'faire le con3', 0, 6, NULL),
(5, 'faire le con4', 0, 1, NULL),
(6, 'faire le con5', 1, 2, NULL),
(8, 'arreter de faire le con', 1, 3, NULL),
(9, 'refaire le con', 0, 2, NULL),
(10, 'desidrater', 0, 9, '2010-04-02 16:32:00'),
(11, 'acheter un ventilateur', 0, 7, '2017-06-22 10:00:00'),
(12, 'écouter de la musique', 0, 4, '2017-06-24 14:00:00'),
(13, 'ne pas faire chier', 0, 5, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `todos`
--
ALTER TABLE `todos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
