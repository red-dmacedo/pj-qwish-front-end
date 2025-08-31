const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/items`;
const LISTS_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/lists`;

const index = async () => {
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

const create = async(itemFormData)=> {
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

const addListItem = async(item, listId)=> {
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

const show = async (itemId) => {
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

const update = async (itemId, itemFormData) => {
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

const remove = async (itemId, listId) => {
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