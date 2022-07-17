import React, { useEffect, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllAdmins,
  fetchAllAdminCount,
} from "../store/actionCreator/itemAction";

const ChartAdminDiagram = () => {
  const dispatch = useDispatch();
  const [adminNames, setAdminNames] = useState([]);
  const [adminCount, setAdminCount] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState([]);

  const { adminLists, adminCounts } = useSelector((state) => state.clinic);

  useEffect(() => {
    dispatch(fetchAllAdmins());
    dispatch(fetchAllAdminCount());
  }, []);

  useEffect(() => {
    let color = [];
    const nameAdmins = adminLists.map((e, i) => {
      return e.name;
    });
    const adminChart = adminCounts.map((e, i) => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      color.push(`#${randomColor}`);
      return +e.count;
    });
    setAdminNames(nameAdmins);
    setAdminCount(adminChart);
    setBackgroundColor(color);
  }, [adminLists, adminCounts]);

  const data = {
    labels: adminNames,
    datasets: [
      {
        label: "Admin Chart",
        data: adminCount,
        backgroundColor: backgroundColor,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div style={{ width: 500, height: 500 }}>
      <Doughnut type="doughnut" data={data} />
    </div>
  );
};
export default ChartAdminDiagram;
