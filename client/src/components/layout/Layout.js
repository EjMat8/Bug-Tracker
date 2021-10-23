import React from "react";
import { AiOutlineBug } from "react-icons/ai";

import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import { logout } from "../../store/authActions";

const labelForm = (val) =>
  (val.includes("-") ? val.split("-").join(" ") : val).slice(1);

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    dispatch(logout());
  };

  if (pathname === "/auth") return <React.Fragment>{children}</React.Fragment>;
  return (
    <div className="main-content">
      <div className="sidebar">
        <h3 className="sidebar__heading">
          <span>
            <AiOutlineBug className="icon" />
          </span>
          Bug Tracker
        </h3>
        <p className="sidebar__welcome">
          Hello {auth.role} {auth.name}!
        </p>
        <Navigation pathname={pathname} />
        <button onClick={logoutHandler} className="btn btn--err">
          Logout
        </button>
      </div>
      <main className="content">
        <div className="content__label">
          <h2 className="content__label-heading">{labelForm(pathname)}</h2>
        </div>
        <div className="content__visuals">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
