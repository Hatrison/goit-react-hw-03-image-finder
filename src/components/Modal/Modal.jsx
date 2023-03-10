import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalContent, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

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
    const { url, alt } = this.props;

    return createPortal(
      <Overlay onClick={this.onClick}>
        <ModalContent>
          <img src={url} alt={alt} />
        </ModalContent>
      </Overlay>,
      modalRoot
    );
  }
}
