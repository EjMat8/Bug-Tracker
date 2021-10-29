import React from "react";

export const Card = ({ title, desc = "", children, className, style = "" }) => {
  const classes = className ? `${className} card` : "card";
  return (
    <div className={classes} style={{ ...style }}>
      <h3 className="card__heading">
        <span className="card__heading-title">{title}</span>
        {!!desc && <span className="card__heading-desc">{desc}</span>}
      </h3>
      <div className="card__content">{children}</div>
    </div>
  );
};
