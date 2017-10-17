import { remote } from 'electron';
import React from 'react';
import './Header.scss';

export class Header extends React.Component<any, any> {

  exit() {
    window.close();
  }

  maximize() {
    if (remote.getCurrentWindow().isMaximized()) {
      remote.getCurrentWindow().restore();
    } else {
      remote.getCurrentWindow().maximize();
    }
  }

  minimize() {
    remote.getCurrentWindow().minimize();
  }

  render() {
    return (
      <div className="header">
        <div className="header__draggable-region"/>
        <div className="header-icon header-icon--minimize" onClick={this.minimize.bind(this)}/>
        <div className="header-icon header-icon--maximize" onClick={this.maximize.bind(this)}/>
        <div className="fa fa-times fa-lg header-icon" onClick={() => this.exit()}/>
      </div>
    );
  }
}
