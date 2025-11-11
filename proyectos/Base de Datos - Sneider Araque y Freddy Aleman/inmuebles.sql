-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 26-11-2023 a las 05:10:24
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inmuebles`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE IF NOT EXISTS `clientes` (
  `cedula_cliente` varchar(12) NOT NULL,
  `nombre_cliente` varchar(50) NOT NULL,
  `correo_cliente` varchar(50) NOT NULL,
  `direccion_cliente` varchar(100) NOT NULL,
  `telf_cliente` varchar(12) NOT NULL,
  `cod_tipo_clientes` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`cedula_cliente`),
  KEY `cod_tipo_clientes` (`cod_tipo_clientes`),
  KEY `cod_tipo_clientes_2` (`cod_tipo_clientes`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`cedula_cliente`, `nombre_cliente`, `correo_cliente`, `direccion_cliente`, `telf_cliente`, `cod_tipo_clientes`) VALUES
('12824568', 'Antonio Molina', 'antonio.molina@25gmail.com', 'Los Dos Caminos, Caracas 1071, Miranda\r\n', '04122584969', 'TC-001'),
('15236789', 'Edwar Bazan ', 'bazanto2004@gmail.com', 'El Marqués, Caracas, Miranda\r\n', '04123602589', 'TC-002'),
('11898555', 'Melany Zambrano', 'melany27zam@gmail.com', 'Valencia Edo. Carabobo.', '04142356780', 'TC-001'),
('14808323', 'Alejandro Dominguez', 'alejose12@gmail.com', ' Av. Principal de Quebrada Honda, Los Caobos.', '04124589473', 'TC-002'),
('18904562', 'Angel Melchor', 'angelino12@gmail.com', '2da transversal, Los Dos Caminos, Caracas', '04246078345', 'TC-001'),
('29587416', 'Leonor Marcano', 'marcanoleo@gmail.com', 'Altamira, Caracas', '04123456711', 'TC-002'),
('11134556', 'Sofia Sanchez', 'sanchezsofi@gmail.com', 'La Urbina, Caracas', '04242228345', 'TC-002'),
('19865741', 'Javier Milei ', 'peronistarg@gmail.com', '5ta transversal, Chacaito', '04123478412', 'TC-001'),
('12345123', 'Juan Matamoros', 'matamoros@gmail.com', '2da transversal, Chacao', '04122530988', 'TC-001'),
('14890123', 'Romina Gallardo', 'gallardoromi@gmail.com', 'Altamira, Caracas', '04141233567', 'TC-001'),
('12000111', 'Keinner Lozano', 'lozano@gmail.com', '5ta transversal, Miranda', '04126078345', 'TC-001');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmuebles`
--

