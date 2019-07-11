import * as React from "react";
import { Form, Icon, Input, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { register } from "src/apis/auth";
import { connect } from "react-redux";
import { saveUser } from "src/actions/user";
import { RouteComponentProps, withRouter } from "react-router";

const mapDispatchToProps = (dispatch: any) => ({
  saveUser
});

type MapDispatchToProps = ReturnType<typeof mapDispatchToProps>;

type Props = FormComponentProps & MapDispatchToProps & RouteComponentProps;

class SignUpContainer extends React.Component<Props> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const user = {
          name: "Nguyen Van A",
          age: 20,
          email: "a@gmail.com",
          gender: 0,
          favoriteGenres: [0, 1]
        };
        const data = await register(user, "123");
        const token = data.token;
        if (token) {
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
          {getFieldDecorator("reEnterPassword", {
            rules: [
              { required: true, message: "Please re enter your Password!" }
            ]
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
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(mapDispatchToProps)(
  Form.create({
    name: "normal_signup"
  })(withRouter(SignUpContainer))
);
