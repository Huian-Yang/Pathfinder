import React from 'react';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <h1>Welcome to the Pathfinder</h1>
      <button onClick={() => navigate('/careerfinder')}>Find Your Career</button>
      <button onClick={() => navigate('/form')}>Navigate Your Career</button>
    </div>
  );
}

export default Homepage;



