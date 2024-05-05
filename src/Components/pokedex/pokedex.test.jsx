import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import PokemonList from './PokemonList';

jest.mock('axios');

describe('PokemonList', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
          { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
        ],
      },
    });
  });

  test('renders loading state initially', async () => {
    render(<PokemonList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
  });

  test('renders fetched pokemons', async () => {
    render(<PokemonList />);
    await waitFor(() => expect(screen.getByText('bulbasaur')).toBeInTheDocument());
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
    expect(screen.getByText('venusaur')).toBeInTheDocument();
  });

  // Add more tests for pagination, search functionality, and favorite toggling
});