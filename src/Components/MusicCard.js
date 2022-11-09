import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  fetchAddSongAPI = async () => {
    const { trackName, previewUrl, trackId, kind } = this.props;
    this.setState({
      isLoading: true,
    });
    await addSong({ trackId, trackName, previewUrl, kind });
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading } = this.state;
    return (
      <div>
        {isLoading && <Loading />}
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <input
          type="checkbox"
          name="favorite"
          id="favorite"
          data-testid={ `checkbox-music-${trackId}` }
          onClick={ this.fetchAddSongAPI }
        />
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
};

export default MusicCard;
