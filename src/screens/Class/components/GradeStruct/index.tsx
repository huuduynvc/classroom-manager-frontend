import React from "react";
import Link from "@mui/material/Link";
import { useLocation, useHistory } from "react-router-dom";
import { GradeState } from "features/grade/gradeSlide";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const GradeStuct = ({ grade }: { grade: GradeState }) => {
  const location = useLocation();
  const history = useHistory();
  const id = location.pathname.split("/")[2];
  return (
    <div>
      <h5>Grade Stuct</h5>
      {grade.loading ? (
        <Box sx={{ display: "flex",justifyContent:'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <h3
            style={{ color: "#1967d2", fontSize: 16, wordWrap: "break-word" }}
          >
            {grade.assignments?.map((assignment) => {
              return (
                <div
                  key={assignment.id}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>{assignment.name}</p>
                  <p>{assignment.point}</p>
                </div>
              );
            })}
          </h3>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link
              onClick={(e) => {
                e.preventDefault();
                history.push(`/class/${id}/classwork`);
              }}
              underline="hover"
              href={`/class/${id}/classwork`}
            >
              View all
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default GradeStuct;
