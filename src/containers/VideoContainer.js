import React, { Component } from 'react';
import VideoList from '../components/VideoList.js';

const key = 'AIzaSyDgtC4SEh9uDfuR-26PQaL8HK7swujiRxs';
const channel_id = 'UCvO6uJUVJQ6SrATfsWR5_aA';

class VideoContainer extends Component {

  state = {
    next_page_token: '',
    videos: []
  }

  componentDidMount() {
   this.fetchChannel()
  }

  fetchChannel = () => {
    fetch (`https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channel_id}&key=${key}`)
    .then(response => response.json())
    .then(json => {
      debugger
      this.collectVideos(json.items[0].contentDetails.relatedPlaylists.uploads)
    })
  }

  collectVideos = (uploads_id) => {
    while (this.state.next_page_token != null) {
      console.log('hi')
      this.fetchVideos(uploads_id)
    }
    debugger
  }

  fetchVideos = (uploads_id) => {
    let video_list = this.state.videos
    fetch (`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${uploads_id}&key=${key}`)
    .then(response => response.json())
    .then(json => {
      if (json.nextPageToken) {
        this.setState({next_page_token: json.nextPageToken})
      } else {
        this.setState({next_page_token: null})
      }
      this.setState({videos: video_list.push(json.items)})
    })
  }


  render() {
    return (
      <div className='ui grid'>
        <div className='ui row'>
          <div className='five wide column'>

            <VideoList />
          </div>
        </div>
      </div>
    )
  }
}
export default VideoContainer;
