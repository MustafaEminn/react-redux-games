import ReactDOM from "react-dom";
import HomeView from "./views/Home/Home";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./axios";
import "react-toastify/dist/ReactToastify.css";

import "./declares";
import "antd/dist/antd.css";
import "./index.scss";
import { ToastContainer } from "react-toastify";
import FavoritesView from "./views/Favorites/Favorites";
import GameView from "./views/Game/Game";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/:gameName/:gameId">
          <GameView />
        </Route>
        <Route path="/favorites">
          <FavoritesView />
        </Route>
        <Route path="/">
          <HomeView />
        </Route>
      </Switch>
    </BrowserRouter>
    <ToastContainer
      position="bottom-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </Provider>,
  document.getElementById("root")
);
