import * as React from "react";
import { Table, Tag } from "antd";
import { Container } from "../Popular/PopularContainerStyles";
import { User, getAllUsers } from "src/apis/auth";
import { RootState } from "src/reducers/root";
import { MovieGenre } from "src/apis/movies";
import { connect } from "react-redux";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    render: (gender: number) => <span>{gender === 0 ? "Male" : "Female"}</span>
  }
];

const mapStateToProps = (state: RootState) => ({
  genres: state.genres
});

type MapStateToProps = ReturnType<typeof mapStateToProps>;

type Props = MapStateToProps;

type State = {
  users: User[];
};

class PopularContainer extends React.Component<Props, State> {
  state = {
    users: []
  };

  async componentDidMount() {
    const users = await getAllUsers();
    this.setState({
      users
    });
  }

  renderGenres = (user: User, genres: MovieGenre[]) => {
    let tags: JSX.Element[] = [];
    user.favoriteGenres.map((id: number) => {
      genres.forEach((genre: MovieGenre) => {
        if (genre.id === id) {
          const tag = <Tag key={genre.id}>{genre.name}</Tag>;
          tags.push(tag);
        }
        return;
      });
    });
    return (
      <div key={user.id} style={{ height: 60 }}>
        {tags}
      </div>
    );
  };

  render() {
    return (
      <Container>
        <Table
          dataSource={this.state.users}
          loading={this.state.users.length === 0}
          columns={[
            ...columns,
            {
              title: "Favorite Genres",
              render: (user: User) => this.renderGenres(user, this.props.genres)
            }
          ]}
        />
        ;
      </Container>
    );
  }
}

export default connect<MapStateToProps>(mapStateToProps)(PopularContainer);
