import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/userselector.css';

const UserSelector = ({ selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`https://claim-daily-reward.onrender.com/api/users`);
        setUsers(res.data);
        if (res.data.length > 0) {
          setSelectedUser(res.data[0]._id);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, [setSelectedUser]);

  return (
    <div className="user-select-container">
  <h3>User</h3>
  <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
    {users.map((user) => (
      <option key={user._id} value={user._id}>
        {user.name}
      </option>
    ))}
  </select>
</div>
  );
};

export default UserSelector;
