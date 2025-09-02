const BACKEND_URL = import.meta.env.VITE_BACK_END_SERVER_URL;
const LISTS_URL = `${BACKEND_URL}/lists`;
const ITEMS_URL = `${BACKEND_URL}/items`;

const index = async () => { // get all lists authored by the logged-in user
  try {
    const res = await fetch(LISTS_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
    throw new Error(err);
  };
};

const create = async (listFormData) => { // create a new list
  try {
    const res = await fetch(LISTS_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listFormData),
    });
    return res.json();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  };
};

const show = async (listId) => { // get a list
  try {
    const listRes = await fetch(`${LISTS_URL}/${listId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const list = await listRes.json();

    return list;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  };
};

const update = async (listId, listFormData) => { // update a list
  try {
    const res = await fetch(`${LISTS_URL}/${listId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listFormData),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  };
};

const remove = async (listId) => { // delete a list
  try {
    const res = await fetch(`${LISTS_URL}/${listId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
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
  show,
  update,
  remove,
}