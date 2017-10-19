import React from 'react';
import fs from 'fs';
import { exec } from 'child_process';
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

  private renderItems(): any {
    const { AppState } = this.props;
    return this.props.AppState.selectedExpansion.servers.map((server, index) => {
      const selected = AppState.selectedExpansion.selectedServerIndex === index ? ' selected' : '';
      return (
        <div key={index} className={'list-item' + selected} onClick={() => AppState.setSelectedServerIndex(index)}>
          {server.name}
        </div>
      );
    });
  }

  private async play(): Promise<void> {
    const { directory } = this.props.AppState.selectedExpansion;

    // set the realm list
    await this.setRealmList();

    // launch wow
    exec(`"${directory}/WoW.exe"`, (err, output) => {
      console.log(err);
      console.log(output);
    });
  }

  private setRealmList(): Promise<any> {
    const { directory } = this.props.AppState.selectedExpansion;
    const { realmlist } = this.props.AppState.selectedServer;

    return new Promise((resolve, reject) => {
      fs.writeFile(`${directory}/realmlist.wtf`, `set realmlist ${realmlist}`, err => {
        err ? reject(err) : resolve();
      });
    });
  }

  public render(): any {
    const { selectedServer } = this.props.AppState;

    return (
      <div className="server-list">
        <div className="server-list-heading">
          <div>Servers</div>
          <i className="fa fa-plus"/>
        </div>
        <div className="item-container">{this.renderItems()}</div>
        <div className="start-button-container">
          <button className="start-button" onClick={() => this.play()} disabled={!selectedServer}>
            Play
          </button>
        </div>
      </div>
    );
  }
}
