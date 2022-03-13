# Server


## Log into EC Server

### ssh -i "~/Downloads/DeployTom.pem" ubuntu@52.11.101.187



## Deploy Server

1. First `ssh` into EC2 (ip = `52.11.101.187`):

### ssh -i "~/Downloads/DeployTom.pem" ubuntu@52.11.101.187

2. We then clone this project from GitHub:

### git clone https://github.com/steven-halla/movie_review_site.git

If we are updating the project, run: `git pull`

3. To start server run:

### cd movie_review_site

### sudo nodemon server.ts &

* note that `&` runs the server in the background. 
* This allows you to logout of the server without killing the server process.
* If there is already an instance of the server running then you will have to first kill that process. (see below)

### Stopping currently running server instance

Get a list of processes whose name contain "node"

### ps -ef | grep node

###  sudo kill <process id>

E.g. `sudo kill 227287`

If successful `ps -ef | grep node` will not return any running process. 
It is now safe to start a new instance of the server.


## MySQL Dump

Make a back-up of local database

```bash
usr/local/bin/mysqldump tomrottendb --result-file=/Users/steven/tomrottendb_localhost-2021_06_17_20_47_42-dump.sql --user=root --host=127.0.0.1 --port=3306
```
