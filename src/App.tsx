import * as React from "react";
import "antd/dist/antd.css";
import DashboardContainer from "./containers/DashboardContainer/DashboardContainer";
import { Router as BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter history={createBrowserHistory()}>
        <DashboardContainer />
      </BrowserRouter>
    );
  }
}

export default App;
