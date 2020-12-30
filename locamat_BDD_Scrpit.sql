SET time_zone = "+01:00";

DROP Database IF EXISTS locamat; 

CREATE Database locamat ; 

CREATE TABLE `usertable` (
  `id` int(11) NOT NULL,
  `lastName` varchar(128) DEFAULT NULL,
  `firstName` varchar(128) DEFAULT NULL,
  `mail` varchar(128) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `hashedPassword` varchar(256) DEFAULT NULL, 
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `usertable` (`id`, `lastName`, `firstName`, `mail`, `isAdmin`, `hashedPassword`) VALUES
(21700359, 'Doe', 'John', 'johndoe@mail.fr', 1, '$2b$10$.9x25V02d./qi1q9SE3iLe1dk9ndn.7PdL2DVMVXO3TncyLeuVayi'); 

