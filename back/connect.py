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
	
	cursor.execute("SELECT * FROM Tv_show")
	try:
		result = cursor.fetchall()
		# print("a: ",result)
		result_sem_blob = []
		blobs = []
		for i in range(len(result)):
			print("a: ", result[i][0:7])
			# blobs.append(base64.b64encode(result[i][7]))
			# blobs.append(json.dumps(result[i][7].decode("utf-16")))
			blobs.append(io.BytesIO(result[i][7]))
			result_sem_blob.append(result[i][0:7])
			# write_file(result[i][7].decode("utf-8"), filename)
		# print(blobs[0])

		# for i in range(len(result)):
		# 	result_sem_blob[i] = result_sem_blob[i] + (blobs[i],)
		
	except Exception as err:
		print("[ERROR]: {}".format(err))
		result = 0
	return jsonify(result_sem_blob)

	# json.dumps(x.decode("utf-8"))

app.run()