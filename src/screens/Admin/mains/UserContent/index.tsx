import React, { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { StoreState, User } from "models";
import MyProgress from "components/MyProgress";
import { Switch } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { getUsers, updateUser } from "features/admin/adminThunk";
import moment from "moment";
import ConfirmUpdateOrBlock from "screens/Admin/components/ConfirmUpdateOrBlock";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";

const Point = () => {
  const dispatch = useDispatch();
  const adminState = useSelector((state: StoreState) => state.admin);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [userUpdate, setUserUpdate] = React.useState<any>(null);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const onChange = (value: any) => {
    setContent(`Do you want to ${value?.ban ? "unban" : "ban"} this user?`);
    const newUser: User = { ...value };
    newUser.ban = newUser?.ban ? false : true;
    setUserUpdate(newUser);
    setOpenConfirm(true);
  };
  const mapToArrayGridColDef: any = () => {
    const columns: GridColDef[] = [
      { field: "id", headerName: "STT", width: 120, editable: false },
      {
        field: "studentid",
        headerName: "Student ID",
        width: 120,
        editable: true,
      },
      {
        field: "username",
        headerName: "Username",
        width: 250,
      },
      {
        field: "email",
        headerName: "Email",
        width: 250,
      },
      {
        field: "ban",
        headerName: "Ban",
        renderCell: (params: any) => {
          // dispatch here
          return (
            <Switch
              onChange={() => onChange(params.row)}
              checked={params.row.ban}
            />
          );
        },
      },
      {
        field: "createdtime",
        headerName: "Created Time",
        renderCell: (params) => {
          return (
            <>
              {moment(new Date(params.row.creation_time)).format("DD-MM-YYYY")}
            </>
          );
        },
      },
    ];
    return columns;
  };

  const columns: GridColDef[] = mapToArrayGridColDef();

  const handleOk = async() => {
    try {
      const actionResult: any = await dispatch(updateUser({ user: userUpdate }));
      const currentData = unwrapResult(actionResult);
      if (currentData.status === 200 || currentData.status === 201) {
        toast.success("Update profile successfully");
        await dispatch(getUsers());
      } else {
        toast.error("Error update profile");
      }
    } catch (err) {
      toast.error("Error update profile");
    }
    setOpenConfirm(false)
        
  };

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
  return (
    <MyProgress
      // error={points.error}
      error={""}
      loading={adminState.loading}
    >
      <>
        <ConfirmUpdateOrBlock
          title="Are you sure?"
          handleOk={handleOk}
          setOpen={setOpenConfirm}
          open={openConfirm}
          content={content}
        />
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            onCellEditCommit={(value: any) => {
              setContent(
                `Do you want to mapping this user with student id ${value.value}?`
              );
              // const newUser: User = value;
              const cloneUser:any = {id:"",studentid:""};
              cloneUser.studentid = value.value;
              cloneUser.id = value.id
              setUserUpdate(cloneUser);
              setOpenConfirm(true);
            }}
            rows={adminState.users}
            columns={columns}
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        </div>
      </>
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
