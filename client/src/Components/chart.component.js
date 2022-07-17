import React, { useEffect, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDoctor,
  fetchAllDoctorCount,
} from "../store/actionCreator/itemAction";

const ChartDiagram = () => {
  const dispatch = useDispatch();
  const [doctorNames, setDoctorNames] = useState([]);
  const [doctorCount, setDoctorCount] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState([]);

  const { doctorLists, patientLists, adminLists, doctorCounts } = useSelector(
    (state) => state.clinic
  );

  useEffect(() => {
    dispatch(fetchAllDoctor());
    dispatch(fetchAllDoctorCount());
  }, []);

  useEffect(() => {
    let color = [];
    const nameDoctor = doctorLists.map((e, i) => {
      return e.name;
    });
    const doctorChart = doctorCounts.map((e, i) => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      color.push(`#${randomColor}`);
      return +e.count;
    });
    setDoctorNames(nameDoctor);
    setDoctorCount(doctorChart);
    setBackgroundColor(color);
  }, [doctorLists, doctorCounts]);

  const data = {
    labels: doctorNames,
    datasets: [
      {
        label: "Doctor Chart",
        data: doctorCount,
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
export default ChartDiagram;
