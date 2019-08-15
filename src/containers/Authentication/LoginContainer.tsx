import * as React from "react";
import { Form, Icon, Input, Button, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { login } from "src/apis/auth";
import { RouteComponentProps, withRouter } from "react-router";

type Props = FormComponentProps & RouteComponentProps;

const LoginContainer: React.SFC<Props> = props => {
  const [userName, setUserName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    localStorage.setItem("token", "");
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          setLoading(true);
          const status = await login(userName, password);
          setLoading(false);
          if (status.auth) {
            const token = status.token;
            localStorage.setItem("token", token);
            props.history.push("/home");
          }
        } catch {
          message.error("Error");
        }
      }
    });
  };

  const { getFieldDecorator } = props.form;
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
              setUserName(e.target.value);
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
              setPassword(e.target.value);
            }}
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loading}
          onClick={handleSubmit}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create({
  name: "normal_login"
})(withRouter(LoginContainer));
