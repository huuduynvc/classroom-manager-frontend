import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import SignIn from "./components/SignIn/index";
import Dasboard from "./screens/Dashboard";

function App() {
  return (
    <Router>
      {/* <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Todo App</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav> */}

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        {/* <Route path="/login" render={() => <Login />} /> */}
        <Route path="/signin">
          <SignIn />
        </Route>
        {/* <Route path="/404">
          <Redirect to="/login" />
        </Route> */}
        <Route path="/">
          <Dasboard />
          {/* <Main classData={[]}/> */}
        </Route>
        {/* <PrivateRoute path="/">
          <Todo />
        </PrivateRoute> */}
      </Switch>
      {/* </div> */}
    </Router>
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
