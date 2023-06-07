-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: incluyeme
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(25) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT '1',
  `image` varchar(255) DEFAULT NULL,
  `start` date NOT NULL,
  `state` varchar(25) DEFAULT 'inactive',
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (2,'Javascript Basico 1','Javascript basicos temas sobre objetos, clases y un principio de nodejs',1,'/images/image-1683899842351.jpg','2023-05-27','active',1),(3,'Automotor 2','Curso de automotor modulo parte 2 sobre las nuevas mecanicas',0,'/images/image-1683826675229.jpg','2023-05-23','active',3),(5,'Cocina vegana','El veganismo es la práctica que consiste en la abstención del uso de productos de origen animal, particularmente en la dieta.',1,'/images/image-1683899537652.jpg','2023-05-24','inactive',4),(6,'Ingles Basico','En nuestros cursos se desarrollan las cuatro macrohabilidades de la lengua: comprensión y producción oral',1,'/images/image-1683899740303.jpg','2023-06-20','inactive',5),(7,'Node JS','Capacítate y aprende las técnicas para crear sitios y módulos en NodeJS.',1,'/images/image-1684067665076.jpg','2023-05-24','active',1),(8,'Control de aceites','Chequeo y control de aceite ver y controlar el motor',1,'/images/image-1684068042186.jpg','2023-05-31','active',3),(9,'Comida saludable','Curso de Cocina Saludable a Distancia y Alimentación Consciente',1,'/images/image-1683903139934.jpg','2023-06-14','inactive',4),(10,'Frances Basico','Idioma frances basico, lo primeros fundamentos y verbos, oraciones en presente simple.',1,'/images/image-1684522727508.jpg','2023-06-23','inactive',5),(11,'Java basico','Curso sobre java, los principios de Java, verás variables y condiciones',1,'/images/image-1684967989853.jpg','2023-05-30','active',1);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-02 18:27:22
