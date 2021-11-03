import React, { useEffect, useCallback } from "react";
import ProjectItem from "./ProjectItem";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp";
import { projectActions } from "../../store/projectSlice";
import _ from "lodash";
const ProjectList = () => {
  const { project } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { isLoading, error, sendReq } = useHttp();
  const getProjectsData = useCallback(
    ({ data }) => {
      dispatch(projectActions.setProjects(_.mapKeys(data.data, "slug")));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!Object.values(project.projects).length)
      sendReq(
        "/api/projects?fields=-users",
        { method: "GET" },
        getProjectsData
      );
  }, [sendReq, getProjectsData, project.projects]);

  const markup = Object.values(project.projects).map((el) => (
    <ProjectItem
      key={el._id}
      id={el.slug}
      name={el.name}
      desc={el.desc}
      author={el.createdBy.name}
    />
  ));
  return <React.Fragment>{markup}</React.Fragment>;
};

export default ProjectList;
