import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import "./style.css"

const CardCustomized = styled(Card)`
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

export default function MediaCard({
  name = "test",
  detail = `Lizards are a widespread group of squamate reptiles, with over 6,000
species, ranging across all continents except Antarctica`,
  id = 1,
  onClick,
  img="/img.jpg"
}: {
  name?: string;
  detail?: string;
  id?: number;
  onClick: (id: number) => void;
  img?:string
}) {
  return (
    <CardCustomized sx={{ maxWidth: 345 }}>
      <div className="hover-cursor" onClick={() => onClick(id)}>
        <CardMedia
          component="img"
          height="140"
          image={img===""?"/img.jpg":img}
          alt="green iguana"
        />
      </div>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {detail}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </CardCustomized>
  );
}
