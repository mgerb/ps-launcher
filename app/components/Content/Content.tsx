import React from 'react';
// import fs from 'fs';
// import { exec } from 'child_process';
import { inject, observer } from 'mobx-react';
import * as _ from 'lodash';
import { AppState } from '../../state/AppState';

import './Content.scss';

interface Props {
  AppState?: AppState;
}

@inject('AppState')
@observer
export class Content extends React.Component<Props, any> {
  constructor() {
    super();
    this.state = {
      path: '',
    };
  }

  // private async startGame(): Promise<void> {
  //   const { path } = this.state;

  //   // set the realm list
  //   await this.setRealmList();

  //   // launch wow
  //   exec(`"${path}/WoW.exe"`, (err, output) => {
  //     console.log(err);
  //     console.log(output);
  //   });
  // }

  // private setRealmList(): Promise<any> {
  //   const { path } = this.state;

  //   return new Promise((resolve, reject) => {
  //     fs.writeFile(`${path}/realmlist.wtf`, 'set realmlist logon.elysium-project.org', err => {
  //       err ? reject(err) : resolve();
  //     });
  //   });
  // }

  private onFolderSelect(e: React.ChangeEvent<HTMLInputElement>): void {
    const path: string = _.get(e, `target.files[0].path`);

    if (path) {
      this.props.AppState.setDirectory(path);
    }
  }

  private onInputChange(e: any): void {
    this.props.AppState.setDirectory(e.target.value);
  }

  public render(): any {
    const { selectedExpansion } = this.props.AppState;

    return (
      <div className="content">
        <div className="path-container">
          <input
            type="text"
            className="content-input"
            placeholder="Your wow directory"
            value={selectedExpansion.directory}
            onChange={this.onInputChange.bind(this)}
          />
          <label htmlFor="folder-browser" className="content-button">
            Browse
          </label>
          <input
            id="folder-browser"
            type="file"
            {...{ webkitdirectory: 'true' }}
            onChange={this.onFolderSelect.bind(this)}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    );
  }
}
