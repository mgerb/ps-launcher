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

  private openReleases(): void {
    shell.openExternal('https://github.com/mgerb/ps-launcher/releases');
  }

  private openBugReport(): void {
    shell.openExternal('https://github.com/mgerb/ps-launcher/issues');
  }

  public render(): any {
    const { updateAvailable } = this.props.AppState;
    const updateClass = updateAvailable ? 'header__update' : '';

    return (
      <div className="header">
        <div className="header__version">
          <img src={headerIcon}/>
          <span style={{ fontSize: '10px' }}>{VERSION}</span>
        </div>
        <div className="header__draggable-region"></div>
        <div className={'header-icon ' + updateClass} onClick={this.openReleases.bind(this)} title="Releases">
          {updateAvailable && <span style={{ fontSize: '12px' }}>Update Available!</span>}
          <i className="fa fa-lg fa-github"/>
        </div>
        <i className="fa fa-exclamation-triangle header-icon" onClick={this.openBugReport.bind(this)} title="Report a bug"/>
        <div className="header-icon header-icon--minimize" onClick={this.minimize.bind(this)}/>
        <div className="header-icon header-icon--maximize" onClick={this.maximize.bind(this)}/>
        <div className="header-icon header-icon--close" onClick={() => this.exit()}>×</div>
      </div>
    );
  }
}
