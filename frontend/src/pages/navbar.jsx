import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WorkoutContext } from "../context/context";
import { AuthContext } from "../context/authcontext";

export default function Navbar() {
  const { dispatch: workoutdispatch } = useContext(WorkoutContext);
  const { user, dispatch } = useContext(AuthContext);
  const handleclick = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    workoutdispatch({ type: "SET_WORKOUTS", payload: [] });
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <h1>WORKT</h1>
          </Link>
        </div>
        {user && (
          <div>
            <span>{user.email}</span>
            <button onClick={handleclick}>Log out</button>
          </div>
        )}
        {!user && (
          <div className="option">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
}
