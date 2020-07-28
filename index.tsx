import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import LeftFilter from './LeftFilter';
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import './style.css';
import AddCandidate from './pages/AddCandidate';
import PreviewCandidate from './pages/PreviewCandidate';
import store from "./store";
import { Provider } from 'react-redux'

interface AppProps { }
interface AppState {
  name: string;
}
const s = store();
class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Provider store={s}>
          <AddCandidate />
        </Provider>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
