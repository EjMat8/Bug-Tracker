import React, { useState, useEffect, useCallback } from "react";
import { Card } from "../components/UI/Card";
import { Grid } from "../components/UI/Grid";
import Spinner from "../components/UI/Spinner";
import RoleForm from "../components/Roles/RoleForm";
import Modal from "../components/UI/Modal";
import UserRoles from "../components/Roles/UserRoles";
import useHttp from "../hooks/useHttp";
import _ from "lodash";

const RolesPage = () => {
  const [users, setUsers] = useState({});
  const [selectedUserId, setSelectedUserId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { isLoading, error, sendReq } = useHttp();

  const transformData = useCallback(({ data }) => {
    setUsers(_.mapKeys(data.data, "_id"));
  }, []);
  useEffect(() => {
    sendReq(
      "/api/users?role[ne]=admin&sort=name&page=1&limit=10",
      { method: "GET" },
      transformData
    );
  }, [sendReq, transformData]);

  const submitHandler = (e, inputArr, selectedUser) => {
    e.preventDefault();

    const value = inputArr.find((el) => el.current.checked);
    if (!value) return;
    sendReq(
      `/api/users/updateUserRole/${selectedUser._id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ role: value.current.value }),
        headers: { "Content-Type": "application/json" },
      },
      (data) => {
        setUsers((prevState) => ({
          ...prevState,
          [selectedUserId]: data.data.user,
        }));
        setOpenModal(false);
      }
    );
  };
  return (
    <React.Fragment>
      <Card title="Users" desc="Manage your users' role" className="move-up-lg">
        <Grid tempCol="1fr 2fr 1fr">
          <h3 className="grid__label">Name</h3>
          <h3 className="grid__label">Email</h3>
          <h3 className="grid__label">Role</h3>

          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "30rem",
                gridColumn: "1 / -1",
              }}
            >
              <Spinner />
            </div>
          ) : (
            Object.values(users).map((el) => (
              <UserRoles
                key={el._id}
                name={el.name}
                email={el.email}
                id={el._id}
                role={el.role}
                setOpenModal={setOpenModal}
                setSelectedUserId={setSelectedUserId}
              />
            ))
          )}
        </Grid>

        <div className="pagination" style={{ marginTop: "1.5rem" }}>
          <button className="buton">&lt;</button>
          <button>1</button>
          <button>2</button>
          <button>&gt;</button>
        </div>
      </Card>
      {openModal && (
        <Modal setOpenModal={setOpenModal}>
          <RoleForm
            selectedUser={users[selectedUserId]}
            setOpenModal={setOpenModal}
            submitHandler={submitHandler}
          />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default RolesPage;
