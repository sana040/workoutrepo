import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authcontext";

export default function Register() {
  const [email, setemail] = useState("");
  const [cpass, setcpass] = useState("");
  const [password, setpass] = useState("");
  const [Error, setError] = useState(null);

  const { dispatch } = useContext(AuthContext);

  const handlechange = async (e) => {
    e.preventDefault();
    if (!password === cpass) {
      setError("Password do not match");
      return;
    }

    const response = await fetch("http://localhost:4000/user/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      setemail("");
      setpass("");
      setcpass("");
    }
  };

  return (
    <form className="register" onSubmit={handlechange}>
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setemail(e.target.value);
        }}
      />

      <input
        type="Password"
        placeholder="Create Password"
        value={password}
        onChange={(e) => {
          setpass(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Confirm Password"
        value={cpass}
        onChange={(e) => {
          setcpass(e.target.value);
        }}
      />

      <button>Register</button>
      {Error && <div className="error">{Error}</div>}
      <span>
        Already have an account? <a href="/login">Login</a>
      </span>
    </form>
  );
}
