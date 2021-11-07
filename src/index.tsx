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
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
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
