import React from "react";

const RoleForm = ({ selectedUser, setOpenModal }) => {
  return (
    <form className="form" style={{ padding: "1.4rem" }}>
      <h4 className="form__heading" style={{ marginBottom: "1rem" }}>
        Changing Role Of {selectedUser.name}
      </h4>
      <div className="role-control">
        <input type="radio" name="role" id="pm" value="project manager" />

        <label htmlFor="pm">
          <div className="custom-radio" style={{ marginRight: "0.5rem" }}></div>{" "}
          Project Manager
        </label>
      </div>

      <div className="role-control">
        <input type="radio" name="role" id="dev" value="developer" />

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
          Okay
        </button>
      </div>
    </form>
  );
};

export default RoleForm;
