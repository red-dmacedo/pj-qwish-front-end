import { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <main className={styles.container}>
      <h2>Welcome, {user.firstName}!</h2>

      <Link to={`/lists/new`} className={styles.linkToBtn}>Create a New List</Link>

      <h2>My Qwishlists</h2>

    </main>
  );
};

export default Dashboard;