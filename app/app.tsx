import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import AppState from './state/AppState';
import { Wrapper } from './Wrapper/Wrapper';
import 'babel-polyfill';

// base styling
import './scss/index.scss';

const stores = { AppState };

class App extends React.Component<any, any> {
  public render(): any {
    return (
      <Provider {...stores}>
        <Wrapper />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
