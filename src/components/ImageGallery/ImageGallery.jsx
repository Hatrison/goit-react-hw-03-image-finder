import ImageGalleryItem from 'components/ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';

const ImageGallery = ({ images }) => {
  return (
    <ImageList>
      {images.map(image => (
        <ImageGalleryItem image={image} key={image.id} />
      ))}
    </ImageList>
  );
};

export default ImageGallery;
