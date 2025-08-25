import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from './components/SignInForm/SignInForm';
import QwishList from './components/QwishList/QwishList';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [lists, setLists] = useState([]);

  function handleLogOut() {
    setAuthenticated(false);
    setLists([]);
    localStorage.removeItem("token");
    //we need to clear lists, tokens
  }

useEffect(() => {
  const fetchAllLists = async () => {
    const listsData = await listService.index();

    setLists(listsData);
  };

  if (user) fetchAllLists();
}, [user]);

  return (
    <>
      <NavBar authenticated={authenticated} handleLogOut={handleLogOut} />
      <Routes>
        <Route index element={<Home />} />

        <Route
          path="sign-in"
          element={<SignInForm setAuthenticated={setAuthenticated} />}
        />
        <Route
          path="sign-up"
          element={<SignUpForm setAuthenticated={setAuthenticated} />}
        />
        <Route path="/lists" element={<QwishList lists={lists} />} />
        <Route path="lists/new-list" element={<NewList />} />
        <Route path="lists/:id" element={<ListItem />} />
        <Route path="tools" element={<Tools />} />
        <Route path="/items/:itemId" element={<ItemDetails />} />
      </Routes>
    </>
  );
};

export default App;