import React, { useEffect, useRef, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart, getElementAtEvent } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import {
  fetchAllPatients,
  fetchAllPatientCount,
  fetchAllPatientFirst,
} from "../store/actionCreator/itemAction";

const ChartPatientDiagram = () => {
  const dispatch = useDispatch();
  const [doctorNames, setDoctorName] = useState([]);
  const [clientCount, setClientCount] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState([]);
  const [dataPatientsShowOnTable, setDataPatientsShowOnTable] = useState([]);
  const [selectedChart, setSelectedChart] = useState(NaN);
  const chartRef = useRef();

  const { patientLists, patientCounts, patientFirst } = useSelector(
    (state) => state.clinic
  );

  useEffect(() => {
    dispatch(fetchAllPatients());
    dispatch(fetchAllPatientCount());
    dispatch(fetchAllPatientFirst());
  }, []);

  useEffect(() => {
    let color = [];
    let doctorNameFirst = [];
    let patientChart = [];
    for (const key in patientFirst) {
      doctorNameFirst.push(key);
    }
    for (const key in patientFirst) {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      color.push(`#${randomColor}`);
      patientChart.push(patientFirst[key].length);
    }
    setDoctorName(doctorNameFirst);
    setClientCount(patientChart);
    setBackgroundColor(color);
  }, [patientFirst]);

  useEffect(() => {
    const patientsShowOnTable = [];
    patientFirst[doctorNames[selectedChart]]?.forEach((e) => {
      patientsShowOnTable.push(e.Visitor);
    });
    console.log(patientsShowOnTable);
    setDataPatientsShowOnTable(patientsShowOnTable || []);
  }, [selectedChart]);

  const data = {
    labels: doctorNames,
    datasets: [
      {
        label: "Patient Chart",
        data: clientCount,
        backgroundColor: backgroundColor,
        hoverOffset: 4,
      },
    ],
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
  ];

  return (
    <>
      <div style={{ width: 500, height: 500 }}>
        <Doughnut
          ref={chartRef}
          onClick={(evt) => {
            const selectedBar = getElementAtEvent(chartRef.current, evt);
            setSelectedChart(selectedBar[0].index);
          }}
          type="doughnut"
          data={data}
        />
      </div>
      Разовые клиенты доктор {doctorNames[selectedChart]}
      <div style={{ marginLeft: 50, height: 400, width: 500 }}>
        <DataGrid
          rows={dataPatientsShowOnTable}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
};
export default ChartPatientDiagram;
