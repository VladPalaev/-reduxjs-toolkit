import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Todos.module.css';
import TodoField from './TodoField/TodoField';
import TodoList from './TodoList/TodoList';
import { fetchTodos } from '../../redux/todoSlice';

const Todos = () => {
	const todos = useSelector((state) => state.todos.todos);
	const {error, status} = useSelector( (state) => state.todos );
	const dispatch = useDispatch();
	useEffect( () => {
		dispatch(fetchTodos());
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<TodoField />
			<TodoList todos={todos}/>
			{status === 'loading' && <h2>Loading</h2>}
			{error && <h2>Упс, ошибка № {error}</h2>}
		</div>
	)
}

export default Todos