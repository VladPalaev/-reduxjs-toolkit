import styles from './App.module.css';
import Header from './components/Header/Header';
import Todos from './components/Todos/Todos';

const App = () => {
	return (
		<div className={styles.appContainer}>
			<Header />
			<Todos />
		</div>
	)
}

export default App;
