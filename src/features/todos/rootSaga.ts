import {
  all,
  put,
  call,
  takeEvery,
  select,
  SelectEffect,
} from "redux-saga/effects";
import { RootState } from "typesafe-actions";
import { loadTodosAsync, saveTodosAsync } from "./actions";
import service from "../../services";
import { Todo } from "MyModels";
import { getTodos } from "./selectors";

export function selectState<T>(selector: (s: RootState) => T): SelectEffect {
  return select(selector);
}

// Handle request saga
function* loadTodosSaga(): Generator {
  try {
    const response = (yield call(service.api.todos.loadSnapshot)) as Todo[];

    yield put(loadTodosAsync.success(response));
  } catch (err) {
    yield put(loadTodosAsync.failure(err));
  }
}

function* saveTodosSaga(): Generator {
  try {
    const todos = (yield selectState<Todo[]>(getTodos)) as Todo[];
    yield call(service.api.todos.saveSnapshot, todos);

    yield put(saveTodosAsync.success());
  } catch (err) {
    yield put(saveTodosAsync.failure(err));
  }
}

function* mainSaga() {
  yield all([takeEvery(loadTodosAsync.request, loadTodosSaga)]);
  yield all([takeEvery(saveTodosAsync.request, saveTodosSaga)]);
}

export default mainSaga;
