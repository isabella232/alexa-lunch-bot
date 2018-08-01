CREATE TABLE `lunch_spots` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `score` int(11) NOT NULL DEFAULT '0',
  `lastSuggested` date NOT NULL DEFAULT '0000-01-01',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unqtitle` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
