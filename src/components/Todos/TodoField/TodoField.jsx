import React from 'react';
import styles from './TodoField.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateText, fetchAddTask } from '../../../redux/todoSlice';

const TodoField = () => {
	const dispath = useDispatch();
	let title = useSelector( (state) => state.todos.title );

	return (
		<div className={styles.container}>
			<input className={styles.fieldTask} type="text"
			value={title} 
			onChange={ (e) => dispath(updateText({title: e.target.value}))}/>

			<button className={styles.btnAddTask}
			onClick={ () => dispath(fetchAddTask() )} >Add task</button>
		</div>
	)
}

export default TodoField