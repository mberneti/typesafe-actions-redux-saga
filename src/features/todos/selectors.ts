// import { createSelector } from 'reselect';

import { RootState } from "typesafe-actions";

export const getTodos = (state: RootState) => state.todos.todos;
