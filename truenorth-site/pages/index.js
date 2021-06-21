import indexPage from '../hooks/indexPage';

import { Card, CompleteDialog } from '../components';

export default function Home() {
	const { tasks, taskSelected, onClickCard, onCloseDialog, onCompleteTask } = indexPage();

	return (
		<div>
			<div className="p-8">
				{(tasks?.length && (
					<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{tasks.map(({ uuid, title, complete }) => (
							<Card
								key={uuid}
								uuid={uuid}
								title={title}
								complete={complete}
								className={complete ? 'bg-green-300' : 'bg-blue-300'}
								onClick={() => onClickCard(uuid)}
							/>
						))}
					</ul>
				)) || <div className="text-center">There is not tasks to show</div>}
			</div>
			<CompleteDialog
				isOpen={Boolean(taskSelected)}
				onClose={onCloseDialog}
				onComplete={onCompleteTask}
				task={taskSelected}
			/>
		</div>
	);
}
