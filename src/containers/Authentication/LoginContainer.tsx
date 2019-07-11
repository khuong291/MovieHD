import * as React from "react";
import { Form, Icon, Input, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { login } from "src/apis/auth";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { saveUser } from "../../actions/user";

const mapDispatchToProps = (dispatch: any) => ({
  saveUser
});

type MapDispatchToProps = ReturnType<typeof mapDispatchToProps>;

type Props = FormComponentProps & RouteComponentProps & MapDispatchToProps;

class LoginContainer extends React.Component<Props> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const status = login(values.username, values.password);
        if (status) {
          const token = "asdasd";
          localStorage.setItem("token", token);
          this.props.saveUser({
            name: "",
            age: 0,
            email: "",
            gender: 0,
            favoriteGenres: [],
            token
          });
          this.props.history.push("/home");
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
        onSubmit={this.handleSubmit}
        className="login-form"
      >
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
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
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(
  undefined,
  mapDispatchToProps
)(
  Form.create({
    name: "normal_login"
  })(withRouter(LoginContainer))
);
