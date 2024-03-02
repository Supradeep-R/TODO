import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Supradeep's MERN STACK TODO Application</h1>
      <p>View Your Todos Here:</p>
      <Link to="/todos">Your Todos</Link>
    </div>
  );
};

export default Home;
