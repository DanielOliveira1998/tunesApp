import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      artistData: [],
      musicsList: [],
    };
  }

  componentDidMount() {
    this.fetchGetMusicsAPI();
  }

  fetchGetMusicsAPI = async () => {
    // const {match: {params: {id}}}= this.props;
    const { id } = this.props.match.params;
    const response = await getMusics(id);
    const musicsFiltered = response.filter((_item, index) => index !== 0);
    this.setState({
      artistData: response[0],
      musicsList: musicsFiltered,
    });
  };

  render() {
    const { musicsList, artistData } = this.state;
    // console.log(artistData.artistName);
    // console.log(musicsList);
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
