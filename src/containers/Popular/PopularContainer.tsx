import * as React from "react";
import { Card, Tag } from "antd";
import { getPopular, MovieBasicInfo, MovieGenre } from "../../apis/movies";
import { Container, ColWrapper, CoverWrapper } from "./PopularContainerStyles";
import * as InfiniteScroll from "react-infinite-scroller";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import * as moment from "moment";
import { RootState } from "src/reducers/root";
import { connect } from "react-redux";

const { Meta } = Card;

const mapStateToProps = (state: RootState) => ({
  genres: state.genres
});

type MapStateToProps = ReturnType<typeof mapStateToProps>;

type Props = MapStateToProps;

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

  renderGenres = (genreIds: number[]) => {
    let tags: JSX.Element[] = [];
    genreIds.map((id: number) => {
      this.props.genres.forEach((genre: MovieGenre) => {
        if (genre.id === id) {
          const tag = <Tag>{genre.name}</Tag>;
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
                {this.renderGenres(popularMovie.genreIds)}
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
          loader={<div style={{ color: "green" }}>Loading ...</div>}
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

export default connect<MapStateToProps>(mapStateToProps)(PopularContainer);
