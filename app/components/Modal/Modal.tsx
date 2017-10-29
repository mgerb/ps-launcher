import React from 'react';

import './Modal.scss';

interface Props {
  isOpen: boolean;
  title: string;
  onClose?(): any;
}

export class Modal extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  public render(): any {
    const { isOpen, onClose, title } = this.props;

    const hiddenClass = !isOpen ? 'CustomModal--hidden' : '';

    return (
      <div className={'CustomModal__base ' + hiddenClass}>
        <div className="CustomModal__content">
          <div className="CustomModal__header">
            <h3>{title}</h3>
          </div>
          {this.props.children}
        </div>
        <div className="CustomModal__overlay" onClick={onClose.bind(this)} />
      </div>
    );
  }
}
