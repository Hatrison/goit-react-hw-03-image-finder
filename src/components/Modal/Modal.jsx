import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalContent, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEsc);
  }

  onEsc = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  onClick = event => {
    const { target, currentTarget } = event;
    if (target === currentTarget) this.props.onClose();
  };

  render() {
    const { url, tags } = this.props;

    return createPortal(
      <Overlay onClick={this.onClick}>
        <ModalContent>
          <img src={url} alt={tags} />
        </ModalContent>
      </Overlay>,
      modalRoot
    );
  }
}
