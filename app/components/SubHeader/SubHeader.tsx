import React from 'react';
import { inject, observer } from 'mobx-react';
import * as _ from 'lodash';
import { AppState } from '../../state/AppState';

import './SubHeader.scss';

interface Props {
  AppState?: AppState;
}

@inject('AppState')
@observer
export class SubHeader extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  public componentDidMount(): void {
    this.renderItems();
  }

  private selectExpansion(exp: string): void {
    this.props.AppState.setSelectedExpansion(exp);
  }

  private renderItems(): any {
    const { selectedExpKey } = this.props.AppState;
    return _.map(this.props.AppState.expansions, (exp, key) => {
      return (
        <div key={key} className={'sub-header__item ' + (key === selectedExpKey && 'selected')} onClick={() => this.selectExpansion(key)}>
          <div style={{ textAlign: 'center' }}>{exp.name}</div>
        </div>
      );
    });
  }

  public render(): any {
    return (
      <div className="sub-header">
        {this.renderItems()}
      </div>
    );
  }
}
