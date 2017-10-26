import React from 'react';
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

  private webviewRef: any;

  constructor() {
    super();
    this.state = {
      path: '',
    };
  }

  public componentDidMount(): void {
    this.webviewRef.addEventListener('dom-ready', () => {
      this.webviewRef.insertCSS(injectedCSS);
    });
  }

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
    const { selectedExpansion, selectedServer } = this.props.AppState;
    const website = _.get(selectedServer, 'website');

    return (
      <div className="content">
        <div className="path-container">
          <label htmlFor="folder-browser" className="content-button">
            {/* <span>Browse</span> */}
            <i className="fa fa-folder-open"/>
          </label>
          <input
            id="folder-browser"
            type="file"
            {...{ webkitdirectory: 'true' }}
            onChange={this.onFolderSelect.bind(this)}
            style={{ display: 'none' }}
          />
          <input
            type="text"
            className="content-input"
            placeholder="Your WoW directory"
            value={selectedExpansion.directory}
            onChange={this.onInputChange.bind(this)}
          />
        </div>
        <webview
          id="foo"
          className="webview"
          src={website}
          ref={(r: any) => this.webviewRef = r}
          style={{ display: website ? null : 'none' }}
        />
        {!website && <div className="noSite"><h2>No Website Available</h2></div>}
      </div>
    );
  }
}

const injectedCSS: string = `
  ::-webkit-scrollbar-track
  {
    border-radius: 10px;
    background-color: none;
  }

  ::-webkit-scrollbar
  {
    width: 10px;
    height: 10px;
    background-color: none;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    background-color: #141d27;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;
