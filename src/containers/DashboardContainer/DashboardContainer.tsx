import * as React from "react";
import { Layout, Menu, Icon } from "antd";
import Avatar from "./components/Avatar";
import PopularContainer from "../Popular/PopularContainer";
import GenresContainer from "../Genres/GenresContainer";
import SearchContainer from "../Search/SearchContainer";
import MovieDetailContainer from "../MovieDetail/MovieDetailContainer";
import { ContentWrapper } from "./DashboardContainerStyles";
import { SelectParam } from "antd/lib/menu";
import {
  RouteComponentProps,
  withRouter,
  Switch,
  Route,
  Redirect
} from "react-router";
import { getProfile, User } from "src/apis/auth";

const { Sider } = Layout;

const MenuType = Object.freeze({
  POPULARS: "/home/populars",
  POPULARS_DETAIL: "/home/populars/:id",
  SEARCH: "/home/search",
  SEARCH_DETAIL: "/home/search/:id",
  GENRES: "/home/genres",
  GENRES_DETAIL: "/home/genres/:id",
  USERS: "/home/users",
  LOGOUT: "/logout"
});

type Props = RouteComponentProps;

type State = {
  collapsed: boolean;
  selectedKey: string;
  user?: User;
};

class DashboardContainer extends React.Component<Props, State> {
  state = {
    collapsed: false,
    selectedKey: MenuType.POPULARS,
    user: undefined
  };

  async componentDidMount() {
    const user = await getProfile();
    this.setState({
      user
    });
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
      history.replace("/login");
      return;
    }
    history.push(`${selectParam.key}`);
    this.setState({
      selectedKey: selectParam.key
    });
  };

  render() {
    const { collapsed, user } = this.state;
    return (
      <Layout style={{ height: "100vh", position: "relative" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Avatar collapsed={collapsed} user={user} />
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
            <Menu.Item key={MenuType.SEARCH}>
              <Icon type="search" />
              <span>Search</span>
            </Menu.Item>
            <Menu.Item key={MenuType.GENRES}>
              <Icon type="table" />
              <span>Genres</span>
            </Menu.Item>
            <Menu.Item key={MenuType.USERS}>
              <Icon type="team" />
              <span>Users</span>
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
                component={() => <Redirect to={MenuType.POPULARS} />}
              />
              <Route
                path={MenuType.POPULARS}
                exact
                component={PopularContainer}
              />
              <Route
                path={MenuType.POPULARS_DETAIL}
                exact
                component={MovieDetailContainer}
              />
              <Route
                path={MenuType.SEARCH_DETAIL}
                exact
                component={MovieDetailContainer}
              />
              <Route
                path={MenuType.GENRES_DETAIL}
                exact
                component={MovieDetailContainer}
              />
              <Route path={MenuType.SEARCH} exact component={SearchContainer} />
              <Route path={MenuType.GENRES} exact component={GenresContainer} />
            </Switch>
          </ContentWrapper>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(DashboardContainer);
