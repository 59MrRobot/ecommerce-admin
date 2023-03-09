import React, { useState } from 'react';
import "./Login.scss";
import { useDispatch } from "react-redux";
import { login } from '../../redux/apiCalls';

export const Login: React.FC = React.memo(
  () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      login(dispatch, {username, password});
    }

    return (
      <div className="login">
        <input
          type="text"
          placeholder="username"
          value={username}
          className="login__input"
          onChange={(event) => setUsername(event.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          className="login__input"
          onChange={(event) => setPassword(event.target.value)}
        />

        <button className="login__button" onClick={handleClick}>Login</button>
      </div>
    )
  }
)