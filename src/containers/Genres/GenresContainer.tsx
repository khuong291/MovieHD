import * as React from "react";
import { Button } from "antd";
import { Container } from "./GenresContainerStyles";
import { MovieGenre } from "src/apis/movies";

class GenresContainer extends React.Component {
  renderGenres = () => {
    const genres: MovieGenre[] = [];
    return genres.map((genre: MovieGenre) => (
      <Button type="primary" key={genre.id}>
        {genre.name}
      </Button>
    ));
  };

  render() {
    return <Container>{this.renderGenres()}</Container>;
  }
}

export default GenresContainer;
