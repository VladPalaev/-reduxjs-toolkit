import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchDeleteTodo, fetchToggelStatus } from '../../../redux/todoSlice';
import styles from './TodoItem.module.css';

const TodoItem = ({id, title, completed}) => {
	const dispatch = useDispatch();

	return (
		<li className={styles.itemContainer}>
			<input className={styles.checkBox} type="checkbox" checked={completed} onChange={ () => dispatch(fetchToggelStatus(id)) } /> 
			<span className={styles.text}>{title}</span>
			<span className={styles.btnDelete} onClick={ () => dispatch(fetchDeleteTodo(id)) }>&times;</span>
		</li>
	)
}

export default TodoItem

// 10 сторочка не забыть про id и функция на 12