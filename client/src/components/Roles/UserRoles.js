import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

const UserRoles = ({
  name,
  email,
  role,
  id,
  setOpenModal,
  setSelectedUserId,
}) => {
  const onEditHandler = () => {
    setOpenModal(true);
    setSelectedUserId(id);
  };
  return (
    <React.Fragment>
      <p className="grid__data">{name}</p>
      <p className="grid__data">{email}</p>
      <p className="grid__data grid__action">
        {role}
        <AiOutlineEdit className="grid__edit" onClick={onEditHandler} />
      </p>
    </React.Fragment>
  );
};

export default React.memo(UserRoles);
