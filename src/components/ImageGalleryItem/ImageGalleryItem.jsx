import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import React, { Component } from 'react';
import { Image, ImageListItem } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => {
      return {
        showModal: !showModal,
      };
    });
  };

  render() {
    const {
      image: { webformatURL, largeImageURL, tags },
    } = this.props;

    const { showModal } = this.state;

    return (
      <ImageListItem>
        <Image src={webformatURL} alt={tags} onClick={this.toggleModal} />
        {showModal && (
          <Modal url={largeImageURL} alt={tags} onClose={this.toggleModal} />
        )}
      </ImageListItem>
    );
  }
}
