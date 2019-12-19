import React, { Component } from 'react';
import {Container, Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import { Divider, Icon} from 'semantic-ui-react';
import youtube from '../youtube.js';
import VideoList from '../components/VideoList.js';

const key = 'AIzaSyDOEvKjqF6jyaGEDDc-pc6BDaPrBhtHSJk';
const channel_id = 'UCvO6uJUVJQ6SrATfsWR5_aA';
const maxResults = 5;

class VideoContainer extends Component {

  state = {
    videoData: null,
    videos: [],
    selectedVideo: null
  }


  fetchVideos = () => {
    fetch (`https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channel_id}&key=${key}`)
    .then(response => response.json())
    .then(json => {
      console.log(json.items)
      // this.setState({videoData: json})
      // console.log(this.state.userData.snippet)
    })
  }

  handleSelectVideo = (video) => {
    this.setState({selectedVideo: video})
  }

  render() {
    return (
      <div className='ui grid'>
        <div className='ui row'>
          <div className='five wide column'>
            <VideoList handleSelectVideo= {this.handleSelectVideo} videos={this.state.videos}  onload={this.fetchVideos()}/>
          </div>
        </div>
      </div>
    )
  }
}
export default VideoContainer;
