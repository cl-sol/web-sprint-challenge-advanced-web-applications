import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setcredentials] = useState({
    id: "",
    username: "",
    password: ""
  })

  const history = useHistory();

  function handleChanges(e) {
    e.persist();
    setcredentials({...credentials, [e.target.name]: e.target.value})
  };

  function handleSubmit(e) {
    e.preventDefault();
    return axios
      .post("http://localhost:5000/api/login", credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", JSON.stringify(res.data.payload));
        history.push("/bubble-page");
      })
      .catch(err => console.log(err))
  };


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChanges}
        />
        <input
          type="text"
          name="password"
          value={credentials.password}
          onChange={handleChanges}
        />
        <button className="login-button">Log In</button>
      </form>
    </>
  );
};

export default Login;
