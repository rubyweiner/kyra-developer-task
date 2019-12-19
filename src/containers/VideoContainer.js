import React, { Component } from 'react';
import {Container, Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import { Divider, Icon} from 'semantic-ui-react';
import youtube from '../youtube.js';
import VideoList from '../components/VideoList.js';

const key = 'AIzaSyBtEvB8-6JTbK1alH0jZlP0yedw5VA_a3c';
class VideoContainer extends Component {

  state = {
    videoData: null,
    videos: [],
    selectedVideo: null
  }

  fetchVideos = () => {
    fetch (`https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=PAQ&maxResults=5&key=[${key}]`)
    .then(response => response.json())
    .then(json => {
      this.setState({videoData: json})
      console.log(this.state.userData)
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
