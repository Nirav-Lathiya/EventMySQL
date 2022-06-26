SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `events`(
    id int(11) NOT NULL AUTO_INCREMENT,
    eventName VARCHAR(255) NOT NULL,
    create_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime NOT NULL DEFAULT ON UPDATE CURRENT_TIMESTAMP
)

ALTER TABLE `events`
   ADD userId int(11) ,
   CONSTRAINT e_user FOREIGN KEY (`userId`) REFERENCES user(id),
   ADD PRIMARY KEY ('id'),
   ADD UNIQUE KEY idx_event_unique (`event`)


CREATE TABLE `user`(
    id int(11) NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email  VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL
)

ALTER TABLE 'user'
   ADD PRIMARY KEY ('id'),
   ADD UNIQUE KEY idx_user_unique (`event`)

COMMIT;
 