DROP TABLE IF EXISTS `inmuebles`;
CREATE TABLE IF NOT EXISTS `inmuebles` (
  `cod_inmuebles` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ubicacion_inmuebles` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nombre_inmuebles` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cod_tipo` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `foto_inmuebles` varchar(1000) NOT NULL,
  `precio_inmuebles` double NOT NULL,
  PRIMARY KEY (`cod_inmuebles`),
  KEY `cod_tipo` (`cod_tipo`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `inmuebles`
--

INSERT INTO `inmuebles` (`cod_inmuebles`, `ubicacion_inmuebles`, `nombre_inmuebles`, `cod_tipo`, `foto_inmuebles`, `precio_inmuebles`) VALUES
('I-001', 'Plaza Francia, Av. Luis Roche, Caracas\r\n', 'Apartamento En Venta En Altamira', 'TI-002', 'https://pics.nuroa.com/apartamento_san_luis_105_m_venta_1050057693138899740.jpg', 6000),
('I-002', 'El Marques, Distrito Metropolitano', 'Amplia casa multinivel para acondicionar', 'TI-001', 'https://http2.mlstatic.com/D_NQ_NP_2X_718068-MLV72651725778_112023-O.webp', 120000),
('I-003', 'Loma Larga, Distrito Metropolitano', 'Excelente casa bifamiliar en Loma Larga ', 'TI-001', 'https://pics.nuroa.com/casa_en_venta_en_san_martin_caracas_5760118649768523010.jpg', 145000),
('I-004', 'Altamira, Caracas', 'Casa en perfecto estado, tres baños, una piscina', 'TI-001', 'https://www.bienesonline.com/venezuela/photos/casa-venta-los-naranjos-del-cafetal-11541174283.jpg', 80000),
('I-005', 'La Urbina, Caracas', 'Casa en perfecto estado, dos baños ', 'TI-001', 'https://http2.mlstatic.com/D_NQ_NP_806852-MLV69704994106_052023-O.webp', 60350),
('I-009', 'Chacaito, Caracas', 'Apartamento Precio ajustable ', 'TI-002', 'https://http2.mlstatic.com/D_NQ_NP_812855-MLV69777575517_062023-O.webp', 23000),
('I-006', 'La Urbina, Caracas', 'Casa en perfecto estado, dos baños ', 'TI-001', 'https://imganuncios.mitula.net/medium/casa_en_venta_en_cantaclaro_puerto_la_cruz_1380107694697094933.jpg', 60350),
('I-010', 'Sabana Grande, Caracas', 'Casa, tres habitaciones', 'TI-001', 'https://www.bienesonline.com/venezuela/photos/encantadora-casa-en-venta-alto-hatillo-CAV1541381627159450-772.jpg', 89056),
('I-007', 'Altamira, Caracas', 'Casa en perfecto estado, cuatro baños ', 'TI-001', 'https://img.freepik.com/foto-gratis/villa-lujo-piscina-espectacular-diseno-contemporaneo-arte-digital-bienes-raices-hogar-casa-propiedad-ge_1258-150749.jpg', 72350),
('I-008', 'La Urbina, Caracas', 'Apartamento en buenas condiciones ', 'TI-002', 'https://casasenventahermosillo.com.mx/wp-content/uploads/2022/08/Diferencia-entre-apartamento-y-departamento.webp', 19000),
('I-011', 'Sabana Grande, Caracas', 'Casa, dos baños', 'TI-001', 'https://mediavault.point2.com/p2a/htmltext/d7f1/1d72/b677/c1eceae51fe5da2bc522/original.jpg', 12451),
('I-012', 'Altamira, Caracas', 'Apartamento, cuatro baños', 'TI-002', 'https://images.ctfassets.net/cfexf643femz/1H3xy23nobNYHhmandji2z/52c4c9a5077314869f4d44539a7ed4ec/Fotos_La_haus__10_.jpg?w=1136&fm=webp&q=60', 1900);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propietarios`
--

DROP TABLE IF EXISTS `propietarios`;
CREATE TABLE IF NOT EXISTS `propietarios` (
  `cedula_propietario` varchar(12) NOT NULL,
  `nombre_propietario` varchar(50) NOT NULL,
  `correo_propietario` varchar(50) NOT NULL,
  `direccion_propietario` varchar(50) NOT NULL,
  `telf_propietario` varchar(12) NOT NULL,
  `cod_inmuebles` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`cedula_propietario`,`cod_inmuebles`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `propietarios`
--

INSERT INTO `propietarios` (`cedula_propietario`, `nombre_propietario`, `correo_propietario`, `direccion_propietario`, `telf_propietario`, `cod_inmuebles`) VALUES
('20456999', 'Pedro Sanchez', 'pedritochulo@gmail.com', 'Gato Negro, Caracas 1030, Distrito Capital', '04142345690', 'I-001'),
('22333087', 'Maria Jose Vargas', 'mariamva@gmail.com', ' Avenida Principal de Las Mercedes (Miranda)', '04123478956', 'I-002'),
('19870456', 'Veronica Gomez', 'veritogomez@gmail.cpm', '6.ª Transversal de Los Dos Caminos, Caracas', '04121256789', 'I-003'),
('12789345', 'Mariana Pestana', 'pestanamaria@gmail.com', 'Los Chaguaramos, Caracas', '04242356770', 'I-004'),
('15678904', 'Lamine Yamal', 'lewandowski@gmail.com', 'Macaracuay, Caracas 1071, Distrito Capital', '04147847256', 'I-005'),
('12689345', 'Nicolas Fleming', 'filosofarius@gmail.com', 'Margarita, Venezuela ', '04245674598', 'I-006'),
('21789345', 'Miguel Soteldo', 'soteldinho@gmail.com', 'Las Mercedes', '0414121000', 'I-007'),
('12678234', 'Maria Corina', 'maricori@gmail.com', 'Los Cortijos', '02128903456', 'I-008'),
('10988564', 'Rubel Maneiro', 'wakawaka@gmail.com', 'Rio de Janeiro', '04126660066', 'I-009'),
('', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_clientes`
--

DROP TABLE IF EXISTS `tipo_clientes`;
CREATE TABLE IF NOT EXISTS `tipo_clientes` (
  `cod_tipo_clientes` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nombre_tipo_clientes` varchar(50) NOT NULL,
  PRIMARY KEY (`cod_tipo_clientes`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipo_clientes`
--

INSERT INTO `tipo_clientes` (`cod_tipo_clientes`, `nombre_tipo_clientes`) VALUES
('TC-001', 'Comprador'),
('TC-002', 'Inquilino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_inmuebles`
--

DROP TABLE IF EXISTS `tipo_inmuebles`;
CREATE TABLE IF NOT EXISTS `tipo_inmuebles` (
  `cod_Tipo` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nombre_tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`cod_Tipo`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipo_inmuebles`
--

INSERT INTO `tipo_inmuebles` (`cod_Tipo`, `nombre_tipo`) VALUES
('TI-001', 'Casa'),
('TI-002', 'Apartamento');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
