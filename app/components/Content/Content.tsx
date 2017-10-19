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
  constructor() {
    super();
    this.state = {
      path: '',
    };
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
