import React from "react";
import TicketChart from "./TicketChart";
const TicketStats = (props) => {
  const sortData = props.data.sort((a, b) => (a.name < b.name ? -1 : 1));
  return (
    <div className="ticket-stats">
      <h4 className="heading-4">
        Ticket By {props.label[0].toUpperCase() + props.label.slice(1)}
      </h4>
      <div className="ticket-stats__content">
        <TicketChart stats={sortData} />
        <ul className="ticket-stats__label">
          <li style={{ color: "#ff0033" }}>{sortData[0].name}</li>
          <li style={{ color: "#0088FE" }}>{sortData[1].name}</li>
          <li style={{ color: "#FFBB28" }}>{sortData[2].name}</li>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(TicketStats);
