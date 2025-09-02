import { Routes, Route, useNavigate } from "react-router";
import { useContext, useState, useEffect } from "react";

import NavBar from "./components/NavBar/NavBar";
import Footer from './components/Footer/Footer';
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

import { UserContext } from "./contexts/UserContext";

import * as qwishService from "./services/qwishService";
import * as itemService from "./services/itemService";

import styles from "./App.module.scss";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [lists, setLists] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleAddList = async (listFormData) => {
    const newList = await qwishService.create(listFormData);
    setLists([newList, ...lists]);
    navigate('/lists');
  }

  const handleAddItem = async (itemData) => {
    const newItem = await itemService.create(itemData);
    if (newItem) {
      setItems((items) => [newItem, ...items]);
      await itemService.addListItem(newItem, itemData.listId);
      navigate(`/lists/${itemData.listId}`);
    } else {
      throw new Error('Failed to add item');
    }
  }

  const handleDeleteItem = async (itemId, listId) => {
    const deletedItem = await itemService.remove(itemId, listId);
    setItems(items.filter((item) => item._id !== deletedItem._id));
    navigate(`/lists/${listId}`);
  }

  const handleUpdateItem = async (itemId, itemData) => {
    const updatedItem = await itemService.update(itemId, itemData);
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
      <>
        <NavBar
          authenticated={authenticated}
          handleLogOut={handleLogOut}
        />
        <div className={styles.primaryBody}>
          <Routes>
            <Route
              path="/"
              element={user ? <Dashboard /> : <Landing />}
            />
            {user ? (
              <>
                <Route
                  path="/lists"
                  element={<QwishList
                    lists={lists}
                  />}
                />
                <Route
                  path="/lists/:listId"
                  element={<QwishDetails
                    handleDeleteList={handleDeleteList}
                  />}
                />
                <Route
                  path="/lists/new"
                  element={<QwishForm
                    handleAddList={handleAddList}
                  />}
                />
                <Route
                  path="lists/:listId/edit"
                  element={<QwishForm
                    handleUpdateList={handleUpdateList}
                  />}
                />
                <Route
                  path="/lists/:listId/:itemId"
                  element={<ItemDetails
                    handleDeleteItem={handleDeleteItem}
                    setSelectedItem={setSelectedItem}
                  />}
                />
                <Route
                  path="/items"
                  element={<ItemList
                    items={items}
                    handleDeleteItem={handleDeleteItem}
                  />}
                />
                <Route
                  path="/items/new/:listId"
                  element={<ItemForm
                    handleAddItem={handleAddItem}
                  />}
                />
                <Route
                  path="/items/:itemId/edit"
                  element={<ItemForm
                    handleAddItem={handleAddItem}
                    handleUpdateItem={handleUpdateItem}
                    selectedItem={selectedItem}
                  />}
                />
                <Route
                  path="/users"
                  element={<Users />}
                />
              </>
            ) : (
              <>
                <Route
                  path="/sign-up"
                  element={<SignUpForm />}
                />
                <Route
                  path="/sign-in"
                  element={<SignInForm />}
                />
              </>
            )}
          </Routes>
        </div>
        <Footer />
      </>
    </main>
  );
};

export default App;
