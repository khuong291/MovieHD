import * as React from "react";
import { Button } from "antd";
import { getGenres, MovieGenre } from "../../apis/movies";
import { Container } from "./GenresContainerStyles";

type Props = {};

type State = {
  genres: MovieGenre[];
};

class GenresContainer extends React.Component<Props, State> {
  state = {
    genres: []
  };

  async componentDidMount() {
    const genres = await getGenres();
    this.setState({
      genres
    });
  }

  renderGenres = () => {
    const { genres } = this.state;
    return genres.map((genre: MovieGenre) => (
      <Button type="primary" key={genre.id} style={{ margin: 10 }}>
        {genre.name}
      </Button>
    ));
  };

  render() {
    return <Container>{this.renderGenres()}</Container>;
  }
}

export default GenresContainer;
