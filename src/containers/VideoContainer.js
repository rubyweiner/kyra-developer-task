import React, { Component } from 'react';
import {Container} from 'react-bootstrap';
import VideoList from '../components/VideoList.js';
import VideoItem from '../components/VideoItem.js';
import Chart from '../components/Chart.js';


const key = 'AIzaSyAebVqV46rdRIq-mowvztwxwUMa_3UvTeo';
const channel_id = 'UCvO6uJUVJQ6SrATfsWR5_aA';
// const upload_id = 'UUvO6uJUVJQ6SrATfsWR5_aA';

class VideoContainer extends Component {

  state = {
    next_page_token: '',
    video_count: 0,
    videos: []
  }

  componentDidMount() {
   this.fetchChannel()
  }

  fetchChannel = () => {
    fetch (`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channel_id}&key=${key}`)
    .then(response => response.json())
    .then(json => {

      this.collectVideos(json.items[0].contentDetails.relatedPlaylists.uploads)
    })
  }

  collectVideos = (uploads_id) => {
    for (let i = 0; i < 3; i++) {
      console.log(this.state.next_page_token)
      this.fetchVideos(uploads_id)
    }
  }

  fetchVideos = (uploads_id) => {
      let token = this.state.next_page_token
      fetch (`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken=${this.state.next_page_token}&playlistId=${uploads_id}&key=${key}`)
      .then(response => response.json())
      .then(json => {
        this.setState({video_count: json.pageInfo.totalResults})
        this.parseVideos(json.items, json.nextPageToken)
      })

  }

  parseVideos = (videos, nextPageToken) => {
    let video_list = this.state.videos

    for (let i = 0; i < videos.length; i++) {
      video_list.push(videos[i])
    }

    this.setState({videos: video_list})
    console.log(nextPageToken)
    this.setState({next_page_token: nextPageToken})
  }



  render() {
    return (
      <div >
        <VideoList videos={this.state.videos} totalCount={this.state.video_count}/>
      </div>
    )
  }
}
export default VideoContainer;
