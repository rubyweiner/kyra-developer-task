import React, { Component } from 'react';
import {Container} from 'react-bootstrap';
import { Divider} from 'semantic-ui-react'

import VideoItem from './VideoItem.js';

class VideoList extends Component {

  render() {
    return (
      <Container>
      <h3>Videos </h3>
      <Divider />
      { this.props.videos.length > 0?
        this.props.videos.slice(0, 10).map(video =>
          <VideoItem video={video}/>
        )
      :
        <h1>unable to load videos</h1>
      }

      </Container>
    )
  }
}
export default VideoList;
