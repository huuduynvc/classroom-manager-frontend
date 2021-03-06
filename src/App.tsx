import { ConnectedRouter } from "connected-react-router";
import React, { useContext, useEffect } from "react";
import {
  Switch,
  Route,
  Redirect,
  // Link
} from "react-router-dom";
import WrapperLayout from "screens/WrapperLayout";
import { history } from "utils";

import SignIn from "./screens/SignIn/index";
import Dasboard from "./screens/Dashboard";
import UserProfile from "./screens/UserProfile";
import Class from "./screens/Class";
import { AuthContext } from "context/AuthContext";
import { createAxiosResponseInterceptor } from "config/axios";
import { useDispatch } from "react-redux";
import NotFound from "screens/NotFound";
import Admin from "screens/Admin";
import Join from "screens/Join";

function App() {
  const { changeUser, user } = useContext(AuthContext);
  const dispatch = useDispatch();
  useEffect(() => {
    createAxiosResponseInterceptor(changeUser, dispatch);
  }, [user, dispatch, changeUser]);
  return (
    <ConnectedRouter history={history}>
      <Switch>
        {user?.id === "" ? (
          <>
            <Route path="/signin">
              <SignIn />
            </Route>{" "}
            <Route>
              <Redirect to="/signin" />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/error">
              <NotFound />
            </Route>
            {user?.role_user !== 1 ? (
              <>
                {" "}
                <Route path="/">
                  <WrapperLayout>
                    <Switch>
                      <Route exact path="/">
                        <Dasboard />
                      </Route>
                      <Route path="/profile">
                        <UserProfile />
                      </Route> 
                      <Route path="/join/:code/:role">
                        <Join />
                      </Route>
                      <Route path="/class/:id">
                        <Class />
                      </Route>
                      <Route>
                        <Redirect to="/error" />
                      </Route>
                    </Switch>
                  </WrapperLayout>
                </Route>{" "}
              </>
            ) : (
              <>
                <Route exact path="/">
                  <Redirect to="/admin" />
                </Route>
                <Route path="/admin">
                  <Admin />
                </Route>
              </>
            )}
          </>
        )}
      </Switch>
      {/* </div> */}
    </ConnectedRouter>
  );
}

// function PrivateRoute({ children, ...rest }:{children:React.ReactNode,rest:{
//   [x: string]: any;
// }}) {
//   return (
//     <Route
//       {...rest}
//       render={() =>
//         localStorage.todoApp_accessToken ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/signin",
//               // state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

export default App;
