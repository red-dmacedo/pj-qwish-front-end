import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as userService from '../../services/userService';
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [userList, setUserList] = useState([]); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUserList(fetchedUsers);
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user]);

  return (
    <main className={styles.container}>
      <h1>Welcome, {user.username}!</h1>
      
      <h2>Ready to update your wishlist? Add a new wishlist?</h2>

      <h1>My Qwishlists</h1>


      <ul>
        {userList.map((user, idx) => (
          <li key={idx}>
            {user.username}
          </li>
        ))}       
      </ul>
    </main>
  );
};

export default Dashboard;