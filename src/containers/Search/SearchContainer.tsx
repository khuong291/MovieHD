import * as React from "react";
import { Card, Rate, Input } from "antd";
import { MovieBasicInfo, searchMovie } from "../../apis/movies";
import {
  Container,
  ColWrapper,
  CoverWrapper
} from "../Popular/PopularContainerStyles";

const { Search } = Input;

const { Meta } = Card;

type Props = {};

type State = {
  page: number;
  movies: MovieBasicInfo[];
  selectedMovieId?: number;
};

class SearchContainer extends React.Component<Props, State> {
  state = {
    page: 1,
    movies: [],
    selectedMovieId: undefined
  };

  search = async (query: string) => {
    const movies: MovieBasicInfo[] = await searchMovie(query);
    this.setState({
      movies
    });
  };

  onSelectMovie = (movieId: number) => {
    this.setState({
      selectedMovieId: movieId
    });
  };

  renderMovies = () => {
    const { movies } = this.state;
    return movies.map((movie: MovieBasicInfo) => (
      <ColWrapper xs={24} lg={6} key={movie.id}>
        <Card
          onClick={() => this.onSelectMovie(movie.id)}
          bordered
          hoverable
          cover={
            <CoverWrapper>
              <img
                src={`https://image.tmdb.org/t/p/w300/${movie.posterPath}`}
                alt=""
              />
            </CoverWrapper>
          }
        >
          <Meta
            title={movie.title}
            description={
              <div>
                <Rate disabled allowHalf={true} value={movie.voteAverage / 2} />
                <h4>{movie.releaseDate}</h4>
              </div>
            }
          />
        </Card>
      </ColWrapper>
    ));
  };

  render() {
    const { movies } = this.state;
    return (
      <>
        <Search
          placeholder="Search your movie..."
          onSearch={this.search}
          style={{ width: 200, margin: "20px auto" }}
        />
        <Container gutter={16}>
          {movies.length === 0 ? <div>Empty</div> : this.renderMovies()}
        </Container>
      </>
    );
  }
}

export default SearchContainer;
