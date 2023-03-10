import React from "react";

import { NavLink } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink style={{ color: "#e60073" }} className="navbar-brand" to="/">
            HOME
          </NavLink>
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
              {/* <Button> */}
                <NavLink to={"/addBucket"} style={{ color: "#e60073" }} className="navbar-brand">
                  ADD<CreateIcon fontSize="medium"></CreateIcon>
                </NavLink>
              {/* </Button> */}
              <NavLink to={"/yourHistory"} style={{ color: "#e60073" }} className="navbar-brand">
                HISTORY
              </NavLink>
            </ul>
            <form className="d-flex" role="search">
              <input
                style={{ color: "#e60073" }}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
