import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

const TodoList = ({todos}) => {
	

	return (
		<ul className={styles.listContainer}>
			{todos.map((todo) => <TodoItem key={todo.id} {...todo} />)}
		</ul>
	)
}

export default TodoList