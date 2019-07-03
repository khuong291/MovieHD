import * as React from "react";
import { Card, Rate } from "antd";
import { getPopular } from "../../apis/movies";
import { Container, ColWrapper } from "./PopularContainerStyles";

const { Meta } = Card;

type Props = {};

type State = {
  page: number;
  popularMovies: PopularMovie[];
};

interface PopularMovie {
  id: number;
  title: string;
  voteAverage: number;
  posterPath: string;
  releaseDate: string;
}

class PopularContainer extends React.Component<Props, State> {
  state = {
    page: 1,
    popularMovies: []
  };

  async componentDidMount() {
    const data = await getPopular(this.state.page);
    const popularMovies: PopularMovie[] = data.map(
      (e: any): PopularMovie => ({
        id: e.id,
        title: e.title,
        voteAverage: e.vote_average,
        posterPath: e.poster_path,
        releaseDate: e.release_date
      })
    );
    this.setState({
      popularMovies
    });
  }

  renderLoading = () => {
    return [1, 2, 3, 4].map((_, index: number) => (
      <ColWrapper span={6} key={index}>
        <Card style={{ height: 500 }} loading={true} />
      </ColWrapper>
    ));
  };

  renderPopularMovies = () => {
    return this.state.popularMovies.map(
      (popularMovie: PopularMovie, index: number) => (
        <ColWrapper span={6} key={index}>
          <Card
            bordered
            hoverable
            cover={
              <img
                src={`https://image.tmdb.org/t/p/w500/${
                  popularMovie.posterPath
                }`}
              />
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
      )
    );
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
