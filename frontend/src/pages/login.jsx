import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authcontext";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Error, setError] = useState(null);
  const { dispatch } = useContext(AuthContext);

  const handlechange = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/user/login", {
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
      setpassword("");
    }
  };

  return (
    <form className="login" onSubmit={handlechange}>
      <h2>Login</h2>

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
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setpassword(e.target.value);
        }}
      />
      <a href="forgetpass">Forget Password?</a>

      <button>Login</button>
      {Error && <div className=" error">{Error}</div>}
      <span>
        Don't have an account? <a href="/register">Register</a>
      </span>
    </form>
  );
}
