const { v4: uuidv4 } = require('uuid');
const express = require('express');

const router = express.Router();

const { DEFAULT_SENTENCES_NUMBER } = require('../helpers/constants');
const instance = require('../helpers/axiosInstance');
const db = require('../helpers/db');

router.get('/', async ({ query }, res) => {
	const { HIPSUMAVAILABLE, HIPSUMURL, RANDOMURL } = process.env
	const { tasksNumber } = query;

	const endpoint =
		HIPSUMAVAILABLE === 'true'
			? `${HIPSUMURL}/api/?type=hipster-centric&sentences=`
			: `${RANDOMURL}?sentences=`;

	const [titles] = (await instance.get(`${endpoint}${Number(tasksNumber) || DEFAULT_SENTENCES_NUMBER}`)).data;

	const objectTitles = titles.split('. ').map((title) => {
		return {
			uuid: uuidv4(),
			title: title.replace('.', '').trim(),
		};
	});

	const { rows } = await db.query('select uuid, title from inserttasks($1)', [JSON.stringify(objectTitles)]);

	res.send(rows);
});

router.put('/', async ({ body }, res) => {
	const { uuid } = body;
	const { rows } = await db.query('select uuid, title, complete from completetask($1)', [uuid]);
	const [taskCompleted] = rows;

	res.send(taskCompleted);
});

module.exports = router;
