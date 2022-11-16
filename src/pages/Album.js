import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      artistData: [],
      musicsList: [],
      favoriteSogns: [],
    };
  }

  componentDidMount() {
    this.fetchGetMusicsAPI();
    this.fetchgetFavoriteSongsAPI();
  }

  fetchGetMusicsAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const filteredMusics = response.filter((_item, index) => index !== 0);
    this.setState({
      artistData: response[0],
      musicsList: filteredMusics,
    });
  };

  fetchgetFavoriteSongsAPI = async () => {
    const response = await getFavoriteSongs();
    this.setState({ favoriteSogns: response });
  };

  render() {
    const { musicsList, artistData, favoriteSogns } = this.state;
    // console.log(artistData.artistName);
    console.log(favoriteSogns);
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="artist-name">{artistData.artistName}</h2>
          <h2 data-testid="album-name">{artistData.collectionName}</h2>
        </div>
        {musicsList.map((music) => (
          <MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            kind={ music.kind }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default Album;
