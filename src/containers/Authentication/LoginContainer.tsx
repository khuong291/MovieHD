import * as React from "react";
import { Form, Icon, Input, Button, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { login } from "src/apis/auth";
import { RouteComponentProps, withRouter } from "react-router";

type Props = FormComponentProps & RouteComponentProps;

type State = {
  userName: string;
  password: string;
};

class LoginContainer extends React.Component<Props, State> {
  componentDidMount() {
    localStorage.setItem("token", "");
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { userName, password } = this.state;
        try {
          const status = await login(userName, password);
          if (status.auth) {
            const token = status.token;
            localStorage.setItem("token", token);
            this.props.history.push("/home");
          }
        } catch {
          message.error("Error");
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        autoComplete="off"
        style={{ padding: "10px 20px" }}
        className="login-form"
      >
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              onChange={(e: any) => {
                this.setState({
                  userName: e.target.value
                });
              }}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              onChange={(e: any) => {
                this.setState({
                  password: e.target.value
                });
              }}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={this.handleSubmit}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({
  name: "normal_login"
})(withRouter(LoginContainer));
