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

const { TabPane } = Tabs;

class AuthenticationContainer extends React.Component {
  render() {
    return (
      <Container>
        <ModalWrapper>
          <LeftCol span={12} />
          <RightCol span={12}>
            <Tabs defaultActiveKey="1">
              <TabPane tab={<span>Login</span>} key="1">
                <LoginContainer />
              </TabPane>
              <TabPane tab={<span>Register</span>} key="2">
                <SignUpContainer />
              </TabPane>
            </Tabs>
          </RightCol>
        </ModalWrapper>
      </Container>
    );
  }
}

export default AuthenticationContainer;
