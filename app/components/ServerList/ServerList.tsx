import React from 'react';
import fs from 'fs';
import { exec } from 'child_process';
import { inject, observer } from 'mobx-react';
import { AppState } from '../../state/AppState';
import { toast } from '../../util';
import { Modal } from '../Modal/Modal';

import './ServerList.scss';

interface Props {
  AppState?: AppState;
}

interface State {
  showModal: boolean;
}

@inject('AppState')
@observer
export class ServerList extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  private async play(): Promise<void> {
    const { directory } = this.props.AppState.selectedExpansion;

    if (directory === '') {
      toast.error('Please set your root WoW directory');
      return;
    }

    try {
      // set the realm list
      await this.setRealmList();

      // launch wow
      exec(`"${directory}/WoW.exe"`, err => {
        if (err) {
          toast.error('Unable to find WoW.exe in current directory');
        }
      });
    } catch {
      toast.error('Unable to find realmlist.wtf in current directory');
    }
  }

  private setRealmList(): Promise<any> {
    const { directory } = this.props.AppState.selectedExpansion;
    const { realmlist } = this.props.AppState.selectedServer;

    return new Promise((resolve, reject) => {
      fs.stat(`${directory}/realmlist.wtf`, readErr => {
        // return if we can't find realmlist.wtf
        if (readErr) {
          reject(readErr);
          return;
        }

        fs.writeFile(`${directory}/realmlist.wtf`, `set realmlist ${realmlist}`, err => {
          err ? reject(err) : resolve();
        });
      });
    });
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

  private renderModal(): any {
    return (
      <Modal
        isOpen={this.state.showModal}
        onClose={() => this.setState({ showModal: false })}
        title="Add a server"
      >
        <div className="modal-content">
          <div style={{ flex: 1 }}>
            <div className="form-group">
              <label className="form-group__label">Server Name</label>
              <input className="input" placeholder="Awesome Server Name"/>
            </div>
            <div className="form-group">
              <label className="form-group__label">Realm List</label>
              <input className="input" placeholder="logon.server.com"/>
            </div>
            <div className="form-group">
              <label className="form-group__label">Website URL</label>
              <input className="input" placeholder="https://www.awesomeserver.com"/>
            </div>
          </div>

          <div className="button-group">
            <button className="button" onClick={() => this.setState({ showModal: false })}>Cancel</button>
            <button className="button button--success">Save</button>
          </div>

        </div>
      </Modal>
    );
  }

  public render(): any {
    const { selectedServer } = this.props.AppState;

    return (
      <div className="server-list">
        {this.renderModal()}
        <div className="server-list-heading">
          <div>Servers</div>
          <i className="fa fa-plus" onClick={() => this.setState({ showModal: true })}/>
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
