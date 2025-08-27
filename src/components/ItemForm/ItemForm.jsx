import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as itemService from '../../services/itemService';

const ItemForm = ({ existingItem }) => {
  const [name, setName] = useState(existingItem?.name || null);
  const [img, setImg] = useState(existingItem?.img || null);
  const [description, setDescription] = useState(existingItem?.description || null);
  const [price, setPrice] = useState(existingItem?.price || null);
  const [weight, setWeight] = useState(existingItem?.weight || null);
  const [quantity, setQuantity] = useState(existingItem?.quantity || null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemData = {
      name,
      img,
      description,
      price: price === '' ? null : Number(price),
      weight: weight === '' ? null : Number(weight),
      quantity: quantity === '' ? null : Number(quantity),
    };

    if (existingItem) {
      await itemService.update(existingItem._id, itemData);
    } else {
      await itemService.create(itemData);
    }

    navigate('/items');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <input
          type="text"
          value={name || ''}
          onChange={(e) => setName(e.target.value || null)}
          required
        />
      </div>
      <div>
        <label>Image URL: </label>
        <input
          type="text"
          value={img || ''}
          onChange={(e) => setImg(e.target.value || null)}
        />
      </div>
      <div>
        <label>Description: </label>
        <textarea
          value={description || ''}
          onChange={(e) => setDescription(e.target.value || null)}
        />
      </div>
      <div>
        <label>Price: </label>
        <input
          type="number"
          value={price || ''}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Weight (kg): </label>
        <input
          type="number"
          value={weight || ''}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div>
        <label>Quantity: </label>
        <input
          type="number"
          value={quantity || ''}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button type="submit">{existingItem ? 'Update Item' : 'Add Item'}</button>
    </form>
  );
};

export default ItemForm;