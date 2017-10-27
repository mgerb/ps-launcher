import { remote } from 'electron';
import React from 'react';
import { observer, inject } from 'mobx-react';
import { AppState } from '../../state/AppState';
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

  public render(): any {
    return (
      <div className="header">
        <div className="header__version"><span style={{ fontSize: '10px' }}>v{VERSION}</span></div>
        <div className="header__draggable-region"></div>
        <div className="header-icon header-icon--minimize" onClick={this.minimize.bind(this)}/>
        <div className="header-icon header-icon--maximize" onClick={this.maximize.bind(this)}/>
        <div className="header-icon header-icon--close" onClick={() => this.exit()}>×</div>
      </div>
    );
  }
}
