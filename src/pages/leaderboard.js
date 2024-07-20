// pages/leaderboard.js
import React, {useEffect} from "react";
import Leaderboard from '../components/Leaderboard';
import * as db from '../database';

const LeaderboardPage = () => {
  
  return (
    <div>
      <Leaderboard />
    </div>
  );
};

export default LeaderboardPage;
