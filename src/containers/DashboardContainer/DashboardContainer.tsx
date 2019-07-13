import * as React from "react";
import { Layout, Menu, Icon } from "antd";
import Avatar from "./components/Avatar";
import PopularContainer from "../Popular/PopularContainer";
import GenresContainer from "../Genres/GenresContainer";
import { ContentWrapper } from "./DashboardContainerStyles";
import { SelectParam } from "antd/lib/menu";
import {
  RouteComponentProps,
  withRouter,
  Switch,
  Route,
  Redirect
} from "react-router";
import { connect } from "react-redux";
import { clearUser, saveUser } from "src/actions/user";
import { getProfile } from "src/apis/auth";
import { RootState } from "src/reducers/root";

const { Sider } = Layout;

const MenuType = Object.freeze({
  POPULARS: "home/populars",
  FAVORITES: "home/favorites",
  SEARCH: "home/search",
  GENRES: "home/genres",
  LOGOUT: "logout"
});

const mapStateToProps = (state: RootState) => ({
  user: state.user
});

const mapDispatchToProps = {
  saveUser,
  clearUser
};

type StateProps = ReturnType<typeof mapStateToProps>;
type MapDispatchToProps = typeof mapDispatchToProps;

type Props = RouteComponentProps & StateProps & MapDispatchToProps & {};

type State = {
  collapsed: boolean;
  selectedKey: string;
};

class DashboardContainer extends React.Component<Props, State> {
  state = {
    collapsed: false,
    selectedKey: MenuType.POPULARS
  };

  async componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    const user = await getProfile();
    this.props.saveUser(user);
  }

  resize = () => {
    this.setState({ collapsed: window.innerWidth <= 760 });
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  onSelectItem = (selectParam: SelectParam) => {
    const { history } = this.props;
    if (selectParam.key === MenuType.LOGOUT) {
      localStorage.setItem("token", "");
      this.props.clearUser();
      history.replace("/login");
      return;
    }
    history.push(`/${selectParam.key}`);
    this.setState({
      selectedKey: selectParam.key
    });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ height: "100vh", position: "relative" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Avatar collapsed={collapsed} />
          <Menu
            theme="dark"
            defaultSelectedKeys={[MenuType.POPULARS]}
            mode="inline"
            onSelect={this.onSelectItem}
          >
            <Menu.Item key={MenuType.POPULARS}>
              <Icon type="star" />
              <span>Populars</span>
            </Menu.Item>
            <Menu.Item key={MenuType.FAVORITES}>
              <Icon type="heart" />
              <span>Favorites</span>
            </Menu.Item>
            <Menu.Item key={MenuType.SEARCH}>
              <Icon type="search" />
              <span>Search</span>
            </Menu.Item>
            <Menu.Item key={MenuType.GENRES}>
              <Icon type="table" />
              <span>Genres</span>
            </Menu.Item>
            <Menu.Item
              key={MenuType.LOGOUT}
              style={{ position: "absolute", bottom: 45 }}
            >
              <Icon type="poweroff" />
              <span>SIGN OUT</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <ContentWrapper>
            <Switch>
              <Route
                path="/home"
                exact
                component={() => <Redirect to="/home/populars" />}
              />
              <Route path="/home/populars" exact component={PopularContainer} />
              <Route
                path="/home/favorites"
                exact
                component={() => <div>favorites</div>}
              />
              <Route
                path="/home/search"
                exact
                component={() => <div>search</div>}
              />
              <Route path="/home/genres" exact component={GenresContainer} />
            </Switch>
          </ContentWrapper>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DashboardContainer));
