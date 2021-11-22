import React from "react";
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

const Class = () => {

  const params: { id: string } = useParams();
  return (
    <>
      <PageRoute />
      <div style={{ margin: "0rem 6rem" }}>
        <Switch>
          <Route path={`/class/${params.id}/detail`}>
            <HeaderClass />
            <BodyClass />
          </Route>
          <Route exact path={`/class/${params.id}/list`}>
            <PeoplePage />
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
