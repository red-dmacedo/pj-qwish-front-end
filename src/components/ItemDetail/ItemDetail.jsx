import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import * as itemService from '../../services/itemService';
import { useNavigate } from 'react-router';
import styles from "../../../public/styles/ItemDetail.module.scss";

const ItemDetail = () => {
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const {itemId} = useParams

  useEffect(() => {
    const fetchItem = async () => {
      const itemData = await itemService.show(itemId);
      setItem(itemData);
    };

    fetchItem();
  }, [itemId]);

  const handleDeleteItem = async () => {
    await itemService.remove(itemId);
    navigate('/items');
  };

  return (
    <main className={styles.container}>
      <section>
        <header>
          <h2>{item.name}</h2>
          {item.img && <img src={item.img} alt={item.name} />}
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
          {item.weight !== null && <p>Weight: {item.weight} kg</p>}
          {item.quantity !== null && <p>Quantity: {item.quantity}</p>}
          <div>
            <Link to={`/items/${itemId}/edit`}>Edit</Link>
            <button onClick={handleDeleteItem}>Delete</button>
          </div>
        </header>
      </section>
    </main>
  );
};

export default ItemDetail;
