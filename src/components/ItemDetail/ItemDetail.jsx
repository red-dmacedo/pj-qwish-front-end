import { useNavigate, useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import * as itemService from '../../services/itemService';
import styles from "./ItemDetail.module.scss";

const ItemDetail = ({handleDeleteItem, setSelectedItem}) => {
  const [item, setItem] = useState(null);
  const {itemId} = useParams();
  const navigate = useNavigate();

  const handleEditItem = (item) => {
    setSelectedItem(item)
    navigate(`/items/${item._id}/edit`)
  }

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
            <button type='button' onClick={() => handleEditItem(item)}>Edit</button>
            <button onClick={() => handleDeleteItem(itemId)}>Delete</button>
          </div>
        </header>
      </section>
    </main>
  );
};

export default ItemDetail;
