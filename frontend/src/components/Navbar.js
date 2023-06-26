
import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'G:\Dhiral Work\TravelLog\frontend\src\styles\Logoimg.jpg';

function Navbar({ isLoggedIn, handleLogout }) {

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" className="logo-img" />
            TravelTrack
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active me-2" aria-current="page" to="/">
                  <i className='fa fa-home'></i>
                  Home
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link className="nav-link map" to="/map">
                   
                      Map
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link pindetails" to="/pindetails">
                  
                      PinDetails
                    </Link>
                  </li>
                </>)
                : ""}
            </ul>
          </div>
          <div className="d-flex navbar-end">
            {isLoggedIn ? (

              <button className="btn btn-dark" onClick={handleLogout}>
                <i className="fa fa-sign-out"></i>
                Logout
              </button>
            ) : (
              <>
                <Link className="btn btn-dark me-2" to="/login">
                  <span> <i className="fa fa-sign-in"></i></span>
                  Log In
                </Link>
                <Link className="btn btn-dark " to="/signup">
                  <i className="fa fa-user-plus"></i>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
