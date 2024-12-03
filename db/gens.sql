-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 24, 2024 at 01:45 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gens`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `img` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `intro` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `review` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `sex` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `matchType` varchar(255) NOT NULL,
  `casual` varchar(255) NOT NULL,
  `preprice` varchar(255) DEFAULT NULL,
  `userID` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `img`, `brand`, `intro`, `size`, `review`, `type`, `sex`, `price`, `matchType`, `casual`, `preprice`, `userID`, `date`, `status`) VALUES
(1, '1714568998658.jpg', 'brand1', 'お知らせ', '[false,false,false,true,false,true,false]', 5, 'longPants', 'boy', '250', 'classic', 'casual', '', '2', '2024-08-29', 0),
(2, '1721880928225.jpg', 'yamaha', 'これは高級シャツです。', '[true,true,false,false,false,false,false]', 5, 'hoodies', 'man', '600', 'regular', 'casual', NULL, '2', '2024-08-30', 0),
(3, '1721882176809.jpg', 'yamaha', 'これは高級シャツです。', '[true,false,true,false,true,false,false]', 5, 'hoodies', 'man', '600', 'regular', 'casual', '1000', '2', '2024-08-22', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sell`
--

CREATE TABLE `sell` (
  `id` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `sellSize` varchar(255) NOT NULL,
  `sellReview` int(11) NOT NULL,
  `sellDate` varchar(255) NOT NULL,
  `buyUserID` int(11) NOT NULL,
  `buyUserName` varchar(255) NOT NULL,
  `sellUserID` int(11) NOT NULL,
  `sellUserName` varchar(255) NOT NULL,
  `coolingOff` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `sell`
--

INSERT INTO `sell` (`id`, `productID`, `sellSize`, `sellReview`, `sellDate`, `buyUserID`, `buyUserName`, `sellUserID`, `sellUserName`, `coolingOff`) VALUES
(1, 1, 'xs', 5, '2024-7-16', 1, 'user', 2, 'customer', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `permission` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `phone`, `pwd`, `permission`) VALUES
(1, 'user', 'user@gmail.com', '123123123', '123', 0),
(2, 'customer', 'customer@gmail.com', '123123123', '123', 29),
(4, 'admin', 'admin@gmail.com', '987654321', '123', 82);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sell`
--
ALTER TABLE `sell`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sell`
--
ALTER TABLE `sell`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
