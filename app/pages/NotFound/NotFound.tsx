import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import './NotFound.scss';

interface Props extends RouteComponentProps<any> {}

interface State {}

export default class NotFound extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <div className="NotFound">404 Not Found</div>;
  }
}
