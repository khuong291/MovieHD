import * as React from "react";
import { Card, Input, Tag } from "antd";
import { MovieBasicInfo, searchMovie, MovieGenre } from "../../apis/movies";
import {
  Container,
  ColWrapper,
  CoverWrapper
} from "../Popular/PopularContainerStyles";
import { RouteComponentProps, withRouter } from "react-router";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { getPathColor, formatDate } from "src/utils/movie";
import { RootState } from "src/reducers/root";
import { connect } from "react-redux";

const { Search } = Input;

const { Meta } = Card;

const mapStateToProps = (state: RootState) => ({
  genres: state.genres
});

type MapStateToProps = ReturnType<typeof mapStateToProps>;

type Props = MapStateToProps & RouteComponentProps;

type State = {
  page: number;
  movies: MovieBasicInfo[];
};

class SearchContainer extends React.Component<Props, State> {
  state = {
    page: 1,
    movies: []
  };

  search = async (query: string) => {
    const movies: MovieBasicInfo[] = await searchMovie(query);
    this.setState({
      movies
    });
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

  renderMovies = () => {
    const { movies } = this.state;
    return movies.map((movie: MovieBasicInfo) => (
      <ColWrapper span={6} key={movie.id}>
        <Card
          onClick={() =>
            this.props.history.push(
              `${this.props.location.pathname}/${movie.id}`
            )
          }
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
            title={
              <div style={{ textAlign: "left" }}>
                <CircularProgressbar
                  styles={buildStyles({
                    strokeLinecap: "round",
                    textSize: "19px",
                    pathColor: getPathColor(movie.voteAverage),
                    textColor: "#000",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#000"
                  })}
                  value={movie.voteAverage / 10}
                  maxValue={1}
                  text={`${movie.voteAverage * 10}%`}
                />
                {movie.title}
              </div>
            }
            description={
              <div>
                <h4>{formatDate(movie.releaseDate)}</h4>
                {this.renderGenres(movie.genreIds, this.props.genres)}
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
      <Container gutter={16}>
        <Search
          placeholder="Search your movie..."
          onSearch={this.search}
          style={{ margin: "-30px 0 30px" }}
        />
        {movies.length === 0 ? <div>Empty</div> : this.renderMovies()}
      </Container>
    );
  }
}

export default connect<MapStateToProps>(mapStateToProps)(
  withRouter(SearchContainer)
);
