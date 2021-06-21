const express = require('express');

const db = require('../helpers/db');

const router = express.Router();

router.get('/', async (req, res) => {
	const { rows } = await db.query('select uuid, title, complete from gettasks()');

	res.send(rows);
});

module.exports = router;
