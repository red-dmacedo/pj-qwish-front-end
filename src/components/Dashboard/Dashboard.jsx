import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import styles from "./Dashboard.module.scss";

const Dashboard = (props) => {
  const { lists } = props;
  const { user } = useContext(UserContext);
  let itemCount = 0;
  for (let i of lists) {
    itemCount += i.items.length;
  }

  let recentLists = lists.toSorted((a, b) => a.updatedAt > b.updatedAt);

  recentLists = lists.slice(0, 3);

  return (
    <main className={styles.container}>
      <h2 className={styles.dynapuffH1}>Welcome, {user.firstName}!</h2>

      <Link
        to={`/lists/new`}
        className={`${styles.container} ${styles.linkToBtn}`}
      >
        Create a New List
      </Link>

      <div className={styles.listGrid}>
        <article>
          <div className={styles.container}>
            <div className={styles.listGridItem}>{lists.length} Lists</div>
          </div>
        </article>
        <article>
          <div className={styles.container}>
            <div className={styles.listGridItem}>{itemCount} Items</div>
          </div>
        </article>
      </div>

      <h2 className={styles.dynapuffH1}>My Qwishlists</h2>

      <ul>
        {recentLists.map((list) => (
          <li key={list._id} className={styles.listItem}>
            <h4>{list.name}</h4>
            <div className={styles.listLine}>
            <p>{list.items.length} Items</p>
            <Link className={styles.linkToBtn} to={`/lists/${list._id}`}>
                View List
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;
