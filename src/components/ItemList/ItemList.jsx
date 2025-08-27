import { useState, useEffect } from "react";
import { index } from "../../services/itemService";
import ItemDetails from "../ItemDetail/ItemDetail";
import ItemForm from "../ItemForm/ItemForm";
import styles from "../../../public/styles/ItemList.module.scss";

const ItemList = (props) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

useEffect(() => {
  const fetchItems = async () => {
    try {
      const fetchedItems = await index();
      setItems(fetchedItems);
    } catch (err) {
      console.log(err.message);
    }
  };
  fetchItems();
}, []);

// const handleAddItem = (newItem) => {
//   setItems((prevItems) => [...prevItems, newItem]);
// };

if (!items.length) return <div>No Items Yet!</div>;

return (
    <div className={styles.container}>
      <h1>Items</h1>
      <ul>
      {items.map((item, idx) => (
        <li key={idx} onClick={() => setSelectedItem(item._id)}>
          {item.name}
        </li>
      ))}
      </ul>
      {selectedItem && <ItemDetails itemId={selectedItem} />}
      <ItemForm handleAddItem={props.handleAddItem} />
    </div>
  );
};

export default ItemList;