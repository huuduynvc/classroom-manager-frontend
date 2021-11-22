import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from 'screens/Dashboard/components/Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function ClassCard(props){
  return (
    <React.Fragment>
      <Title>{props.name}</Title>
      <Typography component="p" variant="h4">
        {props.teacher}
      </Typography>
      {/* <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography> */}
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}