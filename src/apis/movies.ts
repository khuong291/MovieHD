import axios from "axios";
import { API_KEY } from "../constants/keys";

export const MOVIE_BASE_URL = "https://api.themoviedb.org/3/";

export interface MovieBasicInfo {
  id: number;
  title: string;
  voteAverage: number;
  posterPath: string;
  releaseDate: string;
  genreIds: number[];
}

export interface MovieDetail extends MovieBasicInfo {
  runtime: number;
  genres: MovieGenre[];
  backdropPath: string;
  overview: string;
}

export interface MovieGenre {
  id: number;
  name: string;
}

export const getPopular = async (page: number) => {
  const res = await axios.get(`${MOVIE_BASE_URL}movie/popular`, {
    params: {
      api_key: API_KEY,
      page
    }
  });
  const data = res.data;
  const results = data["results"];
  const popularMovies: MovieBasicInfo[] = results.map(
    (e: any): MovieBasicInfo => ({
      id: e.id,
      title: e.title,
      voteAverage: e.vote_average,
      posterPath: e.poster_path,
      releaseDate: e.release_date,
      genreIds: e.genre_ids
    })
  );
  return popularMovies;
};

export const searchMovie = async (query: string) => {
  const res = await axios.get(`${MOVIE_BASE_URL}search/movie`, {
    params: {
      api_key: API_KEY,
      query
    }
  });
  const data = res.data;
  const results = data["results"];
  const movies: MovieBasicInfo[] = results.map(
    (e: any): MovieBasicInfo => ({
      id: e.id,
      title: e.title,
      voteAverage: e.vote_average,
      posterPath: e.poster_path,
      releaseDate: e.release_date,
      genreIds: e.genre_ids
    })
  );
  return movies;
};

export const getMovieDetail = async (movieId: number) => {
  const res = await axios.get(`${MOVIE_BASE_URL}movie/${movieId}`, {
    params: {
      api_key: API_KEY
    }
  });
  const data = res.data;
  const movieDetail = {
    id: data.id,
    title: data.title,
    voteAverage: data.vote_average,
    posterPath: data.poster_path,
    releaseDate: data.release_date,
    genreIds: [],
    genres: data.genres,
    runtime: data.runtime,
    backdropPath: data.backdrop_path,
    overview: data.overview
  };
  return movieDetail;
};

export const getMovieVideos = async (movieId: number) => {
  const res = await axios.get(`${MOVIE_BASE_URL}movie/${movieId}/videos`, {
    params: {
      api_key: API_KEY
    }
  });
  const data = res.data;
  const results = data["results"];
  if (results && results.length > 0) {
    return results[0].key;
  }
  return undefined;
};

export const getMoviesFromGenre = async (page: number, genreId: number) => {
  const res = await axios.get(`${MOVIE_BASE_URL}discover/movie`, {
    params: {
      api_key: API_KEY,
      page,
      with_genres: genreId
    }
  });
  const data = res.data;
  const results = data["results"];
  const movies: MovieBasicInfo[] = results.map(
    (e: any): MovieBasicInfo => ({
      id: e.id,
      title: e.title,
      voteAverage: e.vote_average,
      posterPath: e.poster_path,
      releaseDate: e.release_date,
      genreIds: e.genre_ids
    })
  );
  return movies;
};
