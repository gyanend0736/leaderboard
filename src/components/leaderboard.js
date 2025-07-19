import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/leaderboard.css';

const Leaderboard = () => {
  const [rankings, setRankings] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(`https://claim-daily-reward.onrender.com/api/users/leaderboard`);
      setRankings(res.data);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
  <h3>Live Ranking</h3>

  <div className="top-three">
    {rankings.slice(0, 3).map((user, i) => (
      <div className="top-card" key={user._id}>
        <div className="rank-badge">{i + 1}</div>
        
        <div>{user.name}</div>
        <div>{user.totalPoints.toLocaleString()}</div>
      </div>
    ))}
  </div>

  <table className="leaderboard-table">
    <thead>
      <tr>
        <th>Rank</th>
        <th>User</th>
        <th>Total Points</th>
      </tr>
    </thead>
    <tbody>
      {rankings.slice(3).map((user, i) => (
        <tr key={user._id}>
          <td>{i + 4}</td>
          <td>
            
            {user.name}
          </td>
          <td>{user.totalPoints.toLocaleString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
};

export default Leaderboard;
