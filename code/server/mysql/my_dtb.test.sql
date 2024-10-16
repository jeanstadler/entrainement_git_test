DROP DATABASE IF exists dtb_test;

CREATE DATABASE dtb_test;


CREATE TABLE dtb_test.role(
	id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE dtb_test.user(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id TINYINT UNSIGNED,
    FOREIGN KEY(role_id) REFERENCES dtb_test.role(id)
);

CREATE TABLE dtb_test.eleve(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(50) NOT NULL,
    user_id TINYINT UNSIGNED,
    FOREIGN KEY(user_id) REFERENCES dtb_test.user(id)
);

CREATE TABLE dtb_test.prof(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(50) NOT NULL
);

CREATE TABLE dtb_test.cours(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(50) NOT NULL,
    eleve_id TINYINT UNSIGNED,
    prof_id TINYINT UNSIGNED,
    FOREIGN KEY(eleve_id) REFERENCES dtb_test.eleve(id),
    FOREIGN KEY(prof_id) REFERENCES dtb_test.prof(id)
);

INSERT INTO dtb_test.role 
VALUES 
    (NULL, 'admin'), 
    (NULL, 'user');

INSERT INTO dtb_test.user
VALUES
    (NULL, "jean","test@gmail.com","mot_de_passe123","2"),
    (NULL, "rayou","rayou@gmail.com","mot_de_passe_rayou","1");

INSERT INTO dtb_test.eleve
VALUES
    (NULL,'jean',1),
    (NULL,'rayou',2);


INSERT INTO dtb_test.prof
VALUES
    (NULL, 'jeremy'),
    (NULL,'laurent'),
    (null,'djamel');

INSERT INTO dtb_test.cours
VALUES
    (NULL,'mathematique',1,1),
    (NULL,'mathematique',2,1),
    (NULL,'mathematique',2,2);


    


-- select
--     prof.name,
--     user.firstname
-- from
--     dtb.cours
-- join
--     dtb.prof on cours.prof_id = prof.id
-- join
--     dtb.eleve on cours.eleve_id = eleve.id
-- join
--     dtb.user on eleve.user_id = user.id;
