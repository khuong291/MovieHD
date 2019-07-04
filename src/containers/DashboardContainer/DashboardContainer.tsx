import * as React from "react";
import { Layout, Menu, Icon } from "antd";
import Avatar from "./components/Avatar";
import PopularContainer from "../Popular/PopularContainer";
import { ContentWrapper } from "./DashboardContainerStyles";

const { Sider } = Layout;

type Props = {};

type State = {
  collapsed: boolean;
};

class DashboardContainer extends React.Component<Props, State> {
  state = {
    collapsed: false
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ maxHeight: "100vh", position: "relative" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Avatar collapsed={collapsed} />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">
              <Icon type="star" />
              <span>Popular</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="heart" />
              <span>Favorite</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="search" />
              <span>Search</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="table" />
              <span>Genres</span>
            </Menu.Item>
            <Menu.Item key="5" style={{ position: "absolute", bottom: 45 }}>
              <Icon type="poweroff" />
              <span>SIGN OUT</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <ContentWrapper>
            <PopularContainer />
          </ContentWrapper>
        </Layout>
      </Layout>
    );
  }
}

export default DashboardContainer;
