import React, { useState } from "react";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { CsvBuilder } from "filefy";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import { useDispatch } from "react-redux";
import { getPoints, saveChangeGrades } from "features/point/pointThunk";
import { LoadingButton } from "@mui/lab";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import DialogImport from "../DialogImport";
import { importExcelGrades } from "features/upload/uploadThunk";

const CustomToolbar = ({
  columns,
  rows,
  classId,
  changeFlag
}: {
  columns: any;
  rows: any;
  classId: string;
  changeFlag:any
}) => {
  const dispatch = useDispatch();
  const [open,setOpen] = useState(false);
  const exportTemplate = () => {
    const columnTitles = columns.map((columnDef) => columnDef.headerName);
    const builder = new CsvBuilder(`grades_template_${classId}.csv`)
      .setColumns(columnTitles)
      .exportFile();

    return builder;
  };
  const saveChange = async () => {
    const columnTitles = columns.map((columnDef) => columnDef.headerName);
    const csvData = rows.map((rowData) =>
      columns.map((columnDef) => rowData[rowData.field])
    );
    try {
      const resultAction:any = await dispatch(
        saveChangeGrades({ classId, columns: columnTitles, rows: csvData })
      );
      unwrapResult(resultAction)
      const resultAction1:any = await dispatch(getPoints(classId));
      unwrapResult(resultAction1)
    } catch (e) {
        toast.error("Error when update grades")
    }
  };

  const importGrades = async () => {
    setOpen(true)
  };
  
  return (
      <>
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        csvOptions={{ fileName: `grades_${classId}` }}
        printOptions={{ disableToolbarButton: true }}
      />
      <Button onClick={exportTemplate}>
        <FileDownloadIcon /> Export template
      </Button>
      <LoadingButton onClick={saveChange}>
        <PublishIcon /> Save change
      </LoadingButton>
      <LoadingButton onClick={importGrades}>
        <PublishIcon /> Import Grades
      </LoadingButton>
    </GridToolbarContainer>
    <DialogImport callback={() =>changeFlag()} title="grades" importDispatch={importExcelGrades} classid={classId} open={open} handleClose={() => setOpen(false)} />
           
    </>
  );
};

export default CustomToolbar;
