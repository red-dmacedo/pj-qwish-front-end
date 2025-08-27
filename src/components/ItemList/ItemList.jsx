import { useState, useEffect } from "react";
import { index } from "../../services/itemService";
import ItemDetails from "../ItemDetail/ItemDetail";

const ItemList = () => {
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

const addItem = (newItem) => {
  setItems((prevItems) => [...prevItems, newItem]);
};

if (!items.length) return <div>No Items Yet!</div>;

return (
    <div>
      <h1>Items</h1>
      <ul>
      {items.map((item) => (
        <li key={item.id} onClick={() => setSelectedItem(item.id)}>
          {item.name}
        </li>
      ))}
      </ul>
      {selectedItem && <ItemDetails itemId={selectedItem} />}
      <ItemForm addItem={addItem} />
    </div>
  );
};

export default ItemList;