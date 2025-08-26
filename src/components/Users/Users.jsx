import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

const Users = (props) => {
  const { user } = useContext(UserContext);
  const sortedUsers = props.users.toSorted((a, b)=> a.name.localeCompare(b.name));
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
    const curUsers = sortedUsers.filter(el => match(el.name, evt.target.value) || match(evt.target.value, el.name));
    setFilteredUsers(curUsers);
  };

  return (
    <>
      <input type="text" placeholder='Search Users' onChange={handleSearch}/>
      <form onSubmit={handleSubmit}>
        <select>
          {filteredUsers.map((usr, idx) => (
            <option key={idx} value={usr._id}>{usr.name}</option>
          ))}
        </select>
        <button type='submit'>Submit</button>
      </form>
    </>
  );
};

export default Users;