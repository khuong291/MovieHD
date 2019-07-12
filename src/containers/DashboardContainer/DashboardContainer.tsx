import * as React from "react";
import { Layout, Menu, Icon } from "antd";
import Avatar from "./components/Avatar";
import PopularContainer from "../Popular/PopularContainer";
import GenresContainer from "../Genres/GenresContainer";
import { ContentWrapper } from "./DashboardContainerStyles";
import { SelectParam } from "antd/lib/menu";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { clearUser, saveUser } from "src/actions/user";
import { getProfile } from "src/apis/auth";

const { Sider } = Layout;

const MenuType = Object.freeze({
  POPULARS: "populars",
  FAVORITES: "favorites",
  SEARCH: "search",
  GENRES: "genres",
  LOGOUT: "logout"
});

const mapDispatchToProps = {
  saveUser,
  clearUser
};

type MapDispatchToProps = typeof mapDispatchToProps;

type Props = RouteComponentProps & MapDispatchToProps & {};

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
    await getProfile();
  }

  resize = () => {
    this.setState({ collapsed: window.innerWidth <= 760 });
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  renderContent = () => {
    const { selectedKey } = this.state;
    switch (selectedKey) {
      case MenuType.POPULARS:
        return <PopularContainer />;
      case MenuType.GENRES:
        return <GenresContainer />;
      default:
        return <div>Khuong</div>;
    }
  };

  onSelectItem = (selectParam: SelectParam) => {
    const { history } = this.props;
    if ((selectParam.key = MenuType.LOGOUT)) {
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
          <ContentWrapper>{this.renderContent()}</ContentWrapper>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  undefined,
  mapDispatchToProps
)(withRouter(DashboardContainer));
