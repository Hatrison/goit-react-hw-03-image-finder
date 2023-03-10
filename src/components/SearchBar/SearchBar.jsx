import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import {
  FormInput,
  Header,
  SearchForm,
  SubmitBtn,
  SubmitBtnLabel,
} from './SearchBar.styled';

export default class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    search: '',
  };

  onChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { onSubmit } = this.props;

    onSubmit(event.currentTarget.children[1].value);

    this.setState({
      search: '',
    });
  };

  render() {
    const { search } = this.state;

    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SubmitBtn type="submit">
            <BiSearch size={25} />
            <SubmitBtnLabel>Search</SubmitBtnLabel>
          </SubmitBtn>

          <FormInput
            onChange={this.onChange}
            value={search}
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}
