import { useState, useEffect } from "react";
import * as itemService from "../../services/itemService";
import ItemDetails from "../ItemDetail/ItemDetail";
import ItemForm from "../ItemForm/ItemForm";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import styles from "./ItemList.module.scss";

const ItemList = ({ handleAddItem }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems = await itemService.index();
        setItems(fetchedItems);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchItems();
  }, []);

  if (!items.length) return <div>No Items Yet!</div>;

  const handleEditItem = (item) => {
    selectedItem(item);
  };

  const handleUpdateItem = async (itemFormData) => {
    await itemService.update(selectedItem._id, itemFormData);
    const updatedItems = await itemService.index();
    setItems(updatedItems);
    setSelectedItem(null);
    navigate("/items");
  };

  const handleDeleteItem = async (itemId) => {
    await itemService.remove(itemId);
    const updatedItems = await itemService.index();
    setItems(updatedItems);
    navigate("/items");
  }

  return (
    <div className={styles.container}>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id} onClick={() => handleEditItem(item)}>
            <Link to={`/items/${item._id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
      {selectedItem && (
        <ItemDetails
          itemId={selectedItem._id}
          handleDeleteItem={handleDeleteItem}
          onDelete={() => handleDeleteItem(selectedItem._id)}
        />
      )}
      <ItemForm
        handleAddItem={handleAddItem}
        initialValues={selectedItem}
        onUpdate={handleUpdateItem}
      />
    </div>
  );
};

export default ItemList;