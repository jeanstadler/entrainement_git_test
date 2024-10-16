DROP DATABASE IF exists dtb;

CREATE DATABASE dtb;


CREATE TABLE dtb.role(
	id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE dtb.user(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id TINYINT UNSIGNED,
    FOREIGN KEY(role_id) REFERENCES dtb.role(id)
);

CREATE TABLE dtb.eleve(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(50) NOT NULL,
    user_id TINYINT UNSIGNED,
    FOREIGN KEY(user_id) REFERENCES dtb.user(id)
);

CREATE TABLE dtb.prof(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(50) NOT NULL
);

CREATE TABLE dtb.cours(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(50) NOT NULL,
    eleve_id TINYINT UNSIGNED,
    prof_id TINYINT UNSIGNED,
    FOREIGN KEY(eleve_id) REFERENCES dtb.eleve(id),
    FOREIGN KEY(prof_id) REFERENCES dtb.prof(id)
);

INSERT INTO dtb.role 
VALUES 
    (NULL, 'admin'), 
    (NULL, 'user');

INSERT INTO dtb.user
VALUES
    (NULL, "admin","admin@admin","admin1234","1"),
    (NULL, "rayou","rayou@gmail.com","mot_de_passe_rayou","2");

INSERT INTO dtb.eleve
VALUES
    (NULL,'jean',1),
    (NULL,'rayou',2);


INSERT INTO dtb.prof
VALUES
    (NULL, 'jeremy'),
    (NULL,'laurent'),
    (null,'djamel');

INSERT INTO dtb.cours
VALUES
    (NULL,'mathematique',1,1),
    (NULL,'mathematique',2,1),
    (NULL,'mathematique',2,2);


    

