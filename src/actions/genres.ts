import { MovieGenre, MOVIE_BASE_URL } from "src/apis/movies";
import axios from "axios";
import { API_KEY } from "src/constants/keys";
import { Dispatch } from "redux";

export const SAVE_GENRES = "SAVE_GENRES";

export interface ReduxAction {
  type: string;
  payload: any;
}

export const saveGenres = (genres: MovieGenre[]): ReduxAction => ({
  type: SAVE_GENRES,
  payload: genres
});

export const saveGenresAsync = () => (dispatch: Dispatch) => {
  axios
    .get(`${MOVIE_BASE_URL}genre/movie/list`, {
      params: {
        api_key: API_KEY
      }
    })
    .then(res => {
      const data = res.data;
      const genresJSON = data["genres"];
      const genres: MovieGenre[] = genresJSON.map(
        (e: any): MovieGenre => ({
          id: e.id,
          name: e.name
        })
      );
      dispatch(saveGenres(genres));
    });
};
