import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducers } from "./reducers/root";
import { createBrowserHistory } from "history";
import { Router as BrowserRouter } from "react-router-dom";

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={createBrowserHistory()}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
