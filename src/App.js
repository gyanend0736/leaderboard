import React, { useEffect, useState } from 'react';
import UserSelector from './components/userselector';
import ClaimButton from './components/Claimbutton';
import Leaderboard from './components/leaderboard';
import AddUser from './components/Adduser';
import './app.css';

function App() {
  const [selectedUser, setSelectedUser] = useState('');
  const [view, setView] = useState('home'); // 'home' or 'leaderboard'
  const handleClaimSuccess = () => {
    document.getElementsByClassName('afterAwardleaderbor')[0].style.display = 'block';
  };
  useEffect(() =>{
    if (selectedUser) {
      setView('home'); // Reset to home view when a user is selected
    document.getElementsByClassName('afterAwardleaderbor')[0].style.display = 'none';

    }
  },[selectedUser]);
  return (
    <div className="app">
      <header className="header">
        <div style={{ display: 'flex', gap: "10px", alignItems: "center" }}>
        <button style={{ height: "50px" }} onClick={() => setView('home')}>←
</button>
        <UserSelector selectedUser={selectedUser} setSelectedUser={setSelectedUser} /></div>
        <div className="header-buttons">
          
          {view === 'addUser' ?(<div style={{ display: 'flex', gap: "5px" }}
><button onClick={() => setView('home')}>X</button><AddUser /></div>): (<button onClick={() => setView('addUser')}>Add User</button>)}
          <button onClick={() => setView('leaderboard')}>Leaderboard</button>
          
        </div>
      </header>

      <main className="main">
        {view === 'leaderboard' ? (
          <Leaderboard/>
        ) : (
          <div className='gift-box'>
            <div className="button-box">
          <ClaimButton  selectedUser={selectedUser} onClaimSuccess={handleClaimSuccess} />
          <button className='afterAwardleaderbor' onClick={() => setView('leaderboard')}>Leaderboard</button>
          </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;