import pymysql
from flask import Flask, request, jsonify
import json
import io
import base64

class ConnectionHelper:

	def __init__(self, connection):
		self.connection = connection
	
	def run(self, query, args=None):
		with self.connection.cursor() as cursor:
			print('Executando query:')
			print(cursor.mogrify(query, args))
			cursor.execute(query, args)
			for result in cursor.fetchall():
				print(result)


connection_options = {
	'host': 'localhost',
	'user': 'root',
	'password': '160520',
	'database': 'fetchflix',    
}
connection = pymysql.connect(**connection_options)

db = ConnectionHelper(connection)
cursor = connection.cursor()

app = Flask(__name__)

# def write_file(data, filename):
#     with open(filename, 'wb') as f:
#         f.write(data)

@app.route('/')
def hello_world():
	return 'Hello, World!'

@app.route('/users', methods = ['GET', 'POST'])
def user():
	if  request.method == 'GET':
		print('[BACKEND]: /users GET ')
		cursor.execute("SELECT * FROM Watcher")
		return jsonify(cursor.fetchall())

	if request.method == 'POST':
		print('[BACKEND]: /users POST {0}'.format(request.get_json()))
		a = json.loads(request.data.decode("utf-8"))
	
		db.run("INSERT INTO Watcher (name, password) VALUES (%s, %s)", (a["username"], a["password"]))
		db.run("COMMIT")
		cursor.execute("SELECT id FROM Watcher WHERE name=%s AND password=%s LIMIT 1", (a["username"], a["password"]))
		return jsonify(cursor.fetchall()[0][0])

@app.route('/login', methods = ['POST'])
def login():
	print('[BACKEND] LOGIN with {}'.format(request.get_json()))
	a = json.loads(request.data.decode("utf-8"))
	try:
		cursor.execute("SELECT id FROM Watcher WHERE name=%s AND password=%s LIMIT 1", (a["username"], a["password"]))
		result = cursor.fetchall()[0][0]
		print("a: ",cursor.fetchall())
	except Exception as err:
		print("[ERROR]: {}".format(err))
		result = 0
	return jsonify(result)



@app.route('/tvshows', methods = ['GET'])
def tvshows():
	print('[BACKEND] GET Tvshows')
	cursor.execute("use fetchflix;")
	print("use fetflix")
	cursor.execute("DROP TABLE IF EXISTS temp;")
	print("criou tabela")
	cursor.execute("""
	CREATE TEMPORARY TABLE temp
	SELECT 
		Tv_show.id, Tv_show.name, Producer.name as 'producer', group_concat(' ', Genre.name) as 'genres',
		Tv_show.number_of_seasons, Tv_show.avg_score, Tv_show.where_to_find, Tv_show.download_link, Tv_show.photo
	FROM
		Producer JOIN
		Tv_show ON Producer.id = Tv_show.id_producer JOIN
		Rel_Tv_show_Genre ON Tv_show.id = Rel_Tv_show_Genre.id_tv_show JOIN
		Genre ON Genre.id = Rel_Tv_show_Genre.id_genre

	GROUP BY
		Tv_show.id
	;
	""");
	print("criou tabela")
	cursor.execute("SELECT @@sql_mode into @modeatual;")
	cursor.execute("SET sql_mode = '';")
	cursor.execute("""
	
	

	SELECT 
		temp.id, temp.name, temp.producer, temp.genres, group_concat(' ', Actor.name) as actors,
		temp.number_of_seasons, temp.avg_score, temp.where_to_find, temp.download_link, temp.photo

	FROM
		temp JOIN 
		Rel_Tv_show_Actor ON temp.id = Rel_Tv_show_Actor.id_tv_show JOIN
		Actor ON Rel_Tv_show_Actor.id_actor = Actor.id

	GROUP BY
		temp.id;

	""");

	
	try:
		result = cursor.fetchall()
		# print("a: ",result)
		result_sem_blob = []
		blobs = []
		for i in range(len(result)):
			print("a: ", result[i][0:9])
			result_sem_blob.append(result[i][0:9])
			blobs.append(base64.b64encode(result[i][9]))
		for i in range(len(result)):
			result_sem_blob[i] = result_sem_blob[i] + (blobs[i],)
			
	except Exception as err:
		print("[ERROR]: {}".format(err))
		result = 0
	cursor.execute("SET sql_mode = @modeatual;")
	return jsonify(result_sem_blob)



