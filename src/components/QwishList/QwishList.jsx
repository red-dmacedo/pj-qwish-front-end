// import { Link } from 'react-router';

import { Link } from "react-router";

const QwishList = (props) => {
  return (
    <main>
    <h1>Qwishlists</h1>
      {props.lists.map((list) => (
        <article key={list._id}>
          <header>
            <p>{list.author.username}</p>
          </header>
          <Link key={list._id} to={`/lists/${list._id}`}><p>{list.name}</p></Link>
        </article>
      ))}
    </main>
  );
};

export default QwishList;