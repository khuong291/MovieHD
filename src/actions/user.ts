import { Action, User, SAVE_USER, CLEAR_USER } from "src/reducers/user";

export const saveUser = (user: User): Action => ({
  type: SAVE_USER,
  payload: { ...user }
});

export const clearUser = (): Action => ({
  type: CLEAR_USER,
  payload: {}
});
