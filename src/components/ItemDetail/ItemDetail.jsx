import { useNavigate, useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import * as itemService from "../../services/itemService";
import styles from "../ItemForm/ItemForm.module.scss";
import stylesItem from "./ItemDetail.module.scss";

const ItemDetail = ({ handleDeleteItem, setSelectedItem }) => {
  const [item, setItem] = useState(null);
  const { itemId, listId } = useParams();
  const navigate = useNavigate();

  const handleEditItem = (item) => {
    setSelectedItem(item);
    navigate(`/items/${item._id}/edit`);
  };

  useEffect(() => {
    const fetchItem = async () => {
      const itemData = await itemService.show(itemId);
      setItem(itemData);
    };

    if (itemId) fetchItem();
  }, [itemId]);

  if (!item) return <div>No item selected</div>;

  return (
    <main className={stylesItem.container}>
      <section className={styles.walmart_item}>
        <h2>{item.name}</h2>
        {item.img && <img src={item.img} alt={item.name} />}
        <a href={item.description} target="_blank" rel="noopener noreferrer">
          Walmart Link
        </a>
        <p>Price: ${item.price}</p>
        {item.quantity !== null && <p>Quantity: {item.quantity}</p>}
        <div>
          <button onClick={() => handleDeleteItem(itemId, listId)}>
            Delete
          </button>
        </div>
      </section>
    </main>
  );
};

export default ItemDetail;
