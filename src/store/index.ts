import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import { composeEnhancers } from "./utils";
import rootReducer from "./root-reducer";
import rootSaga from "../features/todos/rootSaga";
// import rootEpic from './root-epic';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// export const epicMiddleware = createEpicMiddleware<
//   RootAction,
//   RootAction,
//   RootState,
//   Services
// >({
//   dependencies: services,
// });

// configure middlewares
const middlewares = [sagaMiddleware];
// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(rootReducer, initialState, enhancer);

// then run the saga
sagaMiddleware.run(rootSaga);

// export store singleton instance
export default store;
