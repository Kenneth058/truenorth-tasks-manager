import { useState, useEffect } from 'react';
import axios from 'axios';

const ENDPOINT = process.env.NEXT_PUBLIC_TNAPI

const indexPage = () => {
	const [tasks, setTasks] = useState([]);
	const [taskSelected, setTaskSelected] = useState();

	useEffect(async () => {
		const tasksFetch = await axios.get(`${ENDPOINT}/stored-tasks`);

		setTasks(tasksFetch.data);
	}, []);

	const onClickCard = (uuidSelected) => {
		const task = tasks.find(({ uuid }) => uuid === uuidSelected);
		console.log(tasks);
		setTaskSelected(task);
	};

	const onCloseDialog = () => {
		setTaskSelected(null);
	};

	const onCompleteTask = async (uuidTask) => {
		const content = { uuid: uuidTask };
		const config = { headers: { 'Content-Type': 'application/json' } };
		const taskCompleted = await axios.put(`${ENDPOINT}/tasks`, content, config);
		const taskData = taskCompleted.data;
		const tasksUpdated = tasks.map((task) => (task.uuid === taskData.uuid ? taskData : task));

		setTasks(tasksUpdated);
		setTaskSelected(null);
	};

	return { tasks, taskSelected, onClickCard, onCloseDialog, onCompleteTask };
};

export default indexPage;
