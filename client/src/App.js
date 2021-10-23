import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { persistLogin } from "./store/authActions";
import Layout from "./components/layout/Layout";

import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import RolesPage from "./pages/RolesPage";
import ProfilePage from "./pages/ProfilePage";
import ProjectsPage from "./pages/ProjectsPage";
import TicketsPage from "./pages/TicketsPage";

import Spinner from "./components/UI/Spinner";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(persistLogin());
  }, [dispatch]);

  if (auth.isLoading)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner />
      </div>
    );
  if (!auth.id.trim())
    return (
      <Switch>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="*">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    );

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/dashboard" />
        </Route>
        <Route path="/dashboard">
          <DashboardPage />
        </Route>
        <Route path="/manage-roles">
          {auth.role === "admin" ? <RolesPage /> : <Redirect to="/" />}
        </Route>
        <Route path="/user-profile">
          <ProfilePage />
        </Route>
        <Route path="/projects">
          <ProjectsPage />
        </Route>
        <Route path="/my-tickets">
          <TicketsPage />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
