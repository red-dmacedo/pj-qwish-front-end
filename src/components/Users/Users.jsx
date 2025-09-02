import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import styles from "./Users.module.scss";

import * as userService from "../../services/userService";

const Users = (props) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [userList, setUserList] = useState([]);
  const [users, setUsers] = useState([]);

  if (!user) {
    navigate("/sign-in");
  }

  useEffect(() => {
    const fetchAllUsers = async () => {
      const userData = await userService.index();
      const sortedUsers = userData.toSorted((a, b) =>
        a.username.localeCompare(b.username)
      );
      setUserList(sortedUsers);
      setUsers(sortedUsers);
    };

    if (user) fetchAllUsers();
  }, [user]);

  const handleSubmit = (evt) => {
    evt.preventDefault;
    const friendId = evt.target.value;
    // created this for later:
    // props.handleAddFriend(user._id, friendId)
    navigate("/");
  };

  const handleSearch = (evt) => {
    const match = (str1, str2) => {
      return str1.toLowerCase().includes(str2.toLowerCase()) ? true : false;
    };
    const filteredUsers = userList.filter(
      (el) =>
        match(el.username, evt.target.value) ||
        match(evt.target.value, el.username)
    );
    evt.target.value ? setUsers(filteredUsers) : setUsers(userList);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.dynapuffH1}>Find Friends</h1>
      <form onSubmit={handleSubmit} className={styles.friendSearchForm}>
        <input
          type="text"
          placeholder="Search Username"
          onChange={handleSearch}
        />
        <select>
          {users.map((usr, idx) => (
            <option key={idx} value={usr._id}>
              {usr.username}
            </option>
          ))}
        </select>
        <button type="submit" className={styles.formAddBtn}>
          Add
        </button>
      </form>
      <spline-viewer url="https://prod.spline.design/Hj14uSDYcYjN3x-l/scene.splinecode"></spline-viewer>
    </div>
  );
};

export default Users;
