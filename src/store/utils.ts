import { compose } from "redux";

export const composeEnhancers: any =
  (process.env.NODE_ENV === "development" &&
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose)) ||
  compose;
