import * as React from "react";
import { Layout, Menu, Icon } from "antd";
import Avatar from "./components/Avatar";
import PopularContainer from "../Popular/PopularContainer";
import { ContentWrapper } from "./DashboardContainerStyles";
import { SelectParam } from "antd/lib/menu";
import { RouteComponentProps, withRouter } from "react-router";

const { Sider } = Layout;

type Props = RouteComponentProps & {};

type State = {
  collapsed: boolean;
  selectedKey: string;
};

class DashboardContainer extends React.Component<Props, State> {
  state = {
    collapsed: false,
    selectedKey: "populars"
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  renderContent = () => {
    const { selectedKey } = this.state;
    switch (selectedKey) {
      case "populars":
        return <PopularContainer />;
      default:
        return <div>Khuong</div>;
    }
  };

  onSelectItem = (selectParam: SelectParam) => {
    const { history } = this.props;
    history.push(`/${selectParam.key}`);
    this.setState({
      selectedKey: selectParam.key
    });
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
          <Menu
            theme="dark"
            defaultSelectedKeys={["populars"]}
            mode="inline"
            onSelect={this.onSelectItem}
          >
            <Menu.Item key="populars">
              <Icon type="star" />
              <span>Populars</span>
            </Menu.Item>
            <Menu.Item key="favorites">
              <Icon type="heart" />
              <span>Favorites</span>
            </Menu.Item>
            <Menu.Item key="search">
              <Icon type="search" />
              <span>Search</span>
            </Menu.Item>
            <Menu.Item key="genres">
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
          <ContentWrapper>{this.renderContent()}</ContentWrapper>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(DashboardContainer);
