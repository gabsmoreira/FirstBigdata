import pymysql

from flask import Flask, request, jsonify

import json

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

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/users', methods = ['GET', 'POST'])
def user():

    if  request.method == 'GET':
        cursor.execute("SELECT * FROM Watcher")
        #print(cursor.fetchall())
        return jsonify(cursor.fetchall())

    if request.method == 'POST':
        # print('JSON: {0}'.format(request.get_json()))
        a = json.loads(request.data.decode("utf-8"))
    
        db.run("INSERT INTO Watcher (name, password) VALUES (%s, %s)", (a["username"], a["password"]))
        db.run("COMMIT")
        return  "tudo rodou bunitinho"


app.run()