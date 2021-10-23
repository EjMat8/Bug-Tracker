import React, { useState, useEffect } from "react";
import TicketStats from "../components/Dashboard/TicketStats";
const groupData = (data) =>
  data.reduce((accu, el) => {
    const existingEl = accu.find((el2) => el2.categ === el.categ);
    if (existingEl) {
      existingEl.data.push({ name: el._id, value: el.numDocs });
      return [
        ...accu.filter((el3) => el3.categ !== existingEl.categ),
        existingEl,
      ];
    }
    return [
      ...accu,
      { categ: el.categ, data: [{ name: el._id, value: el.numDocs }] },
    ];
  }, []);
const DashboardPage = () => {
  const [stuff, setStuff] = useState([]);
  useEffect(() => {
    fetch("/api/tickets/stats")
      .then((res) => res.json())
      .then((data) => {
        setStuff(groupData(data.data.stats));
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="dashboard">
      {stuff.map((el) => (
        <TicketStats key={el.categ} label={el.categ} data={el.data} />
      ))}
    </div>
  );
};

export default DashboardPage;
