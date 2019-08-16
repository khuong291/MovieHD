import * as React from "react";
import { Card, Tag } from "antd";
import { getPopular, MovieBasicInfo, MovieGenre } from "../../apis/movies";
import { Container, ColWrapper, CoverWrapper } from "./PopularContainerStyles";
import * as InfiniteScroll from "react-infinite-scroller";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { RootState } from "src/reducers/root";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { getPathColor, formatDate } from "src/utils/movie";

const { Meta } = Card;

const mapStateToProps = (state: RootState) => ({
  genres: state.genres
});

type MapStateToProps = ReturnType<typeof mapStateToProps>;

type Props = MapStateToProps & RouteComponentProps;

type State = {
  loading: boolean;
  page: number;
  popularMovies: MovieBasicInfo[];
};

class PopularContainer extends React.Component<Props, State> {
  state = {
    loading: false,
    page: 1,
    popularMovies: []
  };

  async componentDidMount() {
    const popularMovies = await getPopular(this.state.page);
    this.setState({
      popularMovies
    });
  }

  loadMore = () => {
    if (this.state.loading || this.state.popularMovies.length === 0) {
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

  renderLoading = () => {
    return Array(8).map((_, index: number) => (
      <ColWrapper span={6} key={index}>
        <Card style={{ height: 500 }} loading={true} />
      </ColWrapper>
    ));
  };

  renderGenres = (genreIds: number[], genres: MovieGenre[]) => {
    let tags: JSX.Element[] = [];
    genreIds.map((id: number) => {
      genres.forEach((genre: MovieGenre) => {
        if (genre.id === id) {
          const tag = <Tag key={genre.id}>{genre.name}</Tag>;
          tags.push(tag);
        }
        return;
      });
    });
    return <div style={{ height: 60 }}>{tags}</div>;
  };

  renderPopularMovies = () => {
    const { popularMovies } = this.state;
    return popularMovies.map((popularMovie: MovieBasicInfo) => (
      <ColWrapper span={6} key={popularMovie.id}>
        <Card
          onClick={() => {
            this.props.history.push(
              `${this.props.location.pathname}/${popularMovie.id}`
            );
          }}
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
                    pathColor: getPathColor(popularMovie.voteAverage),
                    textColor: "#000",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#000"
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
                <h4>{formatDate(popularMovie.releaseDate)}</h4>
                {this.renderGenres(popularMovie.genreIds, this.props.genres)}
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
            <div key={0} style={{ color: "green" }}>
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

export default connect<MapStateToProps>(mapStateToProps)(
  withRouter(PopularContainer)
);
