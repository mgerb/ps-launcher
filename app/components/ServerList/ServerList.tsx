import React from 'react';
import { inject, observer } from 'mobx-react';
import { AppState } from '../../state/AppState';

import './ServerList.scss';

interface Props {
  AppState?: AppState;
}

@inject('AppState')
@observer
export class ServerList extends React.Component<Props, any> {

  constructor(props: Props) {
    super(props);
  }

  public render(): any {
    return (
      <div className="server-list">Server list</div>
    );
  }
}
