import React, { Component } from 'react';
import { Image, ImageListItem } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  render() {
    const {
      image: { webformatURL },
    } = this.props;

    return (
      <ImageListItem>
        <Image src={webformatURL} alt="" />
      </ImageListItem>
    );
  }
}
