
import { WithRouter } from '../model/providers/WithRouter';
import styles from './styles/App.module.css';
import '../global.css'
export const App = () => {
    return (
        <>
            <div className={styles.app}>
                <WithRouter />
            </div>
        </>
    );
};