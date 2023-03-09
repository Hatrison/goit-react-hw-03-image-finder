import { fetchImages } from 'fetchImages';
import { Component } from 'react';
import { Container } from './App.styled';
import ImageGallery from './ImageGallery';
import SearchBar from './SearchBar';

export class App extends Component {
  state = {
    searchText: '',
    total: 0,
    images: [],
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.searchText !== this.state.searchText) {
      await fetchImages(this.state.searchText)
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(new Error('Something went wrong :('));
        })
        .then(({ hits: images }) => this.setState({ images }))
        .catch(error => {
          this.setState({ error: error.message });
        });
    }
  }

  onSubmit = searchText => {
    if (!searchText.trim()) {
      alert('Incorrect request');
    }

    this.setState({ searchText });
  };

  render() {
    const { images } = this.state;

    return (
      <Container>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery images={images} />
      </Container>
    );
  }
}
