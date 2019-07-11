import * as React from "react";
import "antd/dist/antd.css";
import DashboardContainer from "./containers/DashboardContainer/DashboardContainer";
import AuthenticationContainer from "./containers/Authentication/AuthenticationContainer";
import { Switch, Route, Redirect } from "react-router-dom";
import { RootState } from "./reducers/root";
import { connect } from "react-redux";

const mapStateToProps = (state: RootState) => ({
  user: state.user
});

type StateProps = ReturnType<typeof mapStateToProps>;
type Props = StateProps;

class App extends React.Component<Props> {
  render() {
    let token = localStorage.getItem("token");
    if (this.props.user.token && this.props.user.token !== "") {
      token = this.props.user.token;
    }
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

export default connect(mapStateToProps)(App);
