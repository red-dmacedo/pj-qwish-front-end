import { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';

const App = () => {

const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;
