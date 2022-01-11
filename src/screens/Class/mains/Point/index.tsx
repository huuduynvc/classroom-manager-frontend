import { GradeState } from "features/grade/gradeSlide";
import React, { useEffect,useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CustomToolbar from "screens/Class/components/CustomToolbar";
import { useDispatch, useSelector } from "react-redux";
import { getPoints } from "features/point/pointThunk";
import { StoreState } from "models";
import { PointState } from "features/point/pointSlide";
import MyProgress from "components/MyProgress";
import { Button } from "@mui/material";

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

const mapToArrayGridColDef: any = (points: PointState) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120 },
    {
      field: "fullName",
      headerName: "Full name",
      width: 250,
      editable: true,
    },
  ];
  points.points[0]?.points.map((ele) => {
    columns.push({
      field: ele.grade,
      headerName: ele.gradeName,
      type: "number",
      editable: true,
      renderCell: renderDetailsButton
    });
    return null;
  });
  columns.push({
    field: "totalgrades",
    headerName: "Total Grades",
    type: "number",
    width: 150,
    editable: false,
    resizable: true,
    renderCell: renderDetailsButton
  });
  return columns;
};
const Point = ({ grade, classId }: { grade: GradeState; classId: string }) => {
  const dispatch = useDispatch();
  const points = useSelector((state: StoreState) => state.point);
  const [flag,setFlag] = useState(false)
  useEffect(() => {
    dispatch(getPoints(classId));
  }, [classId, dispatch,flag]);

  const columns: GridColDef[] = mapToArrayGridColDef(points);

  const rows = points.points.map((ele) => {
    const row = { id: ele.id, fullName: ele.username };
    let totalgrades = 0;
    ele.points.map((elePoints) => {
      totalgrades += elePoints.point;
      row[elePoints.grade] = elePoints.point;
      return row
    });
    row["totalgrades"] = totalgrades;
    return row;
  });

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
