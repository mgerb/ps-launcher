import React from 'react';
import { inject, observer } from 'mobx-react';
import { AppState } from '../state/AppState';
import { Content, Header, ServerList, SubHeader } from '../components';

import './Wrapper.scss';

interface Props {
  AppState?: AppState;
}

@inject('AppState')
@observer
export class Wrapper extends React.Component<Props, any> {

  private renderMain(): any {
    return (
      <div className="wrapper">
        <Header />
        <SubHeader />
        <div style={{ display: 'flex', flex: 1 }}>
          <ServerList />
          <Content />
        </div>
      </div>
    );
  }

  public render(): any {
    // make sure app is bootstrapped before rendering
    return this.props.AppState.isBootstrapped ? this.renderMain() : <div />;
  }
}
