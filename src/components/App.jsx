import { fetchImages } from 'fetchImages';
import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import SearchBar from './SearchBar';

export class App extends Component {
  state = {
    searchText: '',
    totalPages: 0,
    page: 1,
    images: [],
    error: null,
    status: 'idle',
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.searchText !== this.state.searchText ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });

      await fetchImages(this.state.searchText, this.state.page)
        .then(({ totalHits, hits: images }) => {
          if (prevState.searchText !== this.state.searchText) {
            const totalPages = Math.ceil(totalHits / 12);
            return this.setState({
              images,
              totalPages,
              status: 'resolved',
            });
          }

          this.setState({
            images: [...prevState.images, ...images],
            status: 'resolved',
          });
        })
        .catch(error => {
          this.setState({ error: error.message, status: 'rejected' });
        });
    }
  }

  onSubmit = searchText => {
    if (!searchText.trim()) {
      toast.error('Incorrect request');
      return;
    }

    this.setState({ searchText, images: [], page: 1 });
  };

  onLoadMore = event => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  render() {
    const { images, page, totalPages, status, error } = this.state;

    return (
      <Container>
        <SearchBar onSubmit={this.onSubmit} />

        {status === 'rejected' && <p>{error}</p>}

        <ImageGallery images={images} />

        {status === 'pending' && <Loader />}

        {totalPages > 1 && page < totalPages && (
          <Button onClick={this.onLoadMore} />
        )}

        <ToastContainer />
      </Container>
    );
  }
}
