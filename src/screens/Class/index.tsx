import React, { useEffect } from "react";
import HeaderClass from "./mains/HeaderClass";
import BodyClass from "./mains/BodyClass";
import {
  Route,
  Switch,
  Redirect,
  useParams,
} from "react-router-dom";
import PageRoute from "./components/PageRoute";
import PeoplePage from './mains/PeoplePage/index';

import { useDispatch, useSelector } from "react-redux";
import { ClassState } from "features/class/classSlide";
import { StoreState } from "models";
import { getClassById } from "features/class/classThunk";
import ClassWork from "./mains/ClassWork";
import { getGradeByClassId } from "features/grade/gradeThunk";
import { GradeState } from "features/grade/gradeSlide";
import Point from "./mains/Point";

const Class = () => {

  const params: { id: string } = useParams();
  const dispatch = useDispatch()
  const classState: ClassState = useSelector((state: StoreState) => state.class)
  const gradeState: GradeState = useSelector((state: StoreState) => state.grade)
  useEffect(() => {
    (async () => {
      await Promise.all([dispatch(getClassById(params.id)),dispatch(getGradeByClassId(params.id))])
    })()
  }, [dispatch, params.id])


  return (
    <>
      <PageRoute />
      <div style={{ margin: "0rem 6rem" }}>
        <Switch>
          <Route path={`/class/${params.id}/detail`}>
            <HeaderClass name={classState.currentClass['classname']} />
            <BodyClass grade={gradeState} code={classState.currentClass['code']} />
          </Route>
          <Route exact path={`/class/${params.id}/list`}>
            <PeoplePage id={params.id} />
          </Route>
          <Route exact path={`/class/${params.id}/classwork`}>
            <ClassWork classId={params.id} grade={gradeState}/>
          </Route>
          <Route exact path={`/class/${params.id}/point`}>
            <Point classId={params.id} grade={gradeState}/>
          </Route>
          <Route>
            <Redirect to={`/class/${params.id}/detail`} />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default Class;
