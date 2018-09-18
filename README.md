# FirstBigdata

## How to run

### Preparing yout enviroment
Copy the content of ```/img``` folder to:

**Linux:** ```/var/lib/mysql-files```

**OSX:** We don't know yet (I'm sorry).

**Windows:** We don't do that here.

### Create database
Start your mysql-server.

Run ```megadados.sql``` to create tables and database.

Run ```insertData.sql``` to insert data into the database.

### Run backend
Go to ```/back ``` and run ```python connect.py ```.

Turn CORS (Allow-Control-Allow-Origin) on. 


### Run frontend
Go to ```/front ``` and run ```yarn install ``` to install dependencies.

Then run ```yarn  start```. A webpage should pop in.
