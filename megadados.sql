DROP DATABASE if EXISTS fetchflix;
CREATE DATABASE fetchflix;
use fetchflix;

DROP TABLE IF EXISTS Genre;
CREATE TABLE Genre (
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR (80) NOT NULL,
   PRIMARY KEY (id)
);

DROP TABLE IF EXISTS Actor;
CREATE TABLE Actor (
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR (80) NOT NULL,
   age INT NOT NULL,
   PRIMARY KEY (id)
);


DROP TABLE IF EXISTS Producer;
CREATE TABLE Producer (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(80) NOT NULL,
    PRIMARY KEY (id)
);


DROP TABLE IF EXISTS Tv_show;
CREATE TABLE Tv_show (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(80) NOT NULL,
    id_producer INT NOT NULL,
    number_of_seasons INT NOT NULL,
    avg_score INT NOT NULL,
    where_to_find VARCHAR(50),
    download_link VARCHAR(200),
    photo mediumblob not null, 
    FOREIGN KEY(id_producer) REFERENCES Producer(id),
    PRIMARY KEY (id)
    
);

DROP TABLE IF EXISTS Watcher;
CREATE TABLE Watcher (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (80) NOT NULL,
    password VARCHAR(50),
    PRIMARY KEY (id)
);


DROP TABLE IF EXISTS Rel_Tv_show_Watcher;
CREATE TABLE Rel_Tv_show_Watcher(
    id_watcher INT NOT NULL,
    id_tv_show INT NOT NULL,
    score INT NOT NULL,
    FOREIGN KEY(id_watcher) REFERENCES Watcher(id),
    FOREIGN KEY(id_tv_show) REFERENCES Tv_show(id),
    PRIMARY KEY (id_watcher, id_tv_show)
);

DROP TABLE IF EXISTS Rel_Tv_show_Genre;
CREATE TABLE Rel_Tv_show_Genre(
    id_genre INT NOT NULL,
    id_tv_show INT NOT NULL,
    FOREIGN KEY(id_genre) REFERENCES Genre(id),
    FOREIGN KEY(id_tv_show) REFERENCES Tv_show(id),
    PRIMARY KEY (id_genre, id_tv_show)
);


DROP TABLE IF EXISTS Rel_Tv_show_Actor;
CREATE TABLE Rel_Tv_show_Actor(
    id_tv_show INT NOT NULL,
    id_actor INT NOT NULL,
    role VARCHAR(80),
    FOREIGN KEY(id_actor) REFERENCES Actor(id),
    FOREIGN KEY(id_tv_show) REFERENCES Tv_show(id),
    PRIMARY KEY (id_actor, id_tv_show)
);





