import { Routes, Route } from "react-router";
import { useState,useEffect } from "react";
import Home from "./components/pages/Home";
import Nav from "./components/Nav";
import SignIn from "./components/pages/SignInForm/SignInForm";
import SignUp from "./components/pages/SignUpForm";
import Lists from "./components/pages/Lists";
import NewList from "./components/pages/NewList";
import ListItem from "./components/pages/ListItem";
import Tools from "./components/pages/Tools";
import { getLists } from "./api/controller";
import ItemDetails from "./components/ItemDetail/ItemDetail";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [lists, setLists] = useState([])

  function handleLogOut() {
    setAuthenticated(false);
    setLists([])
    localStorage.removeItem('token')
    //we need to clear lists, tokens
  }

  useEffect(()=>{
    if(authenticated){
      getLists().then(setLists)
    }else{
      const token = localStorage.getItem('token')
      if(token){
        setAuthenticated(token)
      }
    }
  },[authenticated])

  return (
    <>
      <Nav authenticated={authenticated} handleLogOut={handleLogOut} />
      <Routes>
        <Route index element={<Home />} />

        <Route path="sign-in" element={<SignIn setAuthenticated={setAuthenticated}/>} />
        <Route path="sign-up" element={<SignUp setAuthenticated={setAuthenticated}/>} />
        <Route path="lists" element={<Lists lists={lists}/>} />
        <Route path="lists/new-list" element={<NewList />} />
        <Route path="lists/:id" element={<ListItem />} />
        <Route path="tools" element={<Tools />} />
        <Route path="/items/:itemId" element={<ItemDetails />} />
      </Routes>
    </>
  );
};

export default App;
