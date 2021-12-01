import React, { useEffect, useState } from "react";
import DndComponent from "./../../components/DndComponent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SvgButton from "components/SvgButton";
import BackupIcon from "@mui/icons-material/Backup";
import Tooltip from "@mui/material/Tooltip";
import { Assignment } from "models";
import AssignmentDialog from "screens/Class/components/AssignmentDialog";
import { GradeState } from "features/grade/gradeSlide";
import MyProgress from "components/MyProgress";
import { useDispatch } from "react-redux";
import { updateGradeByClassId } from "features/grade/gradeThunk";
import moment from "moment"

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ClassWork = ({
  grade,
  classId,
}: {
  grade: GradeState;
  classId: string;
}) => {
  const { assignments } = grade;
  const [items, setItems] = useState(assignments);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  let currentID =
    assignments.length > 0
      ? assignments.reduce((a, b) => (a.id > b.id ? a : b)).id
      : 0;

  useEffect(() => {
    setItems(assignments);
  }, [assignments]);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    setItems(
      reorder(items, result.source.index, result.destination.index) as any
    );
  };
  const handleChangeDue = (index: number, newValue: any) => {
    const newItems = [...items];
    console.log(newValue)
    newItems[index].deadline = newValue.target?.value?newValue.target.value:newValue;
    setItems(newItems);
  };
  const handleChangeName = (index: number, newName: any) => {
    const newItems = [...items];
    newItems[index].name = newName.target.value;
    setItems(newItems);
  };
  const handleChangePoint = (index: number, newPoint: any) => {
    const newItems = [...items];
    newItems[index].point = newPoint.target.value;
    setItems(newItems);
  };

  const handleEdit = (index: number, edit: boolean) => {
    let newItems = items.map((item) => Object.assign({}, item));
    newItems[index].edit = edit;
    setItems(newItems);
  };
  const handleDelete = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleAddAssignment = () => {
    setOpen(!open);
  };

  const handleCreate = (title, point, due) => {
    const newItems: Assignment[] = [
      ...items,
      { name: title, point, deadline: due, id: ++currentID, edit: false },
    ];
    setItems(newItems);
    handleAddAssignment();
  };
  // call API update
  const handleUpdateGrade = () => {
      console.log(items)
    let newItems = items.map((item) =>
      Object.assign(
        {},
        {
          id: item.id,
          id_class: item.id_class,
          name: item.name,
          point: item.point,
          deadline:  moment(item.deadline).format('YYYY-MM-DD HH:mm:ss'),
        }
      )
    );
    dispatch(updateGradeByClassId({ id: classId, assignments: newItems }));
  };
  return (
    <div style={{ margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SvgButton onClick={handleAddAssignment}>Add Assignment</SvgButton>
        <Tooltip title="Update">
          <IconButton
            onClick={handleUpdateGrade}
            color="primary"
            aria-label="add to shopping cart"
          >
            <BackupIcon />
          </IconButton>
        </Tooltip>
      </div>
      <br />
      <Divider />
      <br />
      <MyProgress error={grade.error} loading={grade.loading}>
        <>
          <DndComponent
            handleDelete={handleDelete}
            handleChangeName={handleChangeName}
            handleChangePoint={handleChangePoint}
            handleChangeDue={handleChangeDue}
            handleEdit={handleEdit}
            items={items}
            onDragEnd={onDragEnd}
          />
          <AssignmentDialog
            handleCreate={handleCreate}
            open={open}
            handleClose={handleAddAssignment}
          />
        </>
      </MyProgress>
    </div>
  );
};

export default ClassWork;
