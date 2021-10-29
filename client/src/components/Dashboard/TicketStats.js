import React from "react";
import TicketChart from "./TicketChart";
const TicketStats = (props) => {
  return (
    <div className="ticket-stats">
      <h4 className="heading-4">
        Ticket By {props.label[0].toUpperCase() + props.label.slice(1)}
      </h4>
      <div className="ticket-stats__content">
        <TicketChart stats={props.data} />
        <ul className="ticket-stats__label">
          <li style={{ color: "#0088FE" }}>{props.data[0].name}</li>
          <li style={{ color: "#ff0033" }}>{props.data[1].name}</li>
          <li style={{ color: "#FFBB28" }}>{props.data[2].name}</li>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(TicketStats);
