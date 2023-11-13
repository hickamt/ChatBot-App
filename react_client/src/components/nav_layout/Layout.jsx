// React Navbar Docs: https://react-bootstrap.github.io/docs/components/navbar

import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      {/* <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-dark"> */}
      <nav className="navbar sticky-top navbar-expand-md navbar-dark ">
        <div className="container-fluid">
          <Link className="nav-link" to="/">
            <img
              // src="https://img.itch.zone/aW1nLzExMTQzOTQuZ2lm/original/hHfogE.gif"
              src="https://habbo-gifs.s3.amazonaws.com/3683064444.gif"
              alt="sprite generated character"
              className="d-inline-block align-top navLogo"
            />
          </Link>
          <button
            className="navbar-toggler"
            id="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active fs-4">
                <Link className="nav-link fs-4" to="/dialogpt">
                  DialoGPT 
                </Link>
              </li>
              <li className="nav-item active fs-4">
                <Link className="nav-link fs-4" to="/eleuther">
                  Eleuther
                </Link>
              </li>
              <li className="nav-item active fs-4">
                <Link className="nav-link" to="/mistralai">
                  MistralAI
                </Link>
              </li>
              <li className="nav-item active fs-4">
                <Link className="nav-link" to="/zephyr">
                  Zephyr
                </Link>
              </li>
              <li className="nav-item active fs-4">
                <Link className="nav-link" to="/fb_blender">
                  FB Blender
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
