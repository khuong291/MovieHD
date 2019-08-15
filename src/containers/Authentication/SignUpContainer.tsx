import * as React from "react";
import { Form, Icon, Input, Button, Select } from "antd";
import { register } from "src/apis/auth";
import { RouteComponentProps, withRouter } from "react-router";
import { MovieGenre } from "src/apis/movies";
import { RootState } from "src/reducers/root";
import { connect } from "react-redux";

const mapStateToProps = (state: RootState) => ({
  genres: state.genres
});

type MapStateToProps = ReturnType<typeof mapStateToProps>;

type Props = MapStateToProps & RouteComponentProps;

const SignUpContainer: React.SFC<Props> = props => {
  const [userName, setUserName] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [age, setAge] = React.useState<number>(0);
  const [gender, setGender] = React.useState<number>(0);
  const [favoriteGenres, setFavoriteGenres] = React.useState<number[]>([]);
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const submitForm = async () => {
    setLoading(true);
    const data = await register(
      name,
      age,
      userName,
      gender,
      favoriteGenres,
      password
    );
    setLoading(false);
    const token = data.token;
    if (token) {
      localStorage.setItem("token", token);
      props.history.push("/home");
    }
  };

  return (
    <Form style={{ padding: "10px 20px" }}>
      <Form.Item>
        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="User name"
          onChange={e => {
            setUserName(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Full name"
          onChange={e => {
            setName(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item>
        <Input
          type="number"
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Age"
          onChange={e => {
            setAge(Number(e.target.value));
          }}
        />
      </Form.Item>
      <Form.Item>
        <Select
          placeholder="Select your gender"
          onSelect={value => {
            setGender(Number(value));
          }}
        >
          <Select.Option value="0">Male</Select.Option>
          <Select.Option value="1">Female</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Select
          mode="multiple"
          placeholder="Select your favorite genres"
          onChange={setFavoriteGenres}
        >
          {props.genres.map((genre: MovieGenre) => (
            <Select.Option key={genre.id}>{genre.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="Password"
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loading}
          onClick={submitForm}
        >
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect<MapStateToProps>(mapStateToProps)(
  withRouter(SignUpContainer)
);
