import React, { useContext, useState } from "react";
import axios from "axios";
import { store } from "../App";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [token, setToken] = useContext(store);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${window.location.origin}/user/login`, data)
      .then((res) => {
        localStorage.setItem("token", res.data.token); // Store token
        setToken(res.data.token);
      })
      .catch((error) => {
        alert("error in login" + error);
      });
  };
  if (token) {
    return navigate("/todos");
  }
  return (
    <div className="d-flex justify-content-center m-5">
      <div className="card" style={{ width: "70vw" }}>
        <div className="card-body">
          <h5 className="card-title">Login</h5>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address:</label>

              <input
                type="email"
                name="email"
                // value={email}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email address"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password:</label>
              <input
                type="password"
                name="password"
                // value={password}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Password"
                onChange={changeHandler}
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
          </form>
          <p>Dont have account? </p>
          <Link to="/register">Register Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
