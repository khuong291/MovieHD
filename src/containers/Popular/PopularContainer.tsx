import * as React from "react";
import { Card, Rate } from "antd";
import { getPopular, MovieBasicInfo } from "../../apis/movies";
import { Container, ColWrapper, CoverWrapper } from "./PopularContainerStyles";

const { Meta } = Card;

type Props = {};

type State = {
  page: number;
  popularMovies: MovieBasicInfo[];
  selectedMovieId?: number;
};

class PopularContainer extends React.Component<Props, State> {
  state = {
    page: 1,
    popularMovies: [],
    selectedMovieId: undefined
  };

  async componentDidMount() {
    const popularMovies = await getPopular(this.state.page);
    this.setState({
      popularMovies
    });
  }

  onSelectMovie = (movieId: number) => {
    this.setState({
      selectedMovieId: movieId
    });
  };

  renderLoading = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8].map((_, index: number) => (
      <ColWrapper span={6} key={index}>
        <Card style={{ height: 500 }} loading={true} />
      </ColWrapper>
    ));
  };

  renderPopularMovies = () => {
    const { popularMovies } = this.state;
    return popularMovies.map((popularMovie: MovieBasicInfo) => (
      <ColWrapper span={6} key={popularMovie.id}>
        <Card
          onClick={() => this.onSelectMovie(popularMovie.id)}
          bordered
          hoverable
          cover={
            <CoverWrapper>
              <img
                src={`https://image.tmdb.org/t/p/w500/${
                  popularMovie.posterPath
                }`}
                alt=""
              />
            </CoverWrapper>
          }
        >
          <Meta
            title={popularMovie.title}
            description={
              <div>
                <Rate
                  disabled
                  allowHalf={true}
                  value={popularMovie.voteAverage / 2}
                />
                <h4>{popularMovie.releaseDate}</h4>
              </div>
            }
          />
        </Card>
      </ColWrapper>
    ));
  };

  render() {
    const { popularMovies } = this.state;
    return (
      <Container gutter={16}>
        {popularMovies.length === 0
          ? this.renderLoading()
          : this.renderPopularMovies()}
      </Container>
    );
  }
}

export default PopularContainer;
