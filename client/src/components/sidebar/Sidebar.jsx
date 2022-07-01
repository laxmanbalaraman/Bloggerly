import "./sidebar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://images.pexels.com/photos/10762353/pexels-photo-10762353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          quasi impedit adipisci dicta, at debitis enim tenetur, corrupti et
          fugiat esse vero corporis atque accusantium beatae repellat maiores
          ipsam autem?
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="Link">
              <li className="sideBarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i class="sidebarIcon fa fa-facebook-official" aria-hidden="true"></i>
          <i class="sidebarIcon fa fa-twitter-square" aria-hidden="true"></i>
          <i class="sidebarIcon fa fa-pinterest-square" aria-hidden="true"></i>
          <i class="sidebarIcon fa fa-instagram" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
}
