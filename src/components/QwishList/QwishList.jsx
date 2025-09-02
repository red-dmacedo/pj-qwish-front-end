import { Link } from "react-router";
import styles from "./QwishList.module.scss";

const QwishList = (props) => {
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.dynapuffH1}>Qwishlists</h2>
        <div className={`${styles.container} ${styles.listGrid}`}>
          {props.lists.map((list) => (
            <li key={list._id} className={styles.list_item}>
            {/* <Link key={list._id} to={`/lists/${list._id}`}> */}
            <article key={list._id}>
              <header>
                <p>{list.author.username}</p>
              </header>
              <p><b>{list.name}</b></p>
              <p>{list.items.length} Items</p>
              <p>
                List Close Date:<br />{" "}
                {new Date(list.closeDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </p>
              <Link className={styles.linkToBtn} to={`/lists/${list._id}`}>View List</Link>
            </article>
            {/* </Link> */ }
            </li>
          ))}
        </div>
      </div>
    </>
  );
};

export default QwishList;