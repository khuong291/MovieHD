import * as React from "react";
import "antd/dist/antd.css";
import DashboardContainer from "./containers/DashboardContainer/DashboardContainer";
import AuthenticationContainer from "./containers/Authentication/AuthenticationContainer";
import { Switch, Route, Redirect } from "react-router-dom";

class App extends React.Component {
  render() {
    const token = localStorage.getItem("token");
    const loggedIn = token && token !== "";
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            loggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />
          }
        />
        <Route path="/login" exact component={AuthenticationContainer} />
        <Route
          path="/home"
          exact
          component={() => {
            if (loggedIn) {
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
