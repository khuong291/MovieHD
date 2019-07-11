import { User, user } from "./user";
import { combineReducers } from "redux";

export interface RootState {
  user: User;
}

export const reducers = combineReducers({
  user
});
