import { Routes, Route, useNavigate } from "react-router";
import { useContext, useState, useEffect } from "react";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import QwishList from "./components/QwishList/QwishList";
import QwishDetails from "./components/QwishDetails/QwishDetails";
import QwishForm from './components/QwishForm/QwishForm';
import * as itemService from './services/itemService';
import ItemList from "./components/ItemList/ItemList";
import ItemDetails from "./components/ItemDetail/ItemDetail";

import { UserContext } from "./contexts/UserContext";

import * as qwishService from "./services/qwishService";

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
      const itemDAta = await itemService.index();
    };

    if (user) fetchAllItems();
    if (user) fetchAllLists();
  }, [user]);

  const handleDeleteList = async (listId) => {
    const deletedList = await qwishService.deleteList(listId);
    setLists(lists.filter((list) => list._id !== deletedList._id));
    navigate('/lists');
  }

  const handleUpdateList = async (listId, listFormData) => {
    const updatedList = await qwishService.update(listId, listFormData);
    setLists(lists.map((list) => (listId === list._id ? updatedList : list)));
    navigate(`/lists/${listId}`);
  }

  return (
    <>
      <NavBar authenticated={authenticated} handleLogOut={handleLogOut} />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path="/lists" element={<QwishList lists={lists} />} />
            <Route
              path="/lists/:listId"
              element={<QwishDetails handleDeleteList={handleDeleteList} />}
            />
            <Route
              path="/lists/new"
              element={<QwishForm handleAddList={handleAddList} />}
            />
            <Route
              path="lists/:listId/edit"
              element={<QwishForm handleUpdateList={handleUpdateList} />}
            />
            <Route path="/items" element={<ItemList items={items} />} />
            <Route path="/items/:itemId" element={<ItemDetails />} />

          </>
        ) : (
          <>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
