-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 13, 2024 at 03:08 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.13

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
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `productID` int(11) NOT NULL,
  `orderId` varchar(255) NOT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `img`, `brand`, `intro`, `size`, `review`, `type`, `sex`, `price`, `matchType`, `casual`, `preprice`, `userID`, `date`, `status`) VALUES
(1, '1714568998658.jpg', 'brand1', 'お知らせ', '[false,false,false,true,false,true,false]', 5, 'longPants', 'boy', '250', 'classic', 'casual', '', '2', '2024-11-29', 0),
(2, '1721880928225.jpg', 'yamaha', 'これは高級シャツです。', '[true,true,false,false,false,false,false]', 5, 'hoodies', 'man', '600', 'regular', 'casual', NULL, '2', '2024-11-30', 0),
(3, '1721882176809.jpg', 'yamaha', 'これは高級シャツです。', '[true,false,true,false,true,false,false]', 5, 'hoodies', 'man', '600', 'regular', 'casual', '1000', '2', '2024-11-22', 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sell`
--

INSERT INTO `sell` (`id`, `productID`, `sellSize`, `sellReview`, `sellDate`, `buyUserID`, `buyUserName`, `sellUserID`, `sellUserName`, `coolingOff`) VALUES
(1, 1, 'xs', 5, '2024-7-16', 1, 'user', 2, 'customer', 1);

-- --------------------------------------------------------

--
-- Table structure for table `shipping_details`
--

CREATE TABLE `shipping_details` (
  `id` int(11) NOT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  `address_line1` varchar(255) DEFAULT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `orderId` varchar(255) DEFAULT NULL,
  `checkoutSessionId` varchar(255) NOT NULL,
  `chargePermissionId` varchar(255) DEFAULT NULL,
  `chargeId` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `permission` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `phone`, `pwd`, `permission`, `created_at`) VALUES
(1, 'buyer', 'buyer@gmail.com', '123123123', '123', 0, '2024-12-11 00:02:33'),
(2, 'seller', 'seller@gmail.com', '123123123', '123', 29, '2024-12-11 00:02:33'),
(4, 'admin', 'admin@gmail.com', '987654321', '123', 82, '2024-12-11 00:02:33'),
(5, 'ishida mei', 'mobileengineer8954@gmail.com', '1234567890', '123', 0, '2024-12-11 00:02:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_id` (`orderId`);

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
-- Indexes for table `shipping_details`
--
ALTER TABLE `shipping_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `checkout_session_id` (`checkoutSessionId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

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
-- AUTO_INCREMENT for table `shipping_details`
--
ALTER TABLE `shipping_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
