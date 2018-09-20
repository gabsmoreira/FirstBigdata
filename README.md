# FirstBigdata

![example](https://github.com/gabsmoreira/FirstBigdata/blob/master/Diagrama/top.png?raw=true)


## How to run

### Preparing your enviroment
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



### Run frontend
Turn CORS (Allow-Control-Allow-Origin) on. 

Go to ```/front ``` and run ```yarn install ``` to install dependencies.

Then run ```yarn  start```. A webpage should pop in.

## How to deploy
Go to ```/front ``` and run ```yarn install ``` to install dependencies. 

Run ```yarn build```. This should create another directory ```/build``` with static files for your website.

Run ```yarn add serve```.

Run ```yarn serve -s build ```. The static website should be running on your port 5000.

