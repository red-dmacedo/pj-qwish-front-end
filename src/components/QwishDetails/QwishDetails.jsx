import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import styles from "../../../public/styles/QwishDetails.module.scss";

import * as qwishService from "../../services/qwishService";

import { UserContext } from "../../contexts/UserContext";

const QwishDetails = (props) => {
//   const { user } = useContext(UserContext);
  const [list, setList] = useState(null);
  const { listId } = useParams();

  useEffect(() => {
    const fetchList = async () => {
      const listData = await qwishService.show(listId);
      setList(listData);
    };
    fetchList();
  }, [listId]);

  if (!list) return <main>Loading...</main>;

  return (
    <main className={styles.container}>
      <section>
        <h2>{list.name} Qwishlist</h2>
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
        <Link to={`/lists/${listId}/edit`}>Edit List</Link>
        <button onClick={() => props.handleDeleteList(listId)}>Delete List</button>
      </section>
    </main>
  );
};

export default QwishDetails;