import React, { Component } from 'react';
import RouteTransitionTemplate from '../../RouteTransitionTemplate';
import { presets } from 'react-router-transition';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { PlayButton, Progress } from 'react-soundplayer/components';

import './audio.css';
import '../../App.css';

const clientId = 'b66c8aeecc97de91f3ed3fa8b09d8d8c';

class AudioList extends Component {
  constructor(){
    super();
    this.state={
      streams: []
    };
  }

  componentDidMount(){
    fetch('./audio.json')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({streams: responseData});
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render() {
    return (
      <RouteTransitionTemplate preset={presets.slideLeft} {...this.props}>
        <div className="page">
        <div className="hero__small">
          <div className="container">
            <h1 className="hero-title">Audio</h1>
          </div>
        </div>
          <div className="container group">
            <div className="schedule">
              <PlayerContainer feed={this.state.streams} className="group" />
            </div>
          </div>
        </div>
      </RouteTransitionTemplate>
    )
  }
}

class PlayerContainer extends Component {
  render() {
    const audioPlayer = this.props.feed.map((stream, i) => {
      return <SoundPlayerContainer resolveUrl={stream.url} clientId={clientId} key={i} className="group">
          <Player />
      </SoundPlayerContainer>
    });
    return (
      <div>
        {audioPlayer}
      </div>
    )

  }
}

class Player extends Component {
  stopPlay() {
      let { playing, soundCloudAudio } = this.props;
      if (playing) {
          soundCloudAudio.stop();
      }
  }
    render() {
        let { track, currentTime, duration } = this.props;

        return (
            <div className="player__container p2 border navy mt1 mb3 flex flex-center rounded">
                <PlayButton className="flex-none h4 mr2 button white btn-big button-outline button-grow bg-black circle" {...this.props} />
                <div className="flex-auto">
                    <h2 className="h4 m0">{track ? track.title : ''}</h2>
                    <h2 className="h5 m0">{track ? track.description : ''}</h2>
                    <Progress
                        className="mt1 mb1 rounded"
                        innerClassName="rounded-left"
                        value={(currentTime / duration) * 100 || 0}
                        {...this.props}
                    />
                </div>
            </div>
        );
    }

    componentWillUnmount() {
      this.stopPlay();
    }
}

export default AudioList;