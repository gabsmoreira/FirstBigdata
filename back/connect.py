import pymysql
from flask import Flask, request, jsonify
import json

class ConnectionHelper:
	def __init__(self, connection):
		self.connection = connection
	
	def run(self, query, args=None):
		with self.connection.cursor() as cursor:
			print('Executando query:')
			print(cursor.mogrify(query, args))  # O que este comando faz?
			cursor.execute(query, args)
			for result in cursor.fetchall():
				print(result)

connection_options = {
	'host': 'localhost',
	'user': 'root',
	'password': '1234',
	'database': 'fetchflix',    
}
connection = pymysql.connect(**connection_options)

db = ConnectionHelper(connection)
cursor = connection.cursor()

app = Flask(__name__)

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
	cursor.execute("SELECT * FROM Tv_show")
	try:
		result = cursor.fetchall()
		print("a: ",result)

	except Exception as err:
		print("[ERROR]: {}".format(err))
		result = 0
	return jsonify(result)	


app.run()