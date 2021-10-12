import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import Badge from "@mui/material/Badge";
import { Avatar } from "@mui/material";

const NavBar = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <nav className="py-3 bg-black ">
      <div className="container z-10 flex items-center justify-between mx-auto">
        <Link className="flex items-center" to="/">
          <i className="text-4xl text-purple-200 fas fa-superscript"></i>
          <span className="ml-2 text-2xl font-bold text-pink-200">ABC.</span>
        </Link>
        {/* <i
          className={
            clicked ? "fas fa-times menu-icon" : "fas fa-bars menu-icon"
          }
          onClick={() => setClicked(!clicked)}
        /> */}
        <i
          className={`visible mr-10 text-4xl text-white cursor-pointer ${
            clicked ? "fas fa-times" : "fas fa-bars"
          } fa-2x md:invisible md:mr-0`}
          onClick={() => setClicked(!clicked)}
        />
        <ul
          className={`text-xl text-white md:flex md:items-center sm-menu ${
            clicked && "sm-menu-active"
          }`}
        >
          <li className="hover:text-yellow-400">
            <NavLink
              to="/"
              activeClassName="active"
              exact
              onClick={() => setClicked(false)}
            >
              หน้าแรก
            </NavLink>
          </li>
          <li
            className="ml-4 hover:text-yellow-400"
            onClick={() => setClicked(false)}
          >
            <NavLink to="/movie" exact className="flex items-center justify-center">
              <Badge badgeContent={4} color="primary">
                ตะกร้าสินค้า
              </Badge>
            </NavLink>
          </li>
          <li
            className="ml-4 hover:text-yellow-400"
            onClick={() => setClicked(false)}
          >
            <NavLink to="todo" exact>
              Todo
            </NavLink>
          </li>
          <li
            className="ml-4 hover:text-yellow-400"
            onClick={() => setClicked(false)}
          >
            <NavLink to="landing" exact>
              landing
            </NavLink>
          </li>
          <li
            className="ml-4 hover:text-yellow-400"
            onClick={() => setClicked(false)}
          >
            <NavLink to="login" exact>
              เข้าสู่ระบบ
            </NavLink>
          </li>
          <li
            className="ml-10 hover:text-yellow-400"
            onClick={() => setClicked(false)}
          >
            <Link to="ecommerce" className="flex items-center justify-center gap-1">
              <Avatar
                alt="Remy Sharp"
                src="https://frrrutiz.com/themes/main/no-avatar.png"
              />
              <span className="text-yellow-300">Thanonchai</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
