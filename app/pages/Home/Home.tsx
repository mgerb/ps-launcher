import * as _ from 'lodash';
import fs from 'fs';
import { exec } from 'child_process';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import './Home.scss';

interface Props extends RouteComponentProps<any> {}

interface State {
  path: string;
}

export default class Home extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      path: '',
    };
  }

  onFolderSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const path: string = _.get(e, `target.files[0].path`);

    if (path) {
      this.setState({ path });
    }
  }

  async startGame() {
    const { path } = this.state;

    // set the realm list
    await this.setRealmList();

    // launch wow
    exec(`"${path}/WoW.exe"`, (err, output) => {
      console.log(err);
      console.log(output);
    });
  }

  setRealmList(): Promise<any> {
    const { path } = this.state;

    return new Promise((resolve, reject) => {
      fs.writeFile(`${path}/realmlist.wtf`, 'set realmlist logon.elysium-project.org', err => {
        err ? reject(err) : resolve();
      });
    });
  }

  render() {
    const { path } = this.state;

    return (
      <div className="Home">
        <div>{path}</div>
        {/* hacky way of adding webkitdirectory to the input */}
        <input type="file" {...{ webkitdirectory: 'true' }} onChange={this.onFolderSelect.bind(this)} />
        <div>
          <button onClick={this.startGame.bind(this)}>Start</button>
        </div>
      </div>
    );
  }
}
