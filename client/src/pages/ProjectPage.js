import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import useHttp from "../hooks/useHttp";

const ProjectPage = () => {
  const { id } = useParams();
  const { projects } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { isLoading, sendReq } = useHttp();

  const projectId = projects[id]._id;

  useEffect(() => {
    sendReq(`/api/projects/${projectId}`, { method: "GET" });
  }, [sendReq, projectId]);
  return <div>sup</div>;
};

export default ProjectPage;
