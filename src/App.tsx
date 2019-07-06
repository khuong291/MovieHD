import * as React from "react";
import "antd/dist/antd.css";
import DashboardContainer from "./containers/DashboardContainer/DashboardContainer";
import AuthenticationContainer from "./containers/Authentication/AuthenticationContainer";
import { Router as BrowserRouter, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter history={createBrowserHistory()}>
        <Switch>
          <Route path="/login" exact component={AuthenticationContainer} />
          <Route path="/home" exact component={DashboardContainer} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
