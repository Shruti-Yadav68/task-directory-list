import React from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<UserList/>} />
        <Route path="/user/:id" element={<UserProfile/>} />
      </Routes>
    </Router>
  );
};

export default App;
