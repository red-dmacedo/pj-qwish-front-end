import { Routes, Route } from "react-router";
import { useContext, useState, useEffect } from "react";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from './components/SignInForm/SignInForm';
import QwishList from './components/QwishList/QwishList';

import { UserContext } from "./contexts/UserContext";

import * as qwishService from './services/qwishService';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [lists, setLists] = useState([]);

  const { user } = useContext(UserContext);

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

  if (user) fetchAllLists();
}, [user]);

  return (
    <>
    <h1>hello</h1>
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
      </Routes>
    </>
  );
};

export default App;