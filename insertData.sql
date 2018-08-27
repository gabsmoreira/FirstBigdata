USE fetchflix;

INSERT INTO Genre(id, name) VALUES(1, 'Terror');
INSERT INTO Genre(id, name) VALUES(2, 'Ficção Científica');
INSERT INTO Genre(id, name) VALUES(3, 'Ação');
INSERT INTO Genre(id, name) VALUES(4, 'Comédia');

INSERT INTO Actor(id, name, age) VALUES(1, 'Albert Hoffman', 13);
INSERT INTO Actor(id, name, age) VALUES(2, 'Edward Take', 67);
INSERT INTO Actor(id, name, age) VALUES(3, 'Frederick Short', 2);
INSERT INTO Actor(id, name, age) VALUES(4, 'Little Bobby Tables', 130);
INSERT INTO Actor(id, name, age) VALUES(5, 'Phillip While', 13);
INSERT INTO Actor(id, name, age) VALUES(6, 'Milton Clovis', 13);
INSERT INTO Actor(id, name, age) VALUES(7, 'Roger Frederer', 13);

INSERT INTO Producer(id, name) VALUES(1, 'HBO');
INSERT INTO Producer(id, name) VALUES(2, 'Netflix');
INSERT INTO Producer(id, name) VALUES(3, 'BBC');
INSERT INTO Producer(id, name) VALUES(4, 'ABC');

INSERT INTO Tv_show(id, name, id_producer, number_of_seasons, where_to_find, download_link) VALUES(1,'Rico e Morte', 2, 4, 'Netflix', 'www.baixaki.com/virus666');
INSERT INTO Tv_show(id, name, id_producer, number_of_seasons, where_to_find, download_link) VALUES(2,'Jogo das Cadeiras', 1, 8, 'HBO Go', 'www.baixaki.com/virus666');
INSERT INTO Tv_show(id, name, id_producer, number_of_seasons, where_to_find, download_link) VALUES(3,'98 brooklings', 1, 2, 'Netflix', 'www.baixaki.com/virus666');
INSERT INTO Tv_show(id, name, id_producer, number_of_seasons, where_to_find, download_link) VALUES(4,'Anatomia de Cinza', 2, 8, 'HBO Go', 'www.baixaki.com/virus666');
INSERT INTO Tv_show(id, name, id_producer, number_of_seasons, where_to_find, download_link) VALUES(5,'Espelho Preto', 3, 5, 'HBO Go', 'www.baixaki.com/virus666');
INSERT INTO Tv_show(id, name, id_producer, number_of_seasons, where_to_find, download_link) VALUES(6,'Quimica do mal', 1, 1, 'HBO Go', 'www.baixaki.com/virus666');


INSERT INTO Watcher(id, name) VALUES(1, 'Graber');
INSERT INTO Watcher(id, name) VALUES(2, 'Tirtop');
INSERT INTO Watcher(id, name) VALUES(3, 'Forbas');
INSERT INTO Watcher(id, name) VALUES(4, 'Phalafel');

INSERT INTO Rel_Tv_show_Watcher(id_watcher, id_tv_show, score) VALUES(1,1, 5);
INSERT INTO Rel_Tv_show_Watcher(id_watcher, id_tv_show, score) VALUES(2, 4, 4);
INSERT INTO Rel_Tv_show_Watcher(id_watcher, id_tv_show, score) VALUES(2, 6, 2);
INSERT INTO Rel_Tv_show_Watcher(id_watcher, id_tv_show, score) VALUES(2, 2, 3);
INSERT INTO Rel_Tv_show_Watcher(id_watcher, id_tv_show, score) VALUES(3, 3, 5);
INSERT INTO Rel_Tv_show_Watcher(id_watcher, id_tv_show, score) VALUES(1, 4, 4);

INSERT INTO Rel_Tv_show_Genre(id_genre, id_tv_show) VALUES(4, 1);
INSERT INTO Rel_Tv_show_Genre(id_genre, id_tv_show) VALUES(2, 1);
INSERT INTO Rel_Tv_show_Genre(id_genre, id_tv_show) VALUES(3, 2);
INSERT INTO Rel_Tv_show_Genre(id_genre, id_tv_show) VALUES(1, 1);
INSERT INTO Rel_Tv_show_Genre(id_genre, id_tv_show) VALUES(1, 3);
INSERT INTO Rel_Tv_show_Genre(id_genre, id_tv_show) VALUES(1, 4);
INSERT INTO Rel_Tv_show_Genre(id_genre, id_tv_show) VALUES(2, 5);
INSERT INTO Rel_Tv_show_Genre(id_genre, id_tv_show) VALUES(3, 6);


INSERT INTO Rel_Tv_show_Actor(id_tv_show, id_actor, role) VALUES(1, 1, 'Rico');
INSERT INTO Rel_Tv_show_Actor(id_tv_show, id_actor, role) VALUES(1, 2, 'Morte');
INSERT INTO Rel_Tv_show_Actor(id_tv_show, id_actor, role) VALUES(2, 3, 'Joao');
INSERT INTO Rel_Tv_show_Actor(id_tv_show, id_actor, role) VALUES(3, 4, 'Holt');
INSERT INTO Rel_Tv_show_Actor(id_tv_show, id_actor, role) VALUES(4, 5, 'Dr. Cinza');
INSERT INTO Rel_Tv_show_Actor(id_tv_show, id_actor, role) VALUES(5, 7, 'Um iphone');
INSERT INTO Rel_Tv_show_Actor(id_tv_show, id_actor, role) VALUES(6, 6, 'Walter Branco');
