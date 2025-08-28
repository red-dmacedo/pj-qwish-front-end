import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import styles from "./Users.module.scss";

import * as userService from "../../services/userService";

const Users = (props) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  let userList;

  if (!user) {
    navigate('/sign-in');
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      const userData = await userService.index();
      userList = userData.sort((a, b) => a.username.localeCompare(b.username));
      setUsers(userList);
    };

    if (user) fetchAllUsers();
  }, [user]);

  const handleSubmit = (evt) => {
    evt.preventDefault;
    const friendId = evt.target.value;
    // created this for later:
    // props.handleAddFriend(user._id, friendId)
    navigate('/');
  };

  const handleSearch = (evt) => {
    const match = (str1, str2) => {
      return (str1.toLowerCase().includes(str2.toLowerCase())) ? true : false;
    };
    const filteredUsers = userList.filter(el => match(el.username, evt.target.value) || match(evt.target.value, el.username));
    setUsers(filteredUsers);
  };

  return (
    <div className={styles.container}>
      <h1>Find Friends</h1>
      <input type="text" placeholder='Search Username' onChange={handleSearch} />
      <form onSubmit={handleSubmit}>
        <select>
          {users.map((usr, idx) => (
            <option key={idx} value={usr._id}>{usr.username}</option>
          ))}
        </select>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default Users;