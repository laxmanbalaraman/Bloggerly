import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./../../context/Context";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    console.log("clicked!");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topLeft">
        <i class="topIcon fa fa-facebook-official" aria-hidden="true"></i>
        <i class="topIcon fa fa-twitter-square" aria-hidden="true"></i>
        <i class="topIcon fa fa-pinterest-square" aria-hidden="true"></i>
        <i class="topIcon fa fa-instagram" aria-hidden="true"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            <Link to="/login" className="link">
              {user && "LOGOUT"}
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImage" src={PF + user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">LOGIN</li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}

        <i class="topSearchIcon fa fa-search" aria-hidden="true"></i>
      </div>
    </div>
  );
}
