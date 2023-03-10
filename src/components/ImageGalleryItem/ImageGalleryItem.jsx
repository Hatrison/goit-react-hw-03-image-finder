import Modal from 'components/Modal';
import React, { Component } from 'react';
import { Image, ImageListItem } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
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
