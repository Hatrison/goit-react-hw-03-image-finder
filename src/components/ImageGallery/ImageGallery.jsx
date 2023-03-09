import ImageGalleryItem from 'components/ImageGalleryItem';
import React, { Component } from 'react';
import { ImageList } from './ImageGallery.styled';

export default class ImageGallery extends Component {
  render() {
    const { images } = this.props;

    return (
      <ImageList>
        {images.map(image => (
          <ImageGalleryItem image={image} key={image.id} />
        ))}
      </ImageList>
    );
  }
}
