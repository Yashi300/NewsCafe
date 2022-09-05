import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  let location = useLocation();
  const navigate = useNavigate();

const handleLogout = ()=>{
  localStorage.removeItem('token')
  props.showAlert(" Oops! Looks like you just logged out of your notebook.", "success")
  navigate('/login');
}

const handleaccount = ()=>{
  navigate('/account')
}

  return (
    <div>
      <header className="header">
        <Link to="/" className="logo">
          NoteCafe
        </Link>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>
        <ul className="menu">
          <li >
            <Link className={`${location.pathname==="/"?"active":""}`}  to="/">Home</Link>
          </li>
          <li>
            <Link className={`${location.pathname==="/about"?"active":""}`}  to="/about">About</Link>
          </li>
        </ul>
      {!localStorage.getItem('token')?<form className="d-flex my-3" style={{color:"white"}}>
      <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
      </form>:<div><i className="fa-solid fa-user fa-2x mx-4 mt-3" onClick={handleaccount} ></i>
      <button className="btn btn-primary mb-2 mx-2 mt-3" onClick={handleLogout} style={{float:"right"}}>Logout</button>
      </div>}
      </header>
    </div>
  );
};

export default Navbar;
