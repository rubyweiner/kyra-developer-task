import React, { Component } from 'react';
import {Container} from 'react-bootstrap';
import { Divider} from 'semantic-ui-react';
import { Image, Item } from 'semantic-ui-react';

import VideoItem from './VideoItem.js';

class VideoList extends Component {

  render() {
    return (
      <Container>
      <h3>Videos ({this.props.totalCount})</h3>
      <Divider />
      <Item.Group>

      { this.props.videos.length > 0 ?
          this.props.videos.slice(0, 10).map(video =>
            <VideoItem video={video}/>
          )
      :
        <h3>loading videos...</h3>
      }
      </Item.Group>
      </Container>
    )
  }
}
export default VideoList;
