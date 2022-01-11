import React from "react";
import AdminDrawer from "./mains/AdminDrawer";
import Content from "./mains/AdminContent";
import { Redirect, Route, Switch } from "react-router";
import ClassContent from "./mains/ClassContent";
import UserContent from "./mains/UserContent";

const Admin = () => {
  return (
    <div>
      <AdminDrawer>
        <Switch>
          <Route path="/admin/list-admins">
            <Content />
          </Route>
          <Route path="/admin/list-users">
            <UserContent />
          </Route>
          <Route path="/admin/list-classes">
            <ClassContent />
          </Route>
          <Route>
            <Redirect to="/admin/list-admins" />
          </Route>
        </Switch>
      </AdminDrawer>
    </div>
  );
};

export default Admin;
