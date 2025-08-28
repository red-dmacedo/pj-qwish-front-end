import { Routes, Route, useNavigate } from "react-router";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import QwishList from "./components/QwishList/QwishList";
import QwishDetails from "./components/QwishDetails/QwishDetails";
import QwishForm from "./components/QwishForm/QwishForm";
import ItemList from "./components/ItemList/ItemList";
import ItemDetails from "./components/ItemDetail/ItemDetail";
import ItemForm from "./components/ItemForm/ItemForm";
import Users from "./components/Users/Users";
import styles from "./App.module.scss";

import * as qwishService from "./services/qwishService";
import * as itemService from "./services/itemService";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [lists, setLists] = useState([]);
  const [items, setItems] = useState([]);

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleAddList = async (listFormData) => {
    const newList = await qwishService.create(listFormData);
    setLists([newList, ...lists]);
    navigate('/lists');
  }

  const handleAddItem = async (itemFormData) => {
    const newItem = await itemService.create(itemFormData);
    setItems([newItem, ...items]);
    navigate('/items');
  }

  const handleDeleteItem = async (itemId) => {
    const deletedItem = await itemService.deleteItem(itemId);
    setItems(items.filter((item) => item._id !== deletedItem._id));
    navigate('/items');
  }

  const handleUpdateItem = async (itemId, itemFormData) => {
    const updatedItem = await itemService.update(itemId, itemFormData);
    setItems(items.map((item) => (itemId === item._id ? updatedItem : item)));
    navigate(`/items/${itemId}`);
  }

  function handleLogOut() {
    setAuthenticated(false);
    setLists([]);
    localStorage.removeItem("token");
    //we need to clear lists, tokens
  }

  useEffect(() => {
    const fetchAllLists = async () => {
      const listsData = await qwishService.index();

      setLists(listsData);
    };

    const fetchAllItems = async () => {
      const itemData = await itemService.index();

      setItems(itemData);
    };

    if (user) fetchAllItems(), fetchAllLists();
  }, [user]);

  const handleDeleteList = async (listId) => {
    const deletedList = await qwishService.remove(listId);
    setLists(lists.filter((list) => list._id !== deletedList._id));
    navigate('/lists');
  }

  const handleUpdateList = async (listId, listFormData) => {
    const updatedList = await qwishService.update(listId, listFormData);
    setLists(lists.map((list) => (listId === list._id ? updatedList : list)));
    navigate(`/lists/${listId}`);
  }

  return (
    <main className={styles.container}>
      <NavBar authenticated={authenticated} handleLogOut={handleLogOut} />
      <div className={styles.primaryBody}>
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path="/lists" element={<QwishList lists={lists} />} />
            <Route path="/lists/new" element={<QwishForm handleAddList={handleAddList} />} />
            <Route path="/lists/:listId" element={<QwishDetails handleDeleteList={handleDeleteList} />} />
            <Route path="/lists/:listId/edit" element={<QwishForm handleUpdateList={handleUpdateList} />} />

            <Route path="/items" element={<ItemList items={items} />} />
            <Route path="/items/new" element={<ItemForm handleAddItem={handleAddItem} />} />
            <Route path="/items/:itemId" element={<ItemDetails handleDeleteItem={handleDeleteItem} />} />
            <Route path="/items/:itemId/edit" element={<ItemForm handleUpdateItem={handleUpdateItem} />} />

            <Route path="/users" element={<Users />} />
          </>
        ) : (
          <>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
      </div>
    </main>
  );
};

export default App;
