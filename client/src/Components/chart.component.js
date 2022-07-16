import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDoctor } from "../store/actionCreator/itemAction";

const ChartDiagram = () => {
  const dispatch = useDispatch();
  const [dataChart, setDataChart] = useState([]);

  const { doctorLists, patientLists, adminLists } = useSelector(
    (state) => state.clinic
  );

  useEffect(() => {
    dispatch(fetchAllDoctor());
  }, []);

  useEffect(() => {
    console.log("EJEJEJEJE");
    setDataChart(doctorLists);
    
  }, [doctorLists]);

  const labels = ["0", "1", "3", "4", "5", "6", "7"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
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
        borderWidth: 1,
      },
      {
        label: "My Second Dataset",
        data: [33, 12, 23, 43, 12, 21, 12],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
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
        borderWidth: 1,
      },
    ],
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
export default ChartDiagram;
