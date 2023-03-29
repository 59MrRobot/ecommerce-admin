import React from "react";
import "./Topbar.scss";
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { logout } from "../../redux/userRedux";

export const Topbar: React.FC = React.memo(
  () => {
    const currentUser: User = useSelector((state: any) => state.user.currentUser);
    // const dispatch = useDispatch();

    const handleClick = () => {
      // dispatch(logout(false));
    }

    return (
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="logo">59MrRobot Admin</span>
            </Link>
          </div>

          <div className="topRight">
            <div className="topbarIconContainer">
              <LogoutIcon onClick={handleClick}/>
            </div>

            <div className="topbarIconContainer">
              <NotificationsNoneIcon />
              <span className="topIconBadge">2</span>
            </div>

            <div className="topbarIconContainer">
              <LanguageIcon />
              <span className="topIconBadge">2</span>
            </div>

            <div className="topbarIconContainer">
              <SettingsIcon />
            </div>

            <img
              src={currentUser.image}
              alt=""
              className="topAvatar"
              />
          </div>
        </div>
      </div>
    );
  }
)
