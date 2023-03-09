import { Component } from 'react';
import { Container } from './App.styled';
import SearchBar from './SearchBar';

export class App extends Component {
  state = {
    searchText: '',
  };

  onSubmit = searchText => {
    if (!searchText.trim()) {
      alert('Incorrect request');
    }

    this.setState({ searchText });
  };

  render() {
    return (
      <Container>
        <SearchBar onSubmit={this.onSubmit} />
      </Container>
    );
  }
}
