import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdmins } from "../store/actionCreator/itemAction";

const ChartAdminDiagram = () => {
  const dispatch = useDispatch();
  const [dataChart, setDataChart] = useState([]);

  const { doctorLists, patientLists, adminLists } = useSelector(
    (state) => state.clinic
  );

  useEffect(() => {
    dispatch(fetchAllAdmins());
  }, []);

  useEffect(() => {
    const chartList = [];
    adminLists.forEach((e, i) => {
      chartList.push({
        label: e.name,
        data: [
          10 + i * 10,
          30 + i * 10,
          89 + i * 10,
          43 + i * 10,
          78 + i * 10,
          43 + i * 10,
          40 + i * 10,
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 2,
      });
    });
    setDataChart(chartList);
  }, [adminLists]);

  const labels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"];
  const data = {
    labels: labels,
    datasets: dataChart,
  };

  return (
    <Line
      type="bar"
      width={160}
      height={60}
      options={{
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
      data={data}
    />
  );
};
export default ChartAdminDiagram;
