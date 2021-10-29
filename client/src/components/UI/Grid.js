import React from "react";

export const Grid = ({ tempCol, children }) => {
  const styleTempCol = tempCol;
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: styleTempCol || "1fr 1fr 1fr" }}
    >
      {children}
    </div>
  );
};
