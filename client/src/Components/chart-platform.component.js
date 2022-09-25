import React, { useEffect, useRef, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart, getElementAtEvent } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import {
  fetchAllCountPlatform,
} from "../store/actionCreator/itemAction";

const ChartPlatformDiagram = () => {
  const dispatch = useDispatch();
  const chartRef = useRef();

  const { platformCount } = useSelector(
    (state) => state.clinic
  );

  useEffect(() => {
    dispatch(fetchAllCountPlatform());
  }, []);

  const columns = [
    { field: "id", headerName: "Number", width: 70 },
    { field: "platform", headerName: "Platform Name", width: 150 },
    { field: "value", headerName: "Income", width: 150 },
  ];

  return (
    <>
      Platform Income
      <div style={{ marginLeft: 50, height: 400, width: 500 }}>
        <DataGrid
          rows={platformCount || []}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
};
export default ChartPlatformDiagram;

