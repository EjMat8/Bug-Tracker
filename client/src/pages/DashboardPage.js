import React, { useState, useEffect, useCallback } from "react";
import TicketStats from "../components/Dashboard/TicketStats";
import useHttp from "../hooks/useHttp";
import Spinner from "../components/UI/Spinner";
const groupData = (data) => {
  if (!data) return [];
  return data.reduce((accu, el) => {
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
};
const DashboardPage = () => {
  const [stuff, setStuff] = useState([]);
  const { isLoading, error, sendReq } = useHttp();

  const transformData = useCallback((data) => {
    setStuff(groupData(data.data.stats));
  }, []);
  useEffect(() => {
    sendReq("/api/tickets/stats", { method: "GET" }, transformData);
  }, [sendReq, transformData]);
  if (!stuff.length || isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Spinner />
      </div>
    );
  console.log(stuff);
  return (
    <div className="dashboard">
      {stuff
        .sort((a, b) => (a.categ < b.categ ? -1 : 1))
        .map((el) => (
          <TicketStats key={el.categ} label={el.categ} data={el.data} />
        ))}
    </div>
  );
};

export default DashboardPage;
