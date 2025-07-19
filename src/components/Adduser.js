import React, { useState } from 'react';
import axios from 'axios';
import '../css/adduser.css';
const AddUser = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleAddUser = async () => {
    if (!username.trim()) {
      setMessage('⚠️ Username cannot be empty');
      return;
    }

    try {
      const res = await axios.post(`https://claim-daily-reward.onrender.com/api/users`, { name: username });
      setMessage(`✅ User "${res.data.name}" added successfully!`);
      setUsername('');
    } catch (err) {
      setMessage('❌ Failed to add user');
      console.error(err);
    }
  };

  return (
    <div>
      
      <input
        type="text"
        placeholder={message ? `(${message})` : 'Enter username'}
        className="add-user-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleAddUser}>Add User</button>
      
    </div>
  );
};

export default AddUser;
