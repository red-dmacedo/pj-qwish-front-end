const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/lists`;

const index = async () => {
  try{
    const res = fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return await res.json();
  } catch(err){
    console.log(err.message);
    throw new Error(err);
  };
};

const create = async(listFormData)=> {
  try{
    const res = fetch(`${BASE_URL}/${listId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(listFormData),
    });
    return await res.json();
  } catch(err){
    console.log(err);
    throw new Error(err);
  };
};

const show = async(listId)=> {
  try{
    const res = fetch(`${BASE_URL}/${listId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return await res.json();
  } catch(err){
    console.log(err);
    throw new Error(err);
  };
};

const update = async(listId, listFormData)=> {
  try{
    const res = fetch(`${BASE_URL}/${listId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(listFormData),
    });
    return await res.json();
  } catch(err){
    console.log(err);
    throw new Error(err);
  };
};

const remove = async(listId)=> {
  try{
    const res = fetch(`${BASE_URL}/${listId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return await res.json();
  } catch(err){
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