-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: db_kadis_2
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('5f068dbb-36e9-42c7-b1ce-47298e6cf889','374883ed7f379a7423fe5af0e5b8c80010b4613858a780f234b369b477364c1d','2026-05-07 10:02:45.143','20260507100245_init',NULL,NULL,'2026-05-07 10:02:45.090',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `award`
--

DROP TABLE IF EXISTS `award`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `award` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `award`
--

LOCK TABLES `award` WRITE;
/*!40000 ALTER TABLE `award` DISABLE KEYS */;
INSERT INTO `award` VALUES (1,'Top Hospitality Leader\r\n',' ITTA Awards\r\n','2024','/uploads/makassar_689f1346703a7cd307e22d4540491ea3-720x405.jpg','2026-05-07 19:06:30.166'),(2,'Top Hospitality Leader\r\n',' ITTA Awards\r\n','2024','/uploads/makassar_689f1346703a7cd307e22d4540491ea3-720x405.jpg','2026-05-07 19:06:30.166'),(3,'Top Hospitality Leader\r\n',' ITTA Awards\r\n','2024','/uploads/makassar_689f1346703a7cd307e22d4540491ea3-720x405.jpg','2026-05-07 19:06:30.166'),(4,'Top Hospitality Leader\r\n',' ITTA Awards\r\n','2024','/uploads/makassar_689f1346703a7cd307e22d4540491ea3-720x405.jpg','2026-05-07 19:06:30.166'),(5,'Top Hospitality Leader\r\n',' ITTA Awards\r\n','2024','/uploads/makassar_689f1346703a7cd307e22d4540491ea3-720x405.jpg','2026-05-07 19:06:30.166');
/*!40000 ALTER TABLE `award` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experience`
--

DROP TABLE IF EXISTS `experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experience` (
  `id` int NOT NULL AUTO_INCREMENT,
  `period` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience`
--

LOCK TABLES `experience` WRITE;
/*!40000 ALTER TABLE `experience` DISABLE KEYS */;
INSERT INTO `experience` VALUES (1,'2019 - 2025','Kepala Dinas','Dinas Pariwisata Kota Makassar','Mengembangkan sektor pariwisata dan ekonomi kreatif melalui promosi destinasi, penyelenggaraan event, serta kolaborasi untuk meningkatkan wisata Kota Makassar.','2026-05-07 18:46:03.682'),(2,'2025 - Sekarang','Kepala Dinas','Dinas Komunikasi dan Informatika Kota Makassar','Memimpin transformasi digital daerah, pengelolaan layanan komunikasi publik, infrastruktur TI, keterbukaan informasi, serta pengembangan smart city Kota Makassar.','2026-05-07 18:50:54.369');
/*!40000 ALTER TABLE `experience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'IPM Makassar Capai 85,66 Persen, Roem: Bukti Pembangunan Manusia Berkelanjutan','Berita Kota Makassar','https://beritakotamakassar.fajar.co.id/2025/12/27/ipm-makassar-capai-8566-persen-roem-bukti-pembangunan-manusia-berkelanjutan/','2025','/uploads/IMG-20251227-WA0020.jpg','2026-05-07 10:05:25.426'),(2,'Muhammad Roem, Kadispar Makassar, Raih Penghargaan Top Hospitality Leader di ITTA Awards 2024','Antara News','https://mediawarta.com/18/12/2024/muNamaTahunLink%20Berita%20Top%20Hospitality%20Leaderhammad-roem-kadispar-makassar-raih-penghargaan-top-hospitality-leader-di-itta-awards-2024/','2024','/uploads/makassar_689f1346703a7cd307e22d4540491ea3-720x405.jpg','2026-05-07 19:00:20.076'),(3,'Kadispar Makassar Muhammad Roem Raih Penghargaan Bergengsi di ITTA 2024','beridata','https://beridata.com/berita/kadispar-makassar-muhammad-roem-raih-penghargaan-bergengsi-di-itta-2024/','2024','/uploads/kadis-pariwisata-makassar-1536x864.jpeg','2026-05-07 19:00:20.085'),(4,'Pemkot Makassar Raih GM-DTGI Awards 2025','pluz','https://pluz.id/2025/09/19/pemkot-makassar-raih-gm-dtgi-awards-2025/','2025','https://cdn.pluz.id/imageresize/assets/media/upload/2025/09/Muhammad-Roem-GM-DTGI-Awards-2025-pluzid.jpg&width=800&height=500','2026-05-07 19:00:20.088'),(5,'Smart City Leadership in Integrated Public Service Innovation: Pemerintah Kota Makassar','cnn indonesia','https://www.cnnindonesia.com/nasional/20251030160452-25-1290184/pemkot-makassar-dianugerahi-smart-city-leadership-in-public-service','2025','https://akcdn.detik.net.id/visual/2025/10/31/semarang-mendapat-penghargaan-cnn-indonesia-awards-2025-1761923319339_169.jpeg?w=650&q=90','2026-05-07 19:03:51.888'),(6,'Kota Makassar Kembali Toreh Prestasi di Tingkat Nasional','rri','https://rri.co.id/daerah/1944351/kota-makassar-kembali-toreh-prestasi-di-tingkat-nasional','2025','/uploads/9172fa2f-c2f9-407e-9a9b-7bbaec0bc560-1024x682.jpeg','2026-05-07 19:03:51.891');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'db_kadis_2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-07 21:20:23