@app.route('/search', methods = ['POST'])
def search():
	a = json.loads(request.data.decode("utf-8"))
	cursor.execute("use fetchflix;")
	print("use fetflix")
	cursor.execute("DROP TABLE IF EXISTS temp;")
	print("criou tabela")
	cursor.execute("""
	CREATE TEMPORARY TABLE temp
	SELECT 
		Tv_show.id, Tv_show.name, Producer.name as 'producer', group_concat(' ', Genre.name) as 'genres',
		Tv_show.number_of_seasons, Tv_show.avg_score, Tv_show.where_to_find, Tv_show.download_link, Tv_show.photo
	FROM
		Producer JOIN
		Tv_show ON Producer.id = Tv_show.id_producer JOIN
		Rel_Tv_show_Genre ON Tv_show.id = Rel_Tv_show_Genre.id_tv_show JOIN
		Genre ON Genre.id = Rel_Tv_show_Genre.id_genre

	GROUP BY
		Tv_show.id
	;
	""");
	print("criou tabela")
	cursor.execute("SELECT @@sql_mode into @modeatual;")
	cursor.execute("SET sql_mode = '';")
	cursor.execute("""
	
	

	SELECT 
		temp.id, temp.name, temp.producer, temp.genres, group_concat(' ', Actor.name) as actors,
		temp.number_of_seasons, temp.avg_score, temp.where_to_find, temp.download_link, temp.photo

	FROM
		temp JOIN 
		Rel_Tv_show_Actor ON temp.id = Rel_Tv_show_Actor.id_tv_show JOIN
		Actor ON Rel_Tv_show_Actor.id_actor = Actor.id
	GROUP BY
		temp.id
	HAVING 
	(LOCATE(%s, actors) > 0 OR
	LOCATE(%s, name) > 0) AND
	LOCATE(%s, genres) > 0;
	

	""",(a['search'], a['search'],  a['genre']));

	
	try:
		result = cursor.fetchall()
		# print("a: ",result)
		result_sem_blob = []
		blobs = []
		for i in range(len(result)):
			print("a: ", result[i][0:9])
			result_sem_blob.append(result[i][0:9])
			blobs.append(base64.b64encode(result[i][9]))
		for i in range(len(result)):
			result_sem_blob[i] = result_sem_blob[i] + (blobs[i],)
			
	except Exception as err:
		print("[ERROR]: {}".format(err))
		result = 0
	cursor.execute("SET sql_mode = @modeatual;")
	return jsonify(result_sem_blob)


@app.route('/seen', methods = ['POST'])
def seen():
	a = json.loads(request.data.decode("utf-8"))
	cursor.execute("use fetchflix;")
	# print("use fetflix")
	cursor.execute("DROP TABLE IF EXISTS temp;")
	# print("criou tabela")
	cursor.execute("""
	CREATE TEMPORARY TABLE temp
	SELECT 
		Tv_show.id, Tv_show.name, Producer.name as 'producer', group_concat(' ', Genre.name) as 'genres',
		Tv_show.number_of_seasons, Tv_show.avg_score, Tv_show.where_to_find, Tv_show.download_link, Tv_show.photo
	FROM
		Producer JOIN
		Tv_show ON Producer.id = Tv_show.id_producer JOIN
		Rel_Tv_show_Genre ON Tv_show.id = Rel_Tv_show_Genre.id_tv_show JOIN
		Genre ON Genre.id = Rel_Tv_show_Genre.id_genre

	GROUP BY
		Tv_show.id
	;
	""")
	# print("criou tabela")
	cursor.execute("SELECT @@sql_mode into @modeatual;")
	cursor.execute("SET sql_mode = '';")
	cursor.execute("DROP TABLE IF EXISTS temp2;")
	cursor.execute("""
					CREATE TEMPORARY TABLE temp2
					SELECT 
						temp.id, temp.name, temp.producer, temp.genres, group_concat(' ', Actor.name) as actors, temp.number_of_seasons, temp.avg_score, temp.where_to_find, temp.download_link, temp.photo

					FROM
						temp JOIN 
    					Rel_Tv_show_Actor ON temp.id = Rel_Tv_show_Actor.id_tv_show JOIN
    					Actor ON Rel_Tv_show_Actor.id_actor = Actor.id

					GROUP BY
						temp.id;""")
	cursor.execute("""
					SELECT 
					temp2.id, temp2.name, temp2.producer, temp2.genres, temp2.actors, temp2.number_of_seasons, temp2.avg_score, temp2.where_to_find, temp2.download_link, temp2.photo, Watcher.id

					FROM 
						temp2 JOIN
						Rel_Tv_show_Watcher ON temp2.id = Rel_Tv_show_Watcher.id_tv_show JOIN
						Watcher ON Watcher.id = Rel_Tv_show_Watcher.id_watcher

					WHERE
						Watcher.id = %s
					;""", (a['id']))
	
	try:
		result = cursor.fetchall()
		# print("a: ",result)
		result_sem_blob = []
		blobs = []
		for i in range(len(result)):
			print("a: ", result[i][0:9])
			result_sem_blob.append(result[i][0:9])
			blobs.append(base64.b64encode(result[i][9]))
		for i in range(len(result)):
			result_sem_blob[i] = result_sem_blob[i] + (blobs[i],)
			
	except Exception as err:
		print("[ERROR]: {}".format(err))
		result = 0
	cursor.execute("SET sql_mode = @modeatual;")
	return jsonify(result_sem_blob)


@app.route('/checkSeen', methods = ['POST'])
def checkSeen():
	a = json.loads(request.data.decode("utf-8"))
	cursor.execute("use fetchflix;")
	cursor.execute("select count(*) from Rel_Tv_show_Watcher where id_watcher = %s and id_tv_show = %s", (a['id_user'], a['id_film']))
	result = cursor.fetchall()
	
	return jsonify(result[0][0])

@app.route('/hasSeen', methods = ['POST'])
def hasSeen():
	a = json.loads(request.data.decode("utf-8"))
	cursor.execute("use fetchflix;")
	cursor.execute("insert into Rel_Tv_show_Watcher (id_watcher, id_tv_show, score) values(%s, %s, %s)", (a['id_user'], a['id_film'], a['score']))
	result = cursor.fetchall()
	return jsonify("TOP")


app.run()