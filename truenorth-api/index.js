require('dotenv').config();
const express = require('express');

const tasksRouter = require('./routes/tasks');
const storedTasks = require('./routes/storedTasks');

const app = express();

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.use(express.json());
app.use('/tasks', tasksRouter);
app.use('/stored-tasks', storedTasks);

console.log(`Listening on port: ${process.env.PORT}`);
app.listen(process.env.PORT);
