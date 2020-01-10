import React, { Component } from 'react';
import {Row, Media} from 'react-bootstrap';
import { Divider} from 'semantic-ui-react'

class VideoItem extends Component  {

  componentDidMount() {

  }
 render() {
   return (
     <div>

      <Row>
        <Media>
          <img
            width={90}
            height={60}
            className="mr-3"
            src={this.props.video.thumbnail}
            alt="Generic placeholder"
          />
          <Media.Body>
            <h6>{this.props.video.title}</h6>
            <p>
              {this.props.video.publishedAt.toString().split(' ').slice(1, 4).join(' ')}
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
