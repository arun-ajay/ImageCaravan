# How to initialize the backend

## Overview
<p> The backend is designed using MariaDB as well as Flask. We'll partition this into four sections. 
The frontend is designed using React. Users have the capability of uploading images with new/existing hashtags. Users can create accounts. Users are capable of following each other, and commenting on pictures/profiles. All data regarding images/hashtags/accounts are retrieved from the backend via API calls. 



## MariaDB *REQUIRED*

**Note: You must have MariaDB installed on your PC.**

1. Change to the directory of the server folder
2. Log into MariaDB using `mysql -u username -p -h localhost`
2. Run the ImageCaravanSchemas.sql file by doing `source ImageCaravanSchemas.sql`


*Sample of what you should see on the terminal*
```console
Setting environment for MariaDB 10.5 (x64)

C:\WINDOWS\system32>cd C:\Users\Arun\GitProjects\Spring2021\ImageCaravan\server

C:\Users\Arun\GitProjects\Spring2021\ImageCaravan\server>mysql -u root -p -h localhost
Enter password: *********
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 1525
Server version: 10.5.9-MariaDB mariadb.org binary distribution

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> source ImageCaravanSchemas.sql
Query OK, 7 rows affected (0.026 sec)

Query OK, 1 row affected (0.001 sec)

Database changed
Query OK, 0 rows affected (0.006 sec)

Query OK, 0 rows affected (0.006 sec)

Query OK, 0 rows affected (0.008 sec)

Query OK, 0 rows affected (0.008 sec)

Query OK, 0 rows affected (0.008 sec)

Query OK, 0 rows affected (0.005 sec)

Query OK, 0 rows affected (0.006 sec)

MariaDB [imagecaravan]>

```

With this `ImageCaravan.sql` file, you are working with an entirely fresh database with new data within the tables. If you don't have a `dump.sql` file, then you can skip to the Config.json file section

## MariaDB *OPTIONAL*
**Note: Make sure you are using the imagecaravan database**

1. Run the dump.sql file by doing `source dump.sql`

*You may have to press enter twice*


*Sample of what you should see on the terminal*
```console
MariaDB [imagecaravan]> source dump.sql
. . . 
Cut for brevity
. . . 

Query OK, 0 rows affected (0.000 sec)

Query OK, 0 rows affected (0.000 sec)

Query OK, 0 rows affected (0.000 sec)

MariaDB [imagecaravan]>

```

## Config.json Setup *REQUIRED*
A config.json file is required for the server to interact with MariaDB on your local machine. 

1. Rename `config-template.json` to `config.json`
2. Open the `config.json` file and replace each of the fields with the appropriate credentials for your machine. 


## Images.py Setup *REQUIRED*
This is a simple function that will return a default image for users who choose not to uploada  profile picture.

1. Open the `images.py` file and replace the return with a string that contains a base 64 of an image you'd like to set as the default profile. 

## Flask (Python) Server Initialization *REQUIRED*
**Note: You must have Python 3.6+ installed**

1.  Create your own virtual environment within the same directory as the server folder by running `python3 -m venv env`
2.  Active your virtual environment by running `source env/bin/activate`
3.  Now install the necessary packages by running `pip install -r requirements.txt`
4. Run the server via `python3 api.py`

*You should see the following on your terminal*

```console
$ python api.py 
Loading configs...
 * Serving Flask app "api" (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: on
 * Restarting with stat
Loading configs...
 * Debugger is active!
 * Debugger PIN: 220-407-040
 * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)
 ```
