import { useState } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';
import Loading from './loading';
import ResultAlbum from './resultAlbum';

function Search() {
  const [artist, setArtist] = useState('');
  const [artistName, setArtistName] = useState('');
  const [result, setIsResult] = useState<AlbumType[]>([]);
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setArtist(value);
    if (value.length > 1) setIsDisable(false);
    else setIsDisable(true);
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setIsLoading(true);
    const request = await searchAlbumsAPI(artist);
    // console.log((request));

    setIsResult([...request]);
    setArtistName(artist);
    setIsDisable(true);
    setArtist('');
    setIsLoading(false);
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <form action="">
        <label htmlFor="artist">
          Digite a banda ou o cantor:
          <input
            type="text"
            data-testid="search-artist-input"
            value={ artist }
            onChange={ (event) => handleChange(event) }
          />
          <button
            onClick={ (event) => handleClick(event) }
            disabled={ isDisable }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </label>
      </form>
      <div>
        <ResultAlbum
          loading={ isLoading }
          album={ result }
          name={ artistName }
        />
      </div>
    </>
  );
}

export default Search;
