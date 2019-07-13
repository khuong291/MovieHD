import * as React from "react";
import {
  Container,
  ModalWrapper,
  LeftCol,
  RightCol
} from "./AuthenticationContainerStyles";
import { Tabs } from "antd";
import LoginContainer from "./LoginContainer";
import SignUpContainer from "./SignUpContainer";
import { Link } from "react-router-dom";

const { TabPane } = Tabs;

class AuthenticationContainer extends React.Component {
  render() {
    return (
      <Container>
        <ModalWrapper>
          <LeftCol span={12} />
          <RightCol span={12}>
            <Tabs defaultActiveKey={window.location.pathname}>
              <TabPane tab={<span>Login</span>} key="/login">
                <Link to="/login">
                  <LoginContainer />
                </Link>
              </TabPane>
              <TabPane tab={<span>Register</span>} key="/register">
                <Link to="/register">
                  <SignUpContainer />
                </Link>
              </TabPane>
            </Tabs>
          </RightCol>
        </ModalWrapper>
      </Container>
    );
  }
}

export default AuthenticationContainer;
