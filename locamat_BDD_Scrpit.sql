SET time_zone = "+01:00";

DROP Database IF EXISTS locamat; 

CREATE Database locamat ; 

CREATE TABLE `usertable` (
  `id` varchar(128) NOT NULL,
  `lastName` varchar(128) DEFAULT NULL,
  `firstName` varchar(128) DEFAULT NULL,
  `mail` varchar(128) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `hashedPassword` varchar(256) DEFAULT NULL, 
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `usertable` (`id`, `lastName`, `firstName`, `mail`, `isAdmin`, `hashedPassword`) VALUES
('LH44266', 'Hamilton', 'Lewis', 'lewis.hamilton@mercedes.com', 1, '$2b$10$QIo/l0lHYedPA1bVNNJTUe/OtWXnbaBv5HlM89XqNNI9v/Rp6L8fW'),
('VB77157', 'Bottas', 'Valtteri', 'valtteri.bottas@mercedes.com', 1, '$2b$10$hNkGQ77QVEcTwrG6RVqV9OSNwglXrKHOlfpJleNmksnz6qm3wYUj6'), 
('CL16059', 'Leclerc', 'Charles', 'charles.leclerc@ferrari.com', 0, '$2b$10$SNeoqsvk5rkv7Du2mVG99uIkZdhayeN7UnztFS6m5jD/JKK8Mn0nS'), 
('CS55119', 'Sainz', 'Carlos', 'carlos.sainz@ferrari.com', 0, '$2b$10$cOU5BIaOIOH1Mp6nQqEtOeSw94Tl58t.CW8SNZvqIv45FUkd3NKwq'),
('MV33119', 'Verstappen', 'Max', 'max.verstappen@redbull.com', 1, '$2b$10$UNNPYxmcB0yrvcsVqA2QV.Hr7oe28OtAmSmuAM03YLDMalqrByZ3S'),
('SP11195', 'Pérez', 'Sergio', 'sergio.perez@redbull.com', 1, '$2b$10$zTnhCaHlTRRSQ0SiS62D4.7AR5qABoJn.MWxUCzXrfNXNHaj0v//y'),
('DR03188', 'Ricciardo', 'Daniel', 'daniel.ricciardo@mclaren.com', 1, '$2b$10$ABO48QsQPsQKxu5nysWQcOKNkO63.bEUVnYv4V7QcAcOo5peelqSe'),
('LN04038', 'Norris', 'Lando', 'lando.norris@mclaren.com', 0, '$2b$10$wxzsOjlULlniG7izc3F13.gkGPsLDFOnWAP20rMexkiMQiza4M.X6'),
('EO31067', 'Ocon', 'Esteban', 'esteban.ocon@alpine.com', 0, '$2b$10$Mmw8nBgFBCXYtmoBxGU2QeXVx6gzylvDUTo9YORdNNTEHNINrMN0y'),
('FA14314', 'Alonso', 'Fernando', 'fernando.alonso@alpine.com', 0, '$2b$10$/63l8uxZbsHuuVMJpsZlSOk.dtv9EFVDd6PM2Qqt8wAW5apuDRarG'),
('SV05258', 'Vettel', 'Sebastian', 'sebastian.vettel@aston-martin.com', 0, '$2b$10$h53090Hh9rXAKo6NJlaCT.gaVLtViS4DkTNzHxMMcqwh0/my9l5xy'),
('LS18079', 'Stroll', 'Lance', 'lance.stroll@aston-martin.com', 0, '$2b$10$BaZo1iPt4r5zRTD0LyNGXO/6f8zwdnK0LJskEn0QiGViXm8cUqES2'),
('PG10064', 'Gasly', 'Pierre', 'pierre.gasly@alphaTauri.com', 0, '$2b$10$Jj2y5E1NftELw6Mgw8yQ1.aD.MbkZRLS1G/w0uK5D36TYksrs/VMa'),
('YT07024', 'Tsunoda', 'Yuki', 'yuki.tsunoda@alphaTauri.com', 0, '$2b$10$UUSFn29VsBO8YpEFhRiJVugH0NAGHxfloeBHNJKzZ1CuBvoSujN5i'),
('KR07332', 'Räikkönen', 'Kimi', 'kimi.raikkonen@alpha-romeo.com', 0, '$2b$10$WijsSp9e03Gmn858sr/51uI9dEJQ/jx855d/YIM.89.68.UUqEMrG'),
('AG99040', 'Giovinazzi', 'Antonio', 'antonio.giovinazzi@alpha-romeo.com', 0, '$2b$10$IUQfmmBVP3gFf9EC4Zh22up27RFhSyLIzNjRSGmpctCIhyTv3JCP6'),
('MS20048', 'Schumacher', 'Mick', 'mick.schumacher@haas.com', 0, '$2b$10$JMLUJ1Hch7gWKlF9tE/cbueSrmls6K97bkVZojufwVLRxeT1ZJJhy'),
('NM24048', 'Mazepin', 'Nikita', 'nikita.mazepin@haas.com', 0, '$2b$10$dgIFRig.QlJtn9xrGATw0uS2vV8S513GQOOO1kuOu7gHwreDdcPyO'),
('GR63038', 'Russell', 'George', 'george.russell@williams.com', 0, '$2b$10$3cRVss/PNJZT2W1vzga4k.dPTkGgddQN7l6Aq8ZwjTmPri5NQKKRa'),
('NL06017', 'Latifi', 'Nicholas', 'nicholas.latifi@williams.com', 0, '$2b$10$H6FalskWZcfaGNm16mOhye0u9DDN4Ez8lWHysrQeKHchjchhnIXCy');

CREATE TABLE `deviceTable` (
  `ref` varchar(128) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `version` varchar(128) DEFAULT NULL,
  `pictureUrl` VARCHAR(2083) DEFAULT NULL,
  `borrowerID` varchar(128) DEFAULT NULL,
  `borrowingStartDate` DATE DEFAULT NULL, 
  `borrowingEndDate` DATE DEFAULT NULL, 
  PRIMARY KEY(`ref`),
  FOREIGN KEY(`borrowerID`) REFERENCES usertable(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `deviceTable` (`ref`, `name`, `version`, `borrowerID`, `borrowingStartDate`,`borrowingEndDate`) VALUES
('AP975','iPhone','12 Pro','LH44266','2021-01-07','2021-01-21'),
('AN042','Xiaomi','Mi 10T Pro','MV33119','2021-02-17','2021-03-17'),
('XX432','Dell','G3 1530','LH44266','2021-01-01','2022-01-01'),
('AP362','iPad','Pro','YT07024','2021-03-07','2021-03-14'),
('AP581','MacBook','Pro Touch','PG10064','2021-01-02','2021-07-01'),
('AN593','OnePlus','8 Pro','SV05258','2021-02-07','2021-02-14'),
('AN537','Samsung Galaxy','Z Fold2','CS55119','2021-01-07','2021-04-14'),
('AP991','iPhone','12 Pro',NULL,NULL,NULL),
('AP930','iPhone','12 Pro',NULL,NULL,NULL),
('AP515','iPhone','12 Pro',NULL,NULL,NULL),
('XX183','Dell','G3 1530',NULL,NULL,NULL),
('XX537','Dell','G3 1530',NULL,NULL,NULL),
('XX186','Dell','G3 1530',NULL,NULL,NULL);

