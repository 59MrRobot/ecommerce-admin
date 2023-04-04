import React, { useState, useEffect } from "react";
import "./WidgetSm.scss";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { userRequest } from "../../requestMethods";

export const WidgetSm: React.FC = React.memo(
  () => {
    const [users,setUsers] = useState<User[] | []>([]);

    useEffect(() => {
      const getUsers = async () => {
        try {
          const response = await userRequest.get("users/?new=true");

          setUsers(response.data);
        } catch (error) {
          // console.log(error);
        }
      }

      getUsers();
    }, []);

    return (
      <div className="widgetSm">
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
          {users.map((user: User) => (
            <li className="widgetSmListItem" key={user._id}>
              <img
                src={user.image}
                alt=""
                className="widgetSmImg"
              />

              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
              </div>

              <button className="widgetSmButton">
                <VisibilityIcon className="widgetSmIcon" />
                Display
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
)