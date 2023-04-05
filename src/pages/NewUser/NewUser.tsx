import React, { useState } from "react";
import "./NewUser.scss";
import { addUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const NewUser: React.FC = React.memo(
  () => {
    const [inputs, setInputs] = useState<any | null>(null);
    const [status, setStatus] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputs((prev: any) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    };

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setStatus(event.target.value);
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      
      const newUser = {
        ...inputs,
        status,
      }

      addUser(dispatch, newUser);

      navigate('/users');
    }

    return (
      <div className="newUser">
        <h1 className="newUserTitle">New User</h1>

        <form className="newUserForm">
          <div className="newUserItem">
            <label>Username</label>
            <input
              name="username"
              type="text"
              placeholder="John"
              onChange={handleChange}
            />
          </div>

          <div className="newUserItem">
            <label>Full Name</label>
            <input
              name="fullName"
              type="text"
              placeholder="John Smith"
              onChange={handleChange}
            />
          </div>

          <div className="newUserItem">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="john@gmail.com"
              onChange={handleChange}
            />
          </div>

          <div className="newUserItem">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="password"
              onChange={handleChange}
            />
          </div>

          <div className="newUserItem">
            <label>Phone</label>
            <input
              name="number"
              type="text"
              placeholder="+1 123 456 78"
              onChange={handleChange}
            />
          </div>

          <div className="newUserItem">
            <label>Country</label>
            <input
              name="country"
              type="text"
              placeholder="South Africa"
              onChange={handleChange}
            />
          </div>

          <div className="newUserItem">
            <label>Active</label>

            <select
              className="newUserSelect"
              name="status"
              id="active"
              onChange={handleSelect}
            >
              <option value="Active">Yes</option>

              <option value="Inactive">No</option>
            </select>
          </div>
          
          <button
            className="newUserButton"
            onClick={handleClick}
          >
            Create
          </button>
        </form>
      </div>
    );
  }
)