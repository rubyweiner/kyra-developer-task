import React, { Component } from 'react';
import {Row, Media} from 'react-bootstrap';
import { Divider} from 'semantic-ui-react'

class VideoItem extends Component  {
 render() {
   return (
     <div>

      <Row>
        <Media>
          <img
            width={120}
            height={90}
            className="mr-3"
            src={this.props.video.snippet.thumbnails.default.url}
            alt="Generic placeholder"
          />
          <Media.Body>
            <h5>{this.props.video.snippet.title}</h5>
            <p>
              {this.props.video.snippet.description}
            </p>
          </Media.Body>
        </Media>
      </Row>
      <Divider />
     </div>
   )
 }
}
export default VideoItem;
