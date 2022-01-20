import { GradeState } from "features/grade/gradeSlide";
import React, { useContext, useEffect,useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CustomToolbar from "screens/Class/components/CustomToolbar";
import { useDispatch, useSelector } from "react-redux";
import { getPoints } from "features/point/pointThunk";
import { StoreState } from "models";
import { PointState } from "features/point/pointSlide";
import MyProgress from "components/MyProgress";
import { Button } from "@mui/material";
import { AuthContext } from "context/AuthContext";

const renderDetailsButton = (params) => {
  return (
    <strong>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={() => {
          console.log("aaaa");
        }}
      >
        More Info
      </Button>
    </strong>
  );
};


const Point = ({ grade, classId }: { grade: GradeState; classId: string }) => {
  const dispatch = useDispatch();
  const points = useSelector((state: StoreState) => state.point);
  const {user} = useContext(AuthContext)
  const [flag,setFlag] = useState(false)
  useEffect(() => {
    dispatch(getPoints(classId));
  }, [classId, dispatch,flag]);
  const mapToArrayGridColDef: any = (points: PointState) => {
    const columns: GridColDef[] = [
      { field: "id", headerName: "ID", width: 120 },
      {
        field: "fullName",
        headerName: "Full name",
        width: 250,
        editable: false,
      },
    ];
    points.points[0]?.grades.map((ele) => {
      columns.push({
        field: ele.toString(),
        headerName: ele.toString(),
        type: "number",
        width: 250,
        editable: user?.role_member===1?true:false,
      });
      return null
    });
    columns.push({
      field: "totalgrades",
      headerName: "Total Grades",
      type: "number",
      width: 150,
      editable: false,
      // renderCell: renderDetailsButton
    });
    return columns;
  };
  const columns: GridColDef[] = mapToArrayGridColDef(points);

  const rows = points.points.map((ele,inx) => {
    const row = { id: ele.studentid, fullName: ele.fullname };
    let totalgrades = 0;
    const grades = points.points[inx].grades
    ele.points.map((elePoints,index) => {
      totalgrades += elePoints;
      row[grades[index]] = elePoints;
      return row
    });
    row["totalgrades"] = totalgrades;
    return row;
  });

  const changeFlag = () => {
      setFlag(!flag)
  }
  const handleRowEditStop:any = (
    params,
    event,
  ) => {
    console.log(params)
  };
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
          onCellEditCommit={handleRowEditStop}
          componentsProps={{ toolbar: { columns, rows, classId,changeFlag } }}
        />
      </div>
    </MyProgress>
  );
};

export default Point;
