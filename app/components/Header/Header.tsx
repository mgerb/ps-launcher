import { remote, shell } from 'electron';
import React from 'react';
import { observer, inject } from 'mobx-react';
import { AppState } from '../../state/AppState';
import headerIcon from '../../assets/icons/png/24x24.png';
import './Header.scss';

interface Props {
  AppState?: AppState;
}

@inject('AppState')
@observer
export class Header extends React.Component<Props, any> {

  constructor(props: Props) {
    super(props);
  }

  private exit(): void {
    window.close();
  }

  private maximize(): void {
    if (remote.getCurrentWindow().isMaximized()) {
      remote.getCurrentWindow().restore();
    } else {
      remote.getCurrentWindow().maximize();
    }
  }

  private minimize(): void {
    remote.getCurrentWindow().minimize();
  }

  private openGithub(): void {
    shell.openExternal('https://github.com/mgerb/ps-launcher/releases');
  }

  public render(): any {
    return (
      <div className="header">
        <div className="header__version">
          {/* <i className="fa fa-2x fa-github"/> */}
          <img src={headerIcon}/>
          <span style={{ fontSize: '10px' }}>v{VERSION}</span>
        </div>
        <div className="header__draggable-region"></div>
        <i className="fa fa-lg fa-github header-icon"  onClick={this.openGithub.bind(this)}/>
        <div className="header-icon header-icon--minimize" onClick={this.minimize.bind(this)}/>
        <div className="header-icon header-icon--maximize" onClick={this.maximize.bind(this)}/>
        <div className="header-icon header-icon--close" onClick={() => this.exit()}>×</div>
      </div>
    );
  }
}
