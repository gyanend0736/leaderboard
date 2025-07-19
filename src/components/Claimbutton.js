import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../css/claimbutton.css';
const ClaimButton = ({ selectedUser, onClaimSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [tooclaimed, settooClaimed] = useState(false);
    
  const [awardedPoints, setAwardedPoints] = useState(null);
useEffect(() => {
  setClaimed(false);
    setAwardedPoints(null);
}, [selectedUser]);
    const [spin, setSpin] = useState(false);
  const handleClaim = async () => {
    if (!selectedUser) return;
    setSpin(true); // Trigger spin animation
    setTimeout(() => setSpin(false), 800); // Remove animation after duration
    setLoading(true);
    try {
      const res = await axios.post(`https://claim-daily-reward.onrender.com/api/users/claim/${selectedUser}`
      );

      setAwardedPoints(res.data.randomPoints);
        setClaimed(true);
      onClaimSuccess(); 
    } catch (err) {
      console.error('Claim failed:', err.status);

      if(err.status == 403){
        settooClaimed(true);
        setTimeout(() => settooClaimed(false), 3000); // Hide after 3 seconds
       
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
    {!claimed && <button
        className={spin ? 'spin-animate size' : 'size'}
        onClick={handleClaim}
        disabled={loading}
      >
        {loading ? 'Claiming...' : '🎰 Claim'}</button>} 
       {tooclaimed && <div className='show-points red'><p>⚠️ You have already claimed today</p></div>}
      {awardedPoints !== null &&<div className='show-points'> <p>Points Awarded: {awardedPoints}</p></div>}

    
    </>
  );
};

export default ClaimButton;
