import { NavLink } from 'react-router-dom';
import { AlbumType } from '../types';
import Loading from './loading';

type AlbumProps = {
  loading: boolean,
  album: AlbumType[],
  name: string
};

function ResultAlbum({ loading, album, name }:AlbumProps) {
  if (loading) return <Loading />;
  if (album.length === 0) return <h1>Nenhum álbum foi encontrado</h1>;
  return (
    <>
      <h1>{`Resultado de álbuns de: ${name}`}</h1>
      {album.map(({ artistName, collectionId, collectionName, collectionPrice,
        releaseDate, artworkUrl100 }) => (
          <NavLink
            key={ collectionId }
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          >
            <div>
              <h4>{artistName}</h4>
              <h5>{collectionName}</h5>
              <img src={ artworkUrl100 } alt={ collectionName } />
              <h6>{releaseDate}</h6>
              <h6>{collectionPrice}</h6>
            </div>
          </NavLink>
      ))}
    </>
  );
}

export default ResultAlbum;
