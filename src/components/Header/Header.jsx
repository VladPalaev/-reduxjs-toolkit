import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<>
			<header className={styles.header}>
				<nav className={styles.nav}>
					<NavLink className={styles.navLink} to='/home'>Home</NavLink>
					<NavLink className={styles.navLink} to='/about'>About</NavLink>
					<NavLink className={styles.navLink} to='/contact'>Contact</NavLink>
					<NavLink className={styles.navLink} to='/registration'>Registration</NavLink>
				</nav>

			</header>
		</>
	)
}

export default Header;