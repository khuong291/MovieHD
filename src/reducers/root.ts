import { combineReducers } from "redux";
import { MovieGenre } from "src/apis/movies";
import { genres } from "./genres";

export interface RootState {
  genres: MovieGenre[];
}

export const reducers = combineReducers({
  genres
});
