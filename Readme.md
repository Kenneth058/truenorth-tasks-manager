# TRUENORTH TASK MANAGER

## Requirements
1. In order to run this project, you must have installed docker and docker-compose on your machine.
2. In case the url `https://hipsum.co/the-api/` is returning a 404 error, you must be sure that the variable `HIPSUMAVAILABLE` in the **docker-compose** file is set as `false`. If the endpoint is working, you should change the environment variable as `true`.

## Important note
A `random sentences generator API` was built in order to replace `hipsum` API, because this wasn't working and was retrieving a 404 error. This random sentences generator API works exactly as hipsum does.

## Installing
```
docker-compose up -d
```

## Using Task API

Task API is available using the url: `http://localhost:4000`.

1. Get random tasks. If *tasksNumber* parameter is not provided, by default is going to return 3 tasks. The request also will store the data into postgres database.

```
Method: GET
URL: http://localhost:4000/tasks?tasksNumber=4
```

2. Complete task as done. The task is going to be updated as *complete* in the postgres database.

```
Method: PUT
URL: http://localhost:4000/tasks
Body (raw/json): {"uuid": "9539efa1-c748-4339-b701-dec07d795c54"}
```

3. Get stored tasks in database, so idempotent can be assumed. It will return all tasks that were requested.

```
Method: Get
URL: http://localhost:4000/stored-tasks
```

## Using Task Site

A responsive React site was made in order to list all tasks stored in postgres database. Here, a task selected can be completed, changing its color to green. URL:

```
http://localhost:3000
```

## Using Random Sentences API

This API was built in order to replace hipsum API. It returns a text with the number of sentences as you established in parameter **sentences**. If the parameter is omitted, three sentences will be returned. Next url can be used:

```
http://localhost:5000/?sentences=6
```

## Connection to database
```
PGUSER=postgres
PGHOST=localhost
PGPASSWORD=truenorthpass
PGDATABASE=truenorthdb
PGPORT=54321
```

## Finish

When you finish using the project, you can stop it using next command:

```
docker-compose down
```

Also, delete docker images that were built for this demo. Use following commands:

```
docker images
docker rmi <images-ids>
```