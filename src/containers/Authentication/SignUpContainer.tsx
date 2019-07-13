import * as React from "react";
import { Form, Icon, Input, Button, Select } from "antd";
import { register } from "src/apis/auth";
import { RouteComponentProps, withRouter } from "react-router";
import { getGenres, MovieGenre } from "src/apis/movies";

type Props = RouteComponentProps;

type State = {
  genres: MovieGenre[];
  userName: string;
  name: string;
  age: number;
  gender: number;
  favoriteGenres: number[];
  password: string;
};

class SignUpContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      genres: [],
      userName: "",
      name: "",
      age: 0,
      gender: 0,
      favoriteGenres: [],
      password: ""
    };
  }

  async componentDidMount() {
    const genres = await getGenres();
    this.setState({
      genres
    });
  }

  submitForm = async () => {
    const { state } = this;
    const data = await register(
      state.name,
      state.age,
      state.userName,
      state.gender,
      [],
      "123"
    );
    const token = data.token;
    if (token) {
      localStorage.setItem("token", token);
      this.props.history.push("/home");
    }
  };

  render() {
    return (
      <Form style={{ padding: "10px 20px" }}>
        <Form.Item>
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="User name"
            onChange={e => {
              this.setState({
                userName: e.target.value
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Full name"
            onChange={e => {
              this.setState({
                name: e.target.value
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="number"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Age"
            onChange={e => {
              this.setState({
                age: Number(e.target.value)
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <Select
            placeholder="Select your gender"
            onSelect={value => {
              this.setState({
                gender: Number(value)
              });
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
            onSelect={value => {
              console.log(value);
            }}
          >
            {this.state.genres.map((genre: MovieGenre) => (
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
              this.setState({
                password: e.target.value
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={this.submitForm}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default withRouter(SignUpContainer);
