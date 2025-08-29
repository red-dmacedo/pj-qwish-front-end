import { Link } from "react-router";
import styles from "./QwishList.module.scss";

const QwishList = (props) => {
  return (
    <>
    <div className={styles.container}>
    <h2 className={styles.dynapuffH1}>Qwishlists</h2>
    <div className={`${styles.container} ${styles.listGrid}`}>
      {props.lists.map((list) => (
        <article key={list._id}>
          <header>
            <p>{list.author.username}</p>
          </header>
          <Link key={list._id} to={`/lists/${list._id}`}><p>{list.name}</p></Link>
        </article>
      ))}
    </div>
      </div>
      </>
  );
};

export default QwishList;