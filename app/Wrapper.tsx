import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Header } from './components/Header';
import Home from './pages/Home/Home';

// styling
import './scss/index.scss';

interface Props {}

interface State {}

export default class Wrapper extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            {/* <Route exact path="/" component={} /> */}
            <Route component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
