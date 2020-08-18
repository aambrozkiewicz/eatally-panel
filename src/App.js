import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import PanelLayout from "./layouts/panel";
import Login from "./routes/login";
import { getToken } from "./utils/auth";

function ProtectedRoute({ children, loginPath, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        getToken() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: loginPath,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <ProtectedRoute path="/" loginPath="/login">
          <PanelLayout />
        </ProtectedRoute>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
