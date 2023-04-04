import React, { useCallback, useEffect, useState } from 'react';
import "./Login.scss";
import { useDispatch } from "react-redux";
import { login } from '../../redux/apiCalls.js';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = React.memo(
  () => {
    const [loginCredentials, setLoginCredentials] = useState({});
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.currentUser);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoginCredentials((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));

      setShowError(false);
    }

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      login(dispatch, loginCredentials);

      if (user && !user.isAdmin) {
        setShowError(true);
      }
    }, [dispatch, loginCredentials, user])

    useEffect(() => {
      if (user && user.isAdmin) {
        navigate("/")
      }
    }, [navigate, user]);

    return (
      <div className="login">
        <span className="logo">59MrRobot Admin</span>

        <input
          name="username"
          type="text"
          placeholder="username"
          className="login__input"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="password"
          className="login__input"
          onChange={handleChange}
        />

        <button className="login__button" onClick={handleClick}>Login</button>

        <span className={`login__error login__error--${showError}`}>
          You are not authorised to login.
        </span>
      </div>
    )
  }
)