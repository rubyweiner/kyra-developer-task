import React, { Component } from 'react';
import {Container} from 'react-bootstrap';
import VideoList from '../components/VideoList.js';
import VideoItem from '../components/VideoItem.js';
// import Chart from '../components/Chart.js';
import { Chart } from "react-google-charts";
import { Grid, Image } from 'semantic-ui-react'

// AIzaSyAebVqV46rdRIq-mowvztwxwUMa_3UvTeo
// AIzaSyAWsDXaExq_QmVSA1MShz_-vExkILp4Nsg
const key = 'AIzaSyAWsDXaExq_QmVSA1MShz_-vExkILp4Nsg';
const channel_id = 'UCvO6uJUVJQ6SrATfsWR5_aA';
// const upload_id = 'UUvO6uJUVJQ6SrATfsWR5_aA';

class BodyContainer extends Component {

  state = {
    next_page_token: '',
    video_count: 0,
    videos: [],
    new_videos: [],
    sorted_videos: []
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
    this.collectGraphData()
  }

  addVideos(video_list) {
    for (let i = 0; i < this.state.new_videos.length; i++) {
      video_list.push({
        title: this.state.new_videos[i].snippet.title,
        thumbnail: this.state.new_videos[i].snippet.thumbnails.default.url,
        description: this.state.new_videos[i].snippet.description,
        publishedAt: new Date(this.state.new_videos[i].snippet.publishedAt)
      })
      // this.state.new_videos[i].snippet.publishedAt
    }
    this.setState({videos: video_list})

  }

  collectGraphData() {
    let sortVideosByDate = this.state.videos.reverse()
    this.setState({sorted_videos: sortVideosByDate})
    console.log(this.state.sorted_videos)
    this.groupByWeek()
  }

  groupByWeek() {
    let data = []
    let counter = []

    for (let i=0; i < this.state.sorted_videos.length; i++) {
      counter.push({date: this.getMonday(this.state.sorted_videos[i].publishedAt), count: 1})
    }

    for (let j=0; j < counter.length; j++) {

    }

    console.log(counter)
  }

  getMonday(d) {
    var day = d.getDay();
    var diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  render() {
    return (
      <Grid columns='equal' celled>
        <Grid.Column >
          <VideoList videos={this.state.videos} totalCount={this.state.video_count}/>
        </Grid.Column>
        <Grid.Column>
          <Chart
            width={'500px'}
            height={'300px'}
            chartType="ScatterChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Week', 'Number of Videos'],
              [8, 37],
              [4, 19.5],
              [11, 52],
              [4, 22],
              [3, 16.5],
              [6.5, 32.8],
              [14, 72],
            ]}
            options={{
              title: 'Videos Per Week',
              hAxis: { title: 'Week', minValue: 0, maxValue: 72},
              vAxis: { title: 'Number of Videos', minValue: 0, maxValue: 5 },
              legend: 'none',
              trendlines: { 0: {} },
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        </Grid.Column>
      </Grid>
    )
  }
}
export default BodyContainer;
