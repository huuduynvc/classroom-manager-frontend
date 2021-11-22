import React from "react";
import { Card, CardMedia, Typography } from "@mui/material";

const HeaderClass = ({name="Test"}) => {
  return (
    <Card sx={{ position: "relative" }}>
      <CardMedia
        component="img"
        height="194"
        image="/img.jpg"
        alt="Paella dish"
      />
      <Typography
        sx={{ position: "absolute",bottom: 5, fontWeight: 600, left:10 }}
        variant="h4"
        color="white"
      >
        {name}
      </Typography>
    </Card>
  );
};

export default HeaderClass;
