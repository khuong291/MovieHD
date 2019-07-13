import * as React from "react";
import "antd/dist/antd.css";
import DashboardContainer from "./containers/DashboardContainer/DashboardContainer";
import AuthenticationContainer from "./containers/Authentication/AuthenticationContainer";
import { Switch, Route, Redirect } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            localStorage.getItem("token") ? (
              <Redirect to="/home" />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route path="/login" exact component={AuthenticationContainer} />
        <Route
          path="/home"
          component={() => {
            if (localStorage.getItem("token")) {
              return <DashboardContainer />;
            }
            return <Redirect to="/login" />;
          }}
        />
      </Switch>
    );
  }
}

export default App;
