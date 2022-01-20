import React, { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "models";
import { PointState } from "features/point/pointSlide";
import MyProgress from "components/MyProgress";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { getClasses } from "features/admin/adminThunk";
import moment from "moment";



const Point = () => {
  const dispatch = useDispatch();
  const adminState = useSelector((state: StoreState) => state.admin);
  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  const mapToArrayGridColDef: any = (classes: PointState) => {
    const columns: GridColDef[] = [
      { field: "id", headerName: "STT", width: 120,
        editable: false, }, 
      { field: "classname", headerName: "Class Name", width: 120,
        editable: false, },
      { field: "code", headerName: "Code", width: 120,
        editable: false, },
      {
        field: "students",
        headerName: "Students Count",
        width: 250,
      },
      {
        field: "modification_time",
        headerName: "Created Time",
      },
    ];
    return columns;
  };

  const columns: GridColDef[] = mapToArrayGridColDef(adminState.classes);

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

  const rows = adminState.classes.map(ele => (
    {id:ele.id,classname:ele.classname,code:ele.code,students: 20,modification_time:moment(new Date(ele.modification_time)).format("DD-MM-YYYY")}
  ))
  
  return (
    <MyProgress
      // error={points.error}
      error={""}
      loading={adminState.loading}
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