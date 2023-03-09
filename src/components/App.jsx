import { fetchImages } from 'fetchImages';
import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled';
import Button from './Button';
import ImageGallery from './ImageGallery';
import SearchBar from './SearchBar';

export class App extends Component {
  state = {
    searchText: '',
    totalPages: 0,
    page: 1,
    images: [],
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.searchText !== this.state.searchText ||
      prevState.page !== this.state.page
    ) {
      await fetchImages(this.state.searchText, this.state.page)
        .then(({ totalHits, hits: images }) => {
          const totalPages = Math.ceil(totalHits / 12);
          this.setState({
            images: [...prevState.images, ...images],
            totalPages,
          });
        })
        .catch(error => {
          this.setState({ error: error.message });
        });
    }
  }

  onSubmit = searchText => {
    if (!searchText.trim()) {
      toast.error('Incorrect request');
      return;
    }

    this.setState({ searchText, page: 1 });
  };

  onLoadMore = event => {
    event.preventDefault();
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  render() {
    const { images, page, totalPages } = this.state;

    return (
      <Container>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery images={images} />
        {totalPages > 1 && page < totalPages && (
          <Button onClick={this.onLoadMore} />
        )}
        <ToastContainer />
      </Container>
    );
  }
}
