import React from "react";
import { Card } from "../components/UI/Card";
import { Grid } from "../components/UI/Grid";
import { useSelector } from "react-redux";

import ProjectList from "../components/Projects/ProjectList";

const ProjectsPage = () => {
  const { auth } = useSelector((state) => state);

  const desc =
    auth.role === "admin" ? "Overseeing all projects" : "Manage your projects";

  return (
    <Card title="Projects" desc={desc} className="move-up-lg">
      <Grid tempCol="1fr 2fr 1fr">
        <h3 className="grid__label">Name</h3>
        <h3 className="grid__label">Description</h3>
        <h3 className="grid__label">Created By</h3>
        <ProjectList />
      </Grid>
    </Card>
  );
};

export default ProjectsPage;
