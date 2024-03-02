import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${window.location.origin}/user/register`, data)
      .then((res) => {
        alert(res.data); // Success message
        setData({
          username: "",
          email: "",
          password: "",
          confirmpassword: "",
        });
        navigate("/login"); // Redirect on success
      })
      .catch((error) => {
        alert("error in creating account" + error);
      });
  };

  return (
    <div className="d-flex justify-content-center m-5">
      <div className="card" style={{ width: "70vw" }}>
        <div className="card-body">
          <h5 className="card-title">Register</h5>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="exampleInputUsername1">Username:</label>
              <input
                type="text"
                name="username"
                // value={username}
                className="form-control"
                id="exampleInputUsername1"
                placeholder="Enter Username"
                onChange={changeHandler}
              />
            </div>
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
            <div className="form-group">
              <label htmlFor="exampleInputConfirmPassword1">
                Confirm Password:
              </label>
              <input
                type="password"
                name="confirmpassword"
                // value={confirmpassword}
                className="form-control"
                id="exampleInputConfirmPassword1"
                placeholder="Confirm Password"
                onChange={changeHandler}
              />
            </div>
            <input
              type="submit"
              className="m-2 btn btn-primary"
              value="Register"
            />
          </form>
          <Link to="/login">Click here to login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
