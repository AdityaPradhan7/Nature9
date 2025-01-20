-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.39 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE wired_transfer;
USE wired_transfer;
-- Dumping structure for table student.accounts
CREATE TABLE IF NOT EXISTS accounts (
  AccountNumber int NOT NULL AUTO_INCREMENT,
  AccountHolderName varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  Currency varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  DOB date NOT NULL,
  Balance decimal(20,2) NOT NULL DEFAULT 0,
  TransactionPIN varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (AccountNumber)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Dumping data for table student.accounts: ~9 rows (approximately)
INSERT INTO accounts (AccountNumber, AccountHolderName, Currency, DOB, Balance, TransactionPIN) VALUES
	(1, 'asdasd', 'INR', '2025-01-18', 0.87, 'frt'),
	(2, 'Aditya Pradhan', 'USD', '2025-01-03', 999.99, 'v'),
	(3, 'Aditya Pradhan', 'USD', '2025-01-01', 0.80, 'gsdg'),
	(4, 'das', 'INR', '2025-01-02', 17.32, '3456'),
	(5, 'Aditya Pradhan', 'USD', '2025-01-03', 213.00, '12124'),
	(6, 'asd', 'USD', '2025-01-04', 234.00, 'asfdasf'),
	(7, 'dasd', 'USD', '2025-01-02', 1243117.00, 'asdasd'),
	(8, 'eqe', 'USD', '2025-01-01', 45.00, '2145t'),
	(9, 'ads', 'USD', '2025-01-02', 4.00, '723456'),
	(10, 'honey singh', 'USD', '2025-01-03', 54.00, 't442141412'),
	(11, 'asdasf222', 'CNY', '2024-12-31', 78.00, 'ttyrutjnf843224'),
	(12, 'pagal', 'AED', '2000-12-12', 999.00, '098765'),
	(13, 'hahaha', 'EUR', '2000-12-11', 1099.99, 'something'),
	(14, 'hahaha', 'EUR', '2000-12-11', 1100.00, 'something'),
	(15, 'asdasd', 'EUR', '2025-01-03', 11.00, '45214124124'),
	(23, 'dasd', 'USD', '2024-12-31', 3.50, 'tttttttttttttttttttttttt'),
	(25, 'Aditya Pradhan', 'CAD', '2025-01-09', 66.00, 'bbbbbbbbbbbbbbbbbb'),
	(26, 'Aditya Pradhan', 'CAD', '2025-01-09', 66.60, 'bbbbbbbbbbbbbbbbbb'),
	(27, 'Aditya Pradhan', 'CAD', '2025-01-09', 1.00, 'bbbbbbbbbbbbbbbbbb'),
	(28, 'Aditya Pradhan', 'CAD', '2025-01-09', 0.50, 'bbbbbbbbbbbbbbbbbb'),
	(30, 'Aditya Pradhan', 'AED', '2025-01-12', 0.50, 'bbbbbbbbbbbbbbb'),
	(31, 'Aditya Pradhan', 'USD', '2025-01-12', 0.00, 'bbbbbbbbbbbbbbb'),
	(32, 'Aditya Pradhan', 'USD', '2025-01-12', 2.00, 'bbbbbbbbbbbbbbb'),
	(33, 'honey singh', 'INR', '2024-12-30', 0.20, 'vvvvvvvvv'),
	(34, 'honey singh', 'INR', '2024-12-30', 1.55, 'vvvvvvvvv'),
	(35, 'honey singh', 'INR', '2024-12-30', 799.88, 'vvvvvvvvv'),
	(36, 'last last', 'EUR', '2025-01-08', 1.50, 'bgtyhb'),
	(37, 'last last last', 'INR', '2024-12-31', 105.00, 'aaaaaaaaaaaaaaaa'),
	(38, 'last last last', 'EUR', '2025-01-05', 1111.00, 'bbbbbbb');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;