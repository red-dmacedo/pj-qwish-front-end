import { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <main className={styles.container}>
      <h1>Welcome, {user.firstName}!</h1>

      <Link to={`/lists/new`} className={styles.linkToBtn}>Create a New List</Link>

      <h1>My Qwishlists</h1>

    </main>
  );
};

export default Dashboard;