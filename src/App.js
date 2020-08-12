import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import AppLayout from "./layouts/app";
import Login from "./routes/login";
import { getToken } from "./utils/auth";

function ProtectedRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        getToken() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
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
        <ProtectedRoute path="/panel">
          <AppLayout />
        </ProtectedRoute>
        <Redirect from="*" to="/panel" />
      </Switch>
    </Router>
  );
}

export default App;
