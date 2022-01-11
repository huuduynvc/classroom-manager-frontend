import { GradeState } from "features/grade/gradeSlide";
import React, { useEffect,useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getPoints } from "features/point/pointThunk";
import { StoreState } from "models";
import { PointState } from "features/point/pointSlide";
import MyProgress from "components/MyProgress";
import { Button, Switch } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';



const Point = ({ grade, classId }: { grade?: GradeState; classId?: string }) => {
  const dispatch = useDispatch();
  const points = useSelector((state: StoreState) => state.point);
  const [flag,setFlag] = useState(false)
  // useEffect(() => {
  //   dispatch(getPoints(classId));
  // }, [classId, dispatch,flag]);

  const onChange = (value:any) => {
    console.log(value)
  }
  const mapToArrayGridColDef: any = (points: PointState) => {
    const columns: GridColDef[] = [
      { field: "id", headerName: "STT", width: 120,
        editable: false, }, 
      { field: "studentid", headerName: "Student ID", width: 120,
        editable: true, },
      {
        field: "account",
        headerName: "Account",
        width: 250,
      },
      {
        field: "fullname",
        headerName: "Full Name",
      },
      {
        field: "ban",
        headerName: "Ban",
        renderCell:  (params:any) => {
          // dispatch here
          return <Switch onChange={() => onChange(params.row)} checked = {params.row.ban}/>
        }
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

  const rows = [{id:"1",studentid:"17123",account: "hd",fullname:"huynh duy",ban:true,createdtime:"17-08-2021"},
                {id:"2",studentid:"17124",account: "hd2",fullname:"huynh duy",ban:false,createdtime:"15-06-2021"},
                {id:"3",studentid:"17125",account: "hd3",fullname:"huynh duy",ban:false,createdtime:"01-07-2021"}]

  const changeFlag = () => {
      setFlag(!flag)
  }
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
          componentsProps={{ toolbar: { columns, rows, classId,changeFlag } }}
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