import * as React from "react";
import { Card, Rate } from "antd";
import { getPopular, MovieBasicInfo } from "../../apis/movies";
import { Container, ColWrapper, CoverWrapper } from "./PopularContainerStyles";
import * as InfiniteScroll from "react-infinite-scroller";

const { Meta } = Card;

type Props = {};

type State = {
  loading: boolean;
  page: number;
  popularMovies: MovieBasicInfo[];
  selectedMovieId?: number;
};

class PopularContainer extends React.Component<Props, State> {
  state = {
    loading: false,
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

  loadMore = () => {
    if (this.state.loading) {
      return;
    }
    this.setState(
      {
        loading: true,
        page: this.state.page + 1
      },
      async () => {
        const popularMovies = await getPopular(this.state.page);
        this.setState({
          loading: false,
          popularMovies: [...this.state.popularMovies, ...popularMovies]
        });
      }
    );
  };

  onSelectMovie = (movieId: number) => {
    this.setState({
      selectedMovieId: movieId
    });
  };

  renderLoading = () => {
    return Array(8).map((_, index: number) => (
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
                src={`https://image.tmdb.org/t/p/w300/${
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
                  count={10}
                  disabled
                  allowHalf={true}
                  value={popularMovie.voteAverage}
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
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={true || false}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
          useWindow={false}
        >
          {popularMovies.length === 0
            ? this.renderLoading()
            : this.renderPopularMovies()}
        </InfiniteScroll>
      </Container>
    );
  }
}

export default PopularContainer;
