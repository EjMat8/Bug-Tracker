import React, { useState, useEffect } from "react";
import { Card } from "../components/UI/Card";
import { Grid } from "../components/UI/Grid";
import Spinner from "../components/UI/Spinner";
import RoleForm from "../components/Roles/RoleForm";
import Modal from "../components/UI/Modal";
import UserRoles from "../components/Roles/UserRoles";
import _ from "lodash";

const RolesPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("/api/users?role[ne]=admin&sort=name&page=1&limit=10")
      .then((res) => res.json())
      .then(({ data }) => {
        setUsers(_.mapKeys(data.data, "_id"));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <React.Fragment>
      <Card title="Users" desc="Manage your users' role">
        <Grid tempCol="1fr 2fr 1fr">
          <h2 className="grid__label">Name</h2>
          <h2 className="grid__label">Email</h2>
          <h2 className="grid__label">Role</h2>

          {loading ? (
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

        <div className="pagination">
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
          />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default RolesPage;
