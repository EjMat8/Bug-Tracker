import React from "react";
import { AiFillLayout, AiTwotoneEdit } from "react-icons/ai";
import { FaUser, FaUserFriends, FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const classActiveLink = (val, realVal) =>
  `sidebar__nav-item ${
    (val === realVal || val.includes(realVal)) && "sidebar__nav-item--active"
  }`;
const Navigation = ({ pathname }) => {
  const { auth } = useSelector((state) => state);

  return (
    <nav className="sidebar__nav">
      <ul>
        <li className={classActiveLink(pathname, "/dashboard")}>
          <AiFillLayout />
          <Link to="/dashboard">Dashboard</Link>
        </li>
        {auth.role === "admin" && (
          <li className={classActiveLink(pathname, "/manage-roles")}>
            <FaUserFriends />
            <Link to="/manage-roles">Manage Roles</Link>
          </li>
        )}
        <li className={classActiveLink(pathname, "/projects")}>
          <AiTwotoneEdit />
          <Link to="/projects">Projects</Link>
        </li>
        <li className={classActiveLink(pathname, "/my-tickets")}>
          <FaTicketAlt />
          <Link to="/my-tickets">My Tickets</Link>
        </li>
        <li className={classActiveLink(pathname, "/user-profile")}>
          <FaUser />
          <Link to="/user-profile">User Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
