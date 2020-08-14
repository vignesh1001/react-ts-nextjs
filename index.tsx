import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import LeftFilter from "./pages/LeftFilter";
import GlobalSearch from "./pages/GlobalSearch";
import AddJobListing from "./pages/AddJobListing";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import AddCandidate from "./pages/AddCandidate";
import store from "./store";
import { Provider } from "react-redux";

import "./style.css";
interface AppProps {}
interface AppState {
  name: string;
}
const s = store();
class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <div>
        <Provider store={s}>
          {/*<LeftFilter filterData={{}} />*/}
          <GlobalSearch />
          {/*<AddCandidate />*/}
          <AddJobListing />
        </Provider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
