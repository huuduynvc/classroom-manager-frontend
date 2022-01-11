import { GradeState } from "features/grade/gradeSlide";
import React, { useEffect,useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getPoints } from "features/point/pointThunk";
import { StoreState } from "models";
import { PointState } from "features/point/pointSlide";
import MyProgress from "components/MyProgress";
import {  Switch } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';



const Point = () => {
  const dispatch = useDispatch();
  const points = useSelector((state: StoreState) => state.point);
  // useEffect(() => {
  //   dispatch(getPoints(classId));
  // }, [classId, dispatch,flag]);

  const mapToArrayGridColDef: any = (points: PointState) => {
    const columns: GridColDef[] = [
      { field: "id", headerName: "STT", width: 120,
        editable: false, }, 
      { field: "classname", headerName: "Class Name", width: 120,
        editable: false, },
      {
        field: "students",
        headerName: "Students Count",
        width: 250,
      },
      {
        field: "createdtime",
        headerName: "Created Time",
      },
    ];
    return columns;
  };

  const columns: GridColDef[] = mapToArrayGridColDef(points);

  // const rows = points.points.map((ele) => {
  //   const row = { id: ele.id, fullName: ele.username };
  //   let totalgrades = 0;
  //   ele.points.map((elePoints) => {
  //     totalgrades += elePoints.point;
  //     row[elePoints.grade] = elePoints.point;
  //     return row
  //   });
  //   row["totalgrades"] = totalgrades;
  //   return row;
  // });

  const rows = [{id:"1",classname:"17123",students: 20,createdtime:"17-08-2021"},
                {id:"2",classname:"17124",students: 15,createdtime:"15-06-2021"},
                {id:"3",classname:"17125",students: 17,createdtime:"01-07-2021"}]

  return (
    <MyProgress
      // error={points.error}
      error={""}
      loading={points.loading}
    >
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
    </MyProgress>
  );
};

export default Point;


function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
}