import React from "react";
import { AiOutlineMore } from "react-icons/ai";
import { Link } from "react-router-dom";
const ProjectItem = ({ id, name, desc, author }) => {
  return (
    <React.Fragment>
      <p className="grid__data">
        <Link to={`/projects/${id}`} className="project-link">
          {name}
        </Link>
      </p>
      <p className="grid__data">{desc}</p>
      <p className="grid__data grid__action">
        {author}
        <AiOutlineMore className="grid__edit" />
      </p>
    </React.Fragment>
  );
};

export default ProjectItem;
