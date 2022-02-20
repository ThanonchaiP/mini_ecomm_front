import { useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import "./NavBar.css";
import Badge from "@mui/material/Badge";
import { Avatar, Menu, MenuItem } from "@mui/material";

//redux
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/actions/authAction";
import { loadCurrentItem, logOut } from "../redux/actions/shoppingAction";

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.authReducer.profile);
  const total = useSelector((state) => state.shoppingReducer.total);
  const [clicked, setClicked] = useState(false);

  //submenu profile
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getProfile = () => {
    const profileValue = JSON.parse(localStorage.getItem("profile"));
    if (profileValue) {
      dispatch(updateProfile(profileValue));

      //getCartItem
      dispatch(loadCurrentItem(profileValue?._id));
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    dispatch(updateProfile(null));
    dispatch(logOut());
    history.replace("/login");
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="py-2">
      <div className="z-10 flex items-center justify-between mx-auto max-w-7xl">
        <Link className="flex items-center mx-2" to="/">
          <i className="text-xl text-red-500 fas fa-superscript"></i>
          <span className="ml-2 text-xl font-bold">ABC.</span>
        </Link>
        <i className={`visible text-4xl mr-2 cursor-pointer ${clicked ? "fas fa-times" : "fas fa-bars"} fa-2x md:invisible md:mr-0`} onClick={() => setClicked(!clicked)} />
        <ul className={`text-base md:flex md:items-center md:mr-3 sm-menu ${clicked && "sm-menu-active"}`}>
          <li className="hover:text-red-600">
            <NavLink to="/" activeClassName="active" exact onClick={() => setClicked(false)}>
              HOME
            </NavLink>
          </li>
          <li className="ml-4 hover:text-red-600" onClick={() => setClicked(false)}>
            <NavLink to="todo" exact>
              MEN
            </NavLink>
          </li>
          <li className="ml-4 hover:text-red-600" onClick={() => setClicked(false)}>
            <NavLink to="landing" exact>
              WOMEN
            </NavLink>
          </li>
          <li className="ml-4 hover:text-red-600" onClick={() => setClicked(false)}>
            <NavLink to="/cart" exact className="flex items-center justify-center">
              <Badge badgeContent={total?.amount} color="primary">
                CART
              </Badge>
            </NavLink>
          </li>
          {/* {profile && (
            <li className="ml-4 hover:text-red-600" onClick={() => setClicked(false)}>
              <button className="px-3 py-1 text-white bg-red-600 rounded-lg hover:bg-red-700" onClick={logout}>
                ออกจากระบบ
              </button>
            </li>
          )} */}
          {profile && (
            <li className="ml-10 hover:text-red-600" onClick={() => setClicked(false)}>
              <div className="flex items-center justify-center gap-1 cursor-pointer" onClick={handleClick}>
                <Avatar alt="Remy Sharp" src="https://cdnb.artstation.com/p/assets/images/images/009/836/467/medium/maria-bo-schatzis-stream-profilpicture.jpg?1521139318" />
                <span>{profile.name}</span>
              </div>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => history.push("/profile")}>My account</MenuItem>
                <MenuItem onClick={handleClose}>My Purchase</MenuItem>
                <MenuItem className="bg-red-600" onClick={logout}>
                  Logout
                </MenuItem>
              </Menu>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
