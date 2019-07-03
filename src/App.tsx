import * as React from "react";
import "antd/dist/antd.css";
import DashboardContainer from "./containers/DashboardContainer/DashboardContainer";

class App extends React.Component {
  render() {
    return (
      <div>
        <DashboardContainer />
      </div>
    );
  }
}

export default App;
