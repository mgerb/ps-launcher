import React from 'react';
import { Provider } from 'mobx-react';
import AppState from '../state/AppState';
import { Content, Header, ServerList, SubHeader } from '../components';

import './Wrapper.scss';

const stores = { AppState };

export class Wrapper extends React.Component<any, any> {

  public render(): any {
    return (
      <Provider {...stores}>
        <div className="wrapper">
          <Header />
          <SubHeader />
          <div style={{ display: 'flex', flex: 1 }}>
            <ServerList />
            <Content />
          </div>
        </div>
      </Provider>
    );
  }
}
