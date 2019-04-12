CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `sex` tinyint(1) DEFAULT NULL COMMENT '1男，2女',
  `age` int(5) DEFAULT NULL,
  `school_id` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL COMMENT '1开除，2、毕业，3、就读，4、复读',
  `update_time` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;