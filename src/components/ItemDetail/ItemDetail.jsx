import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import * as itemService from '../../services/itemService';
import styles from "./ItemDetail.module.scss";

const ItemDetail = ({handleDeleteItem}) => {
  const [item, setItem] = useState(null);
  const {itemId} = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      const itemData = await itemService.show(itemId);
      setItem(itemData);
    };

    if (itemId) fetchItem();
  }, [itemId]);

  if (!item) return <div>No item selected</div> 

  return (
    <main className={styles.container}>
      <section>
        <header>
          <h2>{item.name}</h2>
          {item.img && <img src={item.img} alt={item.name} />}
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
          {item.quantity !== null && <p>Quantity: {item.quantity}</p>}
          <div>
            <Link to={`/items/${itemId}/edit`} className={styles.linkToBtn}>Edit</Link>
            <button onClick={() => handleDeleteItem(itemId)}>Delete</button>
          </div>
        </header>
      </section>
    </main>
  );
};

export default ItemDetail;
