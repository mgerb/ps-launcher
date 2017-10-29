import React from 'react';
import fs from 'fs';
import { exec } from 'child_process';
import { inject, observer } from 'mobx-react';
import { AppState, ServerType } from '../../state/AppState';
import { toast } from '../../util';
import { Modal } from '../Modal/Modal';

import './ServerList.scss';

interface Props {
  AppState?: AppState;
}

interface State {
  showModal: boolean;
  editModal: boolean;
  editServerIndex: number;
  modalTitle: string;
  modalServerName: string;
  modalRealmList: string;
  modalWebsiteURL: string;
}

@inject('AppState')
@observer
export class ServerList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.defaultState;
  }

  private get defaultState(): State {
    return {
      showModal: false,
      editModal: false,
      editServerIndex: undefined,
      modalTitle: '',
      modalServerName: '',
      modalRealmList: '',
      modalWebsiteURL: '',
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

  private modalOnCancel(): void {
    this.setState(this.defaultState);
  }

  private modalOnDelete(): void {
    if (confirm('Are you sure you want to delete this server?')) {
      this.props.AppState.deleteServer(this.state.editServerIndex);
      this.setState(this.defaultState);
    }
  }

  private modalOnSave(): void {
    const { modalServerName, modalRealmList, modalWebsiteURL } = this.state;

    if (modalServerName === '' || modalRealmList === '' || modalWebsiteURL === '') {
      toast.error('All fields are required');
      return;
    }

    const newServer: ServerType = {
      name: modalServerName,
      realmlist: modalRealmList,
      website: modalWebsiteURL,
    };

    // edit server
    if (this.state.editModal) {
      this.props.AppState.editServer(this.state.editServerIndex, newServer);
      toast.success('Saved');
      this.setState(this.defaultState);
    } else { // else add new server
      if (!this.props.AppState.addServer(newServer)) {
        toast.error('Server already exists');
      } else {
        toast.success('Saved');
        this.setState(this.defaultState);
      }
    }
  }

  private addServerClick(): void {
    this.setState({
      showModal: true,
      editModal: false,
      modalTitle: 'New Server',
    });
  }

  private editServerClick(serverIndex: number): void {
    const server = this.props.AppState.selectedExpansion.servers[serverIndex];
    this.setState({
      showModal: true,
      editModal: true,
      editServerIndex: serverIndex,
      modalTitle: server.name,
      modalServerName: server.name,
      modalRealmList: server.realmlist,
      modalWebsiteURL: server.website,
    });
  }

  private renderItems(): any {
    const { AppState } = this.props;
    return this.props.AppState.selectedExpansion.servers.map((server, index) => {
      const selected = AppState.selectedExpansion.selectedServerIndex === index ? ' selected' : '';
      return (
        <div key={index} className={'list-item' + selected} onClick={() => AppState.setSelectedServerIndex(index, true)}>
          <div className="ellipsis" title={server.name}>{server.name}</div>
          <i className="fa fa-pencil-square-o edit-button" title="Edit" onClick={() => this.editServerClick(index)}/>
        </div>
      );
    });
  }

  private renderModal(): any {
    const { showModal, editModal, modalTitle, modalServerName, modalRealmList, modalWebsiteURL } = this.state;

    return (
      <Modal isOpen={showModal} onClose={this.modalOnCancel.bind(this)} title={modalTitle}>
        <div className="modal-content">
          <div style={{ flex: 1 }}>
            <div className="form-group">
              <label className="form-group__label">Server Name</label>
              <input
                className="input"
                placeholder="Name"
                value={modalServerName}
                onChange={e => this.setState({ modalServerName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-group__label">Realm List</label>
              <input
                className="input"
                placeholder="logon.server.com"
                value={modalRealmList}
                onChange={e => this.setState({ modalRealmList: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-group__label">Website URL</label>
              <input
                className="input"
                placeholder="https://www.server.com"
                value={modalWebsiteURL}
                onChange={e => this.setState({ modalWebsiteURL: e.target.value })}
              />
            </div>
          </div>

          <div className="button-group">
            <div style={{ display: 'flex' }}>
              {editModal && <i className="fa fa-trash fa-lg delete-button" onClick={() => this.modalOnDelete()}/>}
            </div>
            <div>
              <button className="button" onClick={this.modalOnCancel.bind(this)}>
                Cancel
              </button>
              <button className="button button--success" onClick={this.modalOnSave.bind(this)}>
                Save
              </button>
            </div>
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
          <i className="fa fa-plus edit-button" onClick={this.addServerClick.bind(this)} />
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
