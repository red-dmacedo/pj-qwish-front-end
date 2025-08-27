import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import styles from "../../../public/styles/Users.module.scss";

const Users = (props) => {
  const { user } = useContext(UserContext);
  const sortedUsers = props.users.toSorted((a, b)=> a.username.localeCompare(b.username));
  console.log('users:', props.users);
  const { filteredUsers, setFilteredUsers } = useState(sortedUsers);

  const handleSubmit = (evt) => {
    evt.preventDefault;
    const friendId = evt.target.value;
    // created this for later:
    // props.handleAddFriend(user._id, friendId)
  };

  const handleSearch = (evt) => {
    const match = (str1, str2) => {
      return (str1.toLowerCase().includes(str2.toLowerCase())) ? true : false;
    };
    const curUsers = sortedUsers.filter(el => match(el.username, evt.target.value) || match(evt.target.value, el.username));
    setFilteredUsers(curUsers);
  };

  return (
    <div className={styles.container}>
      <input type="text" placeholder='Search Users' onChange={handleSearch}/>
      <form onSubmit={handleSubmit}>
        <select>
          {filteredUsers.map((usr, idx) => (
            <option key={idx} value={usr._id}>{usr.username}</option>
          ))}
        </select>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Users;