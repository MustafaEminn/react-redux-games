import ReactDOM from "react-dom";
import "./index.scss";
import HomeView from "./views/Home/Home";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./declares";
import "antd/dist/antd.css";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <HomeView />
        </Route>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
