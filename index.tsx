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
import ListJobListing from "./ListJobListing";
import ViewJobListingTable from "./pages/ViewJobListingTable";

import "./style.css";

import "./components/forms/add-joblisting/style.css";

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
          <AddJobListing />
          {/*
          <ViewJobListingTable />
          <ListJobListing />
          <LeftFilter filterData={{}} />
          <GlobalSearch />
          <AddCandidate />
          */}
        </Provider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
