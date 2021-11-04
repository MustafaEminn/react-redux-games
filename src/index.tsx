import ReactDOM from "react-dom";
import "./index.scss";
import HomeView from "./views/Home/Home";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ToggleThemeButton from "./components/input/button/toggleTheme/ToggleThemeButton";
import "./declares";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <HomeView />
        </Route>
      </Switch>
    </BrowserRouter>
    <ToggleThemeButton />
  </Provider>,
  document.getElementById("root")
);
