-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 20, 2024 at 02:06 PM
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
-- Database: `ppob`
--

-- --------------------------------------------------------

--
-- Table structure for table `banner_ppob`
--

CREATE TABLE `banner_ppob` (
  `banner_id` int(11) NOT NULL,
  `banner_name` text NOT NULL,
  `banner_image` text NOT NULL,
  `banner_description` text NOT NULL,
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banner_ppob`
--

INSERT INTO `banner_ppob` (`banner_id`, `banner_name`, `banner_image`, `banner_description`, `is_active`) VALUES
(1, 'Banner 1', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', 1),
(2, 'Banner 2', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', 1),
(3, 'Banner 3', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', 1),
(4, 'Banner 4', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', 1),
(5, 'Banner 5', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', 1),
(6, 'Banner 6', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', 1);

-- --------------------------------------------------------

--
-- Table structure for table `service_ppob`
--

CREATE TABLE `service_ppob` (
  `service_id` int(11) NOT NULL,
  `service_code` text NOT NULL,
  `service_name` text NOT NULL,
  `service_icon` text NOT NULL,
  `service_tarif` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_ppob`
--

INSERT INTO `service_ppob` (`service_id`, `service_code`, `service_name`, `service_icon`, `service_tarif`) VALUES
(1, 'PAJAK', 'Pajak PBB', 'https://nutech-integrasi.app/dummy.jpg', 40000),
(2, 'PLN', 'Listrik', 'https://nutech-integrasi.app/dummy.jpg', 10000),
(3, 'PDAM', 'PDAM Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 40000),
(4, 'PULSA', 'Pulsa', 'https://nutech-integrasi.app/dummy.jpg', 40000),
(5, 'PGN', 'PGN Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
(6, 'MUSIK', 'Musik Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
(7, 'TV', 'TV Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000),
(8, 'PAKET_DATA', 'Voucher Game', 'https://nutech-integrasi.app/dummy.jpg', 50000),
(9, 'VOUCHER_GAME', 'Voucher Makanan', 'https://nutech-integrasi.app/dummy.jpg', 100000),
(10, 'VOUCHER_MAKANAN', 'Pajak PBB', 'https://nutech-integrasi.app/dummy.jpg', 100000),
(11, 'QURBAN', 'Qurban', 'https://nutech-integrasi.app/dummy.jpg', 200000),
(12, 'ZAKAT', 'Zakat', 'https://nutech-integrasi.app/dummy.jpg', 300000);

-- --------------------------------------------------------

--
-- Table structure for table `transaction_config_helper`
--

CREATE TABLE `transaction_config_helper` (
  `helper_id` int(11) NOT NULL,
  `helper_code` text NOT NULL,
  `counter` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction_config_helper`
--

INSERT INTO `transaction_config_helper` (`helper_id`, `helper_code`, `counter`) VALUES
(1, 'invoice_counter', 0);

-- --------------------------------------------------------

--
-- Table structure for table `transaction_ppob`
--

CREATE TABLE `transaction_ppob` (
  `transaction_id` int(11) NOT NULL,
  `transaction_code` text NOT NULL,
  `transaction_date` datetime NOT NULL,
  `transaction_amount` int(11) NOT NULL,
  `latest_balance` int(11) NOT NULL,
  `updated_balance` int(11) NOT NULL,
  `transaction_type_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `service_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `transaction_type_ppob`
--

CREATE TABLE `transaction_type_ppob` (
  `transaction_type_id` int(11) NOT NULL,
  `transaction_type_code` text NOT NULL,
  `transaction_type_operate` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction_type_ppob`
--

INSERT INTO `transaction_type_ppob` (`transaction_type_id`, `transaction_type_code`, `transaction_type_operate`) VALUES
(1, 'PAYMENT', 0),
(2, 'TOPUP', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_ppob`
--

CREATE TABLE `user_ppob` (
  `user_id` int(11) NOT NULL,
  `user_first_name` text NOT NULL,
  `user_last_name` text NOT NULL,
  `user_password` text NOT NULL,
  `user_email` text NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `user_profile_image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_ppob`
--

INSERT INTO `user_ppob` (`user_id`, `user_first_name`, `user_last_name`, `user_password`, `user_email`, `is_active`, `user_profile_image`) VALUES
(1, 'User', 'Nutech', '9bb793c73de0193293096d68f93d2e75', 'user@nutech-integrasi.com', 1, '/assets/Screenshot2.png'),
(2, 'Rangga Edit', 'Edit', 'e172dd95f4feb21412a692e73929961e', 'rangga@nutech-integrasi.com', 1, '/assets/Screenshot.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banner_ppob`
--
ALTER TABLE `banner_ppob`
  ADD PRIMARY KEY (`banner_id`);

--
-- Indexes for table `service_ppob`
--
ALTER TABLE `service_ppob`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `transaction_config_helper`
--
ALTER TABLE `transaction_config_helper`
  ADD PRIMARY KEY (`helper_id`);

--
-- Indexes for table `transaction_ppob`
--
ALTER TABLE `transaction_ppob`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `transaction_type_ppob`
--
ALTER TABLE `transaction_type_ppob`
  ADD PRIMARY KEY (`transaction_type_id`);

--
-- Indexes for table `user_ppob`
--
ALTER TABLE `user_ppob`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banner_ppob`
--
ALTER TABLE `banner_ppob`
  MODIFY `banner_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `service_ppob`
--
ALTER TABLE `service_ppob`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `transaction_ppob`
--
ALTER TABLE `transaction_ppob`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transaction_type_ppob`
--
ALTER TABLE `transaction_type_ppob`
  MODIFY `transaction_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_ppob`
--
ALTER TABLE `user_ppob`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
