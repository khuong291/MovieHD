import * as React from "react";
import { Container, ModalWrapper } from "./AuthenticationContainerStyles";
import { Tabs } from "antd";
import LoginContainer from "./LoginContainer";
import SignUpContainer from "./SignUpContainer";
import { Link } from "react-router-dom";

const { TabPane } = Tabs;

const AuthenticationContainer = () => (
  <Container>
    <ModalWrapper>
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
    </ModalWrapper>
  </Container>
);

export default AuthenticationContainer;
