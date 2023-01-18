-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-12-2022 a las 16:42:29
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mancomunidad`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actas_entrega`
--

CREATE TABLE `actas_entrega` (
  `id` int(11) NOT NULL,
  `numero_acta` varchar(10) NOT NULL,
  `cantidad` int(2) NOT NULL,
  `detalle` varchar(50) NOT NULL,
  `numero_placa` varchar(11) NOT NULL,
  `nombre` varchar(75) NOT NULL,
  `cedula` varchar(13) NOT NULL,
  `dia` varchar(2) NOT NULL,
  `mes` varchar(15) NOT NULL,
  `anio` varchar(4) NOT NULL,
  `usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `actas_entrega`
--

INSERT INTO `actas_entrega` (`id`, `numero_acta`, `cantidad`, `detalle`, `numero_placa`, `nombre`, `cedula`, `dia`, `mes`, `anio`, `usuario`) VALUES
(1, '756', 1, 'Placas Alex Villegas', 'TBA323', 'Alex Villegas', '2300687510', '20', 'diciembre', '2022', 2),
(2, '100', 2, 'Placas ABC', 'TBA323', 'Juan Caiza', '2300687510', '10', 'Enero', '2020', 2),
(3, '1000', 3, 'Placas mal estado', '1wdfw', 'Marco Villamarin', '2300687510', '1', 'marzo', '2022', 2),
(4, '1001', 2, 'Placas de vehículo particular', 'bta1231', 'Omar Fonseca', '2300687510', '21', 'diciembre', '2022', 2),
(5, '1002', 2, 'Placas para verificar', 'TAB1231', 'Juan Colcha', '2300687510', '21', 'diciembre', '2022', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `id` int(11) NOT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`id`, `estado`) VALUES
(1, 'entregado'),
(2, 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `placa`
--

CREATE TABLE `placa` (
  `id` int(11) NOT NULL,
  `placa` varchar(45) DEFAULT NULL,
  `propietario` varchar(50) DEFAULT NULL,
  `cedula` varchar(13) NOT NULL,
  `id_tipo_placa` int(11) DEFAULT NULL,
  `id_tipo_vehiculo` int(11) DEFAULT NULL,
  `id_usuario_modifico` int(11) DEFAULT NULL,
  `fecha_ingreso` date NOT NULL,
  `fecha_modificacion` date DEFAULT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `placa`
--

INSERT INTO `placa` (`id`, `placa`, `propietario`, `cedula`, `id_tipo_placa`, `id_tipo_vehiculo`, `id_usuario_modifico`, `fecha_ingreso`, `fecha_modificacion`, `estado`) VALUES
(1, 'BHB-111', 'Alex Villegas', '2300687510', 2, 1, 2, '0000-00-00', '2022-12-20', 1),
(4, 'TBA-123', 'Ronaldo Buenaño', '2312123123', 3, 2, 2, '0000-00-00', NULL, 1),
(5, 'HBD-123', 'Juan', '1234567891', 1, 2, 2, '2022-12-20', NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `rol` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `rol`) VALUES
(1, 'admin'),
(2, 'consultor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_placa`
--

CREATE TABLE `tipo_placa` (
  `id` int(11) NOT NULL,
  `tipo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_placa`
--

INSERT INTO `tipo_placa` (`id`, `tipo`) VALUES
(1, 'Particular'),
(2, 'Público'),
(3, 'Estatal'),
(4, 'Municipal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_vehiculo`
--

CREATE TABLE `tipo_vehiculo` (
  `id` int(11) NOT NULL,
  `tipo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_vehiculo`
--

INSERT INTO `tipo_vehiculo` (`id`, `tipo`) VALUES
(1, 'moto'),
(2, 'vehículo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `user` varchar(45) DEFAULT NULL,
  `pass` varchar(500) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `id_rol` int(11) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `user`, `pass`, `nombre`, `id_rol`, `estado`) VALUES
(2, 'villegas', '$2a$10$DmzjJYbAokbLuVgzyfhRxOqacFiMev.Xv/Mr6O5X.hyGPMrV5.Huy', 'Alex Villegas', 1, 1),
(9, 'alex123', '$2a$10$v4Tlcsk0ELpKT8SoOoH8eOBDA8jj2StA.JhyP6cLm/aL2vO/E3Ssi', '', 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actas_entrega`
--
ALTER TABLE `actas_entrega`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `placa`
--
ALTER TABLE `placa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tipo_placa_idx` (`id_tipo_placa`),
  ADD KEY `id_tipo_vehiculo_idx` (`id_tipo_vehiculo`),
  ADD KEY `id_usuario_modifico` (`id_usuario_modifico`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_placa`
--
ALTER TABLE `tipo_placa`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_vehiculo`
--
ALTER TABLE `tipo_vehiculo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario_idx` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actas_entrega`
--
ALTER TABLE `actas_entrega`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `placa`
--
ALTER TABLE `placa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipo_placa`
--
ALTER TABLE `tipo_placa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipo_vehiculo`
--
ALTER TABLE `tipo_vehiculo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `placa`
--
ALTER TABLE `placa`
  ADD CONSTRAINT `id_tipo_placa` FOREIGN KEY (`id_tipo_placa`) REFERENCES `tipo_placa` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_tipo_vehiculo` FOREIGN KEY (`id_tipo_vehiculo`) REFERENCES `tipo_vehiculo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `placa_ibfk_1` FOREIGN KEY (`id_usuario_modifico`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `id_usuario` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
