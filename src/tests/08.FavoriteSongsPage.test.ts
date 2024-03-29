import { 
  screen,
  waitFor, 
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import * as favoriteSongsAPI from '../services/favoriteSongsAPI';
import renderPath from './helpers/renderPath';
import { defaultUser } from './mocks';

describe.skip('8 - Crie a lista de músicas favoritas', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.setItem('user', JSON.stringify(defaultUser));
    localStorage.setItem('favorite_songs', JSON.stringify([]));
  });

  afterEach(() => localStorage.clear());

  it('Será validado se a requisição para getFavoriteSongs é feita para recuperar as músicas favoritas',
    async () => {
      const spy = vi.spyOn(favoriteSongsAPI, 'getFavoriteSongs');

      renderPath("/favorites");

      await waitFor(
        () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
        { timeout: 3000 }
      );

      expect(spy).toBeCalled();
    });

  it('Será validado se é exibida a lista de músicas favoritas',
    async () => {
      const favoriteSongs = [
        {
          trackId: '12',
          trackName: 'Track Name 1',
          previewUrl: 'preview-url-1',
        },
        {
          trackId: '21',
          trackName: 'Track Name 2',
          previewUrl: 'preview-url-2',
        },
      ];
      localStorage.setItem('favorite_songs', JSON.stringify(favoriteSongs));

      renderPath("/favorites");

      await waitFor(
        () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
        { timeout: 3000 }
      );
      expect(screen.getByText('Track Name 1')).toBeInTheDocument();
      expect(screen.getByText('Track Name 2')).toBeInTheDocument();
      expect(screen.getAllByTestId('audio-component')).toHaveLength(2);
    });

  it('Será validado se a lista de músicas favoritas é atualizada ao remover uma música da lista',
    async () => {
      const favoriteSongs = [
        {
          trackId: 12,
          trackName: 'Track Name 1',
          previewUrl: 'preview-url-1',
        },
        {
          trackId: 21,
          trackName: 'Track Name 2',
          previewUrl: 'preview-url-2',
        },
        {
          trackId: 30,
          trackName: 'Track Name 3',
          previewUrl: 'preview-url-3',
        },
      ];
      localStorage.setItem('favorite_songs', JSON.stringify(favoriteSongs));

      renderPath("/favorites");

      await waitFor(
        () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
        { timeout: 3000 }
      );
  
      const checkboxes = screen.getAllByTestId(/checkbox-music-/);

      expect(screen.getByText('Track Name 1')).toBeInTheDocument();
      expect(screen.getByText('Track Name 2')).toBeInTheDocument();
      expect(screen.getByText('Track Name 3')).toBeInTheDocument();
      expect(screen.getAllByTestId('audio-component')).toHaveLength(3);
      expect(checkboxes).toHaveLength(3);

      userEvent.click(checkboxes[0]);

      await waitFor(
        () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
        { timeout: 3000 },
      );

      expect(screen.queryByText('Track Name 1')).not.toBeInTheDocument();
      expect(screen.getByText('Track Name 2')).toBeInTheDocument();
      expect(screen.getByText('Track Name 3')).toBeInTheDocument();
      expect(screen.getAllByTestId('audio-component')).toHaveLength(2);
      expect(screen.getAllByTestId(/checkbox-music-/)).toHaveLength(2);
    });
});
