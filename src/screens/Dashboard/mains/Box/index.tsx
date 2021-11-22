import React, { Suspense, useEffect } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MediaCard from "screens/Dashboard/components/MediaCard";
import { useHistory } from "react-router";
import { getAllClass } from "features/class/classThunk";
import { useDispatch, useSelector } from "react-redux";
import { ClassState } from "features/class/classSlide";
import CircularProgress from '@mui/material/CircularProgress';
import { StoreState } from "models";
import MyProgress from "components/MyProgress";

const Box = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const classState: ClassState = useSelector((state: StoreState) => state.class)
  useEffect(() => {
    (async () => {
      await dispatch(getAllClass())
    })()
  }, [dispatch])
  const handleClickImageClass = (id: number) => {
    history.push(`/class/${id}`)
  }

  return (
    <Suspense fallback={<CircularProgress />}>
      <MyProgress error={classState.error} loading={classState.loading}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {
            classState.list.map((ele) => 
              (<Grid key={ele.id} item xs={12} md={4} lg={3}>
                <MediaCard id={ele.id} name={ele.classname} img={ele.img!=null?ele.img:'/img.jpg'} onClick={handleClickImageClass} />
              </Grid>)
            )
          }
        </Grid>
      </Container> 
      </MyProgress> 
    </Suspense>
  );
};

export default Box;
