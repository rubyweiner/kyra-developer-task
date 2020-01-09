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
    videos: [],
    new_videos: []
  }

  componentDidMount() {
   this.fetchChannel()
  }

  fetchChannel = () => {
    var uploads_id
    fetch (`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channel_id}&key=${key}`)
    .then(response => response.json())
    .then(json => {
      uploads_id = json.items[0].contentDetails.relatedPlaylists.uploads
      this.loadVideos(uploads_id)
    })
  }


  fetchVideos(uploads_id) {
    return new Promise(resolve => {
      fetch (`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken=${this.state.next_page_token}&playlistId=${uploads_id}&key=${key}`)
      .then(response => response.json())
      .then(json => {
        this.setState({video_count: json.pageInfo.totalResults})
        json.nextPageToken ? this.setState({next_page_token: json.nextPageToken}): this.setState({next_page_token: ''})
        this.setState({new_videos: json.items})
        resolve(json)
      })
    })

  }




   async loadVideos(uploads_id) {
    // let x = Math.ceil(this.state.video_count/50)
    for (let i = 0; i <= 3; i++) {
      let video_list = this.state.videos
      let videosRequest = this.fetchVideos(uploads_id)
      await videosRequest.then(
        this.addVideos(video_list)
      )
    }
    // console.log(this.state.video_count)
    // console.log(this.state.videos.length)
  }

  addVideos(video_list) {
    for (let i = 0; i < this.state.new_videos.length; i++) {
      video_list.push(this.state.new_videos[i])
    }
    this.setState({videos: video_list})
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
