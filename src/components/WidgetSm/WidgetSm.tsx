import React, { useState, useEffect } from "react";
import "./WidgetSm.scss";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { userRequest } from "../../requestMethods";
import { Loader } from "../Loader";

export const WidgetSm: React.FC = React.memo(
  () => {
    const [users,setUsers] = useState<User[] | []>([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
      const getUsers = async () => {
        try {
          setIsFetching(true);
          const response = await userRequest.get("users/?new=true");

          setUsers(response.data);
          setIsFetching(false);
        } catch (error) {
          console.log(error);
        }
      }

      getUsers();
    }, []);

    return (
      <div className="widgetSm">
        <span className="widgetSmTitle">New Join Members</span>

        {isFetching
          ? (<Loader />)
          : (
          <>
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
          </>
        )}
      </div>
    );
  }
)