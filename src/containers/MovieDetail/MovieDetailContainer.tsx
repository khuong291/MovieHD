import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import {
  getMovieDetail,
  MovieDetail,
  MovieGenre,
  getMovieVideos
} from "src/apis/movies";
import { Container, ContentWrapper } from "./MovieDetailContainerStyles";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  formatDate,
  getPathColor,
  convertMinsToHoursAndMins
} from "src/utils/movie";
import { Button, Tooltip, Tag } from "antd";
import ReactPlayer from "react-player";

type Props = RouteComponentProps;

const MovieDetailContainer: React.SFC<Props> = props => {
  const [movie, setMovie] = React.useState<MovieDetail | undefined>(undefined);
  const [videoKey, setVideoKey] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    getMovieDetail(props.match.params["id"]).then((movie: MovieDetail) => {
      setMovie(movie);
    });
  }, []);

  const playYoutubeVideo = async () => {
    if (movie) {
      const key = await getMovieVideos(movie.id);
      if (key) {
        setVideoKey(key);
      }
    }
  };

  if (!movie) {
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  }
  const backdropPathURL = movie
    ? `https://image.tmdb.org/t/p/w1400_and_h450_face/${movie.backdropPath}`
    : "";
  const posterPathURL = `https://image.tmdb.org/t/p/w300/${movie.posterPath}`;
  return (
    <Container
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${backdropPathURL})`
      }}
    >
      <ContentWrapper>
        <div
          style={{
            display: "flex",
            margin: "0 auto",
            width: 1000,
            padding: "30px 0"
          }}
        >
          <img src={posterPathURL} />
          <div
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <h1>
              {movie.title} <span>({formatDate(movie.releaseDate)})</span>
            </h1>
            <h3 style={{ margin: "-20px 0 10px" }}>
              Duration: {convertMinsToHoursAndMins(movie.runtime)}
            </h3>
            <div style={{ display: "inline-flex", marginBottom: 20 }}>
              <CircularProgressbar
                styles={buildStyles({
                  strokeLinecap: "round",
                  textSize: "25px",
                  pathColor: getPathColor(movie.voteAverage),
                  textColor: "#fff",
                  trailColor: "#d6d6d6",
                  backgroundColor: "#000",
                  pathTransitionDuration: 1.0
                })}
                value={movie.voteAverage / 10}
                maxValue={1}
                text={`${movie.voteAverage * 10}%`}
              />
              <h3
                style={{
                  fontWeight: "bold",
                  width: 50,
                  fontSize: 18,
                  color: "white",
                  margin: "auto 30px auto 0",
                  lineHeight: "20px"
                }}
              >
                User score
              </h3>
              <Tooltip title="Play trailer">
                <Button
                  ghost
                  style={{ width: 45, height: 45, margin: "auto 0" }}
                  shape="circle"
                  icon="caret-right"
                  onClick={playYoutubeVideo}
                />
              </Tooltip>
            </div>
            <div style={{ marginBottom: 20 }}>
              {movie.genres.map((genre: MovieGenre) => (
                <Tag key={genre.id}>{genre.name}</Tag>
              ))}
            </div>
            <div>
              <h2>Overview</h2>
              <h3>{movie.overview}</h3>
            </div>
          </div>
        </div>
        {videoKey && (
          <div
            onClick={() => setVideoKey(undefined)}
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))`,
              width: "100vw",
              height: "100vh",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 999
            }}
          >
            <ReactPlayer
              style={{ margin: "0 auto" }}
              width="80vw"
              height="80vh"
              url={`https://www.youtube.com/watch?v=${videoKey}`}
              playing
            />
          </div>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default withRouter(MovieDetailContainer);
