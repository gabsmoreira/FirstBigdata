import pymysql

from Flask import Flask 

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
    'password': '160520',
    'database': 'fetchflix',    
}
connection = pymysql.connect(**connection_options)

db = ConnectionHelper(connection)

app = Flask(_name_)

@app.route('/')
def hello_world():
    return 'Hello, World!'