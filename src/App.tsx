import * as React from "react";
import "antd/dist/antd.css";
import DashboardContainer from "./containers/DashboardContainer/DashboardContainer";
import AuthenticationContainer from "./containers/Authentication/AuthenticationContainer";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { saveGenresAsync } from "./actions/genres";
import { Dispatch } from "redux";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveGenresAsync: () => saveGenresAsync()(dispatch)
});

type MapDispatchToProps = {
  saveGenresAsync: () => void;
};

type Props = MapDispatchToProps;

const App: React.SFC<Props> = props => {
  React.useEffect(() => {
    props.saveGenresAsync();
  }, []);

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
      <Route path="/register" exact component={AuthenticationContainer} />
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
};

export default connect<undefined, MapDispatchToProps>(
  undefined,
  mapDispatchToProps
)(App);
