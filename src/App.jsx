import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from './components/SignUpForm/SignUpForm';

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
    if (authenticated) {
      getLists().then(setLists);
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        setAuthenticated(token);
      }
    }
  }, [authenticated]);

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
        <Route path="lists" element={<Lists lists={lists} />} />
        <Route path="lists/new-list" element={<NewList />} />
        <Route path="lists/:id" element={<ListItem />} />
        <Route path="tools" element={<Tools />} />
      </Routes>
    </>
  );
};

export default App;