import { Link } from "react-router";
import styles from "./QwishList.module.scss";

const QwishList = (props) => {
  return (
    <div className={styles.container}>
    <h1>Qwishlists</h1>
      {props.lists.map((list) => (
        <article key={list._id}>
          <header>
            <p>{list.author.username}</p>
          </header>
          <Link key={list._id} to={`/lists/${list._id}`}><p>{list.name}</p></Link>
        </article>
      ))}
    </div>
  );
};

export default QwishList;