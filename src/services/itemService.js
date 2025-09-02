const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/items`;
const LISTS_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/lists`;

const index = async () => { // get all items in the database
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
    throw new Error(err);
  };
};

const create = async(itemFormData)=> { // create a new item in the database (not tracked by a list)
  try{
    console.log('create:', itemFormData);
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemFormData),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  };
};

const addListItem = async(item, listId)=> { // add an item to a list
  try{
    // check if item has properties (avoid adding empty objects)
    if(!Object.keys(item).length) throw new Error('Cannot add empty item to list');
    const res = await fetch(`${LISTS_URL}/${listId}/items/new`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  };
};

const show = async (itemId) => { // get a specific item's details
  try {
    const res = await fetch(`${BASE_URL}/${itemId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  };
};

const update = async (itemId, itemFormData) => { // update an item's details (affects all lists the item is a part of)
  try {
    const res = await fetch(`${BASE_URL}/${itemId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(itemFormData),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  };
};

const remove = async (itemId, listId) => { // remove an item from a list (automatically deletes the item from the database if the item is not found on any other list)
  try {
    const res = await fetch(`${LISTS_URL}/${listId}/${itemId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  };
};

export {
  index,
  create,
  addListItem,
  show,
  update,
  remove,
}