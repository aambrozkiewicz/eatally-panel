import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from './routes/login';
import AppLayout from './layouts/app';
import {getToken} from './utils/auth';

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
                state: { from: location }
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
