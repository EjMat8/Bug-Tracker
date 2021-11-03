import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#ff0033", "#0088FE", "#FFBB28"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function TicketChart({ stats }) {
  return (
    <PieChart width={210} height={210}>
      <Pie
        data={stats}
        labelLine={false}
        outerRadius={95}
        fill="#fff"
        dataKey="value"
        label={renderCustomizedLabel}
      >
        {stats.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
