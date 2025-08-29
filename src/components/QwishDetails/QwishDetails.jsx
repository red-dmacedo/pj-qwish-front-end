import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import styles from "./QwishDetails.module.scss";

import * as qwishService from "../../services/qwishService";

import { UserContext } from "../../contexts/UserContext";

const QwishDetails = (props) => {
  //   const { user } = useContext(UserContext);
  const [list, setList] = useState(null);
  const { listId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchList = async () => {
      const listData = await qwishService.show(listId);
      setList(listData);
    };
    fetchList();
  }, [listId]);

  if (!list) return <main>Loading...</main>;

  const handleAddItem = () => {
    navigate(`/items/new/${listId}`);
  };

  return (
    <main className={styles.container}>
      <section>
        <h2 className={styles.dynapuff}>{list.name} Qwishlist</h2>
        <p>{list.description}</p>
        <p>
          Close Date:{" "}
          {new Date(list.closeDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </p>
        <Link to={`/lists/${listId}/edit`} className={styles.linkToBtn}>Edit List</Link>
        <button onClick={() => props.handleDeleteList(listId)}>Delete List</button>
        <button onClick={handleAddItem}>Add Item</button>
      </section>
      <section>
        <h3>Items:</h3>
        {list.items && list.items.length > 0 ? (
          <ul>
            {list.items.map((item, idx) => (
              <li key={idx}>
                <Link to={`/items/${item._id}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items added yet.</p>
        )}
      </section>
    </main>
  );
};

export default QwishDetails;