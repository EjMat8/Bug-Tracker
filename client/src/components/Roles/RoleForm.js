import React, { useRef } from "react";
// /api/users/updateUserRole/61679921951f43f31427af99
const RoleForm = ({ selectedUser, setOpenModal, submitHandler }) => {
  const adminRef = useRef();
  const pmRef = useRef();
  const devRef = useRef();

  const inputOptions = (role, id, value) => {
    const options = { type: "radio", name: "role", id, value };
    if (role === value) options.disabled = true;
    return options;
  };

  return (
    <form
      className="form role-form"
      onSubmit={(e) =>
        submitHandler(e, [adminRef, pmRef, devRef], selectedUser)
      }
    >
      <h4 className="form__heading" style={{ marginBottom: "1rem" }}>
        Changing Role Of {selectedUser.name}
      </h4>

      <div className="role-control">
        <input
          {...inputOptions(selectedUser.role, "admin", "admin")}
          ref={adminRef}
        />
        <label htmlFor="admin">
          <div className="custom-radio" style={{ marginRight: "0.5rem" }}></div>
          Admin
        </label>
      </div>

      <div className="role-control">
        <input
          {...inputOptions(selectedUser.role, "pm", "project manager")}
          ref={pmRef}
        />
        <label htmlFor="pm">
          <div className="custom-radio" style={{ marginRight: "0.5rem" }}></div>
          Project Manager
        </label>
      </div>

      <div className="role-control">
        <input
          {...inputOptions(selectedUser.role, "dev", "developer")}
          ref={devRef}
        />
        <label htmlFor="dev">
          <div className="custom-radio" style={{ marginRight: "0.5rem" }}></div>
          Developer
        </label>
      </div>

      <div className="btn-actions" style={{ marginTop: "1.15rem" }}>
        <button className="btn btn--err" onClick={() => setOpenModal(false)}>
          Cancel
        </button>
        <button className="btn" type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default RoleForm;
