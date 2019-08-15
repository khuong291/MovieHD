import { MovieGenre } from "src/apis/movies";
import { ReduxAction, SAVE_GENRES } from "src/actions/genres";

export const genres = (state: MovieGenre[] = [], action: ReduxAction) => {
  switch (action.type) {
    case SAVE_GENRES:
      return action.payload;
    default:
      return state;
  }
};
