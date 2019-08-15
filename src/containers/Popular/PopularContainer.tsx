import * as React from "react";
import { Card } from "antd";
import { getPopular, MovieBasicInfo } from "../../apis/movies";
import { Container, ColWrapper, CoverWrapper } from "./PopularContainerStyles";
import * as InfiniteScroll from "react-infinite-scroller";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import * as moment from "moment";

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

  getPathColor = (voteAverage: number) => {
    if (voteAverage > 7) {
      return `rgba(46, 204, 113, ${voteAverage / 10})`;
    } else if (voteAverage > 5) {
      return `rgba(255, 195, 0, ${voteAverage / 10})`;
    } else {
      return `rgba(169, 50, 38, ${voteAverage / 10})`;
    }
  };

  formatDate = (releaseDate: string) => {
    return moment(releaseDate, "YYYY-MM-DD").format("MMM DD, YYYY");
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
            title={
              <div style={{ textAlign: "left" }}>
                <CircularProgressbar
                  styles={buildStyles({
                    strokeLinecap: "round",
                    textSize: "19px",
                    pathColor: this.getPathColor(popularMovie.voteAverage),
                    textColor: "#000",
                    trailColor: "#d6d6d6"
                  })}
                  value={popularMovie.voteAverage / 10}
                  maxValue={1}
                  text={`${popularMovie.voteAverage * 10}%`}
                />
                {popularMovie.title}
              </div>
            }
            description={
              <div>
                <h4>{this.formatDate(popularMovie.releaseDate)}</h4>
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
