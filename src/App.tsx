import { ConnectedRouter } from "connected-react-router";
import React from "react";
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

function App() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/error">
          <h1>ERROR PAGE</h1>
        </Route>
        <Route path="/">
          <WrapperLayout>
            <Switch>
              <Route exact path="/">
                <Dasboard />
              </Route>
              <Route path="/profile">
                <UserProfile />
              </Route>
              <Route path="/class/:id">
                <Class />
              </Route>
              <Route>
                <Redirect to = "/error"/>
              </Route>
            </Switch>
          </WrapperLayout>
        </Route>
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
