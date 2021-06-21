import React from 'react';

import Attribute from './Attribute';

import {classNames} from '../helpers/utils';

const Card = ({ uuid, title, complete, className, onClick }) => (
	<li className={classNames("p-8 col-span-1 flex flex-col rounded cursor-pointer", className)} onClick={onClick}>
    <Attribute title="Task:" value={uuid} />
    <Attribute title="Title:" value={title} />
    <Attribute title="Status:" value={complete ? 'Done' : 'In Progress'} />
	</li>
);

export default Card;
