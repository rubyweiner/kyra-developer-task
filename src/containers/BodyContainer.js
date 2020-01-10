import React, { Component } from 'react';
import {Container} from 'react-bootstrap';
import VideoList from '../components/VideoList.js';
import VideoItem from '../components/VideoItem.js';
// import Chart from '../components/Chart.js';
import { Chart } from "react-google-charts";
import { Grid, Image, Divider } from 'semantic-ui-react'

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
    sorted_videos: [],
    data: [['Week', 'Number of Videos']]
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
    let sortVideosByDate = this.state.videos
    let CurrentDate = new Date()
    CurrentDate.setMonth(CurrentDate.getMonth() - 18);

    this.setState({sorted_videos: sortVideosByDate.filter(video => video.publishedAt > CurrentDate)})

    let x = this.state.sorted_videos.reverse()
    this.setState({sorted_videos: x})

    this.groupByWeek()
  }

  groupByWeek() {
    let counter = []
    for (let i=0; i < this.state.sorted_videos.length; i++) {
      counter.push(this.getMonday(this.state.sorted_videos[i].publishedAt))
    }
    this.countVideosPerWeek(counter)
  }


  getMonday(d) {
    var day = d.getDay();
    var diff = d.getDate() - day + (day === 0 ? -6 : 1);
    let monday = new Date(d.setDate(diff));
    return monday.toString().split(' ').slice(1, 4).join(' ')
  }

  countVideosPerWeek(counter) {
    let countedVideos = counter.reduce(function (allVideos, video) {
      if (video in allVideos) {
        allVideos[video]++
      }
      else {
        allVideos[video] = 1
      }
      return allVideos
    }, {})
    this.createDatapoints(countedVideos)
    // console.log(countedVideos)


  }

  createDatapoints(countedVideos) {
    let allData = this.state.data

    for (let element in countedVideos) {
      allData.push([element, countedVideos[element]])

    }

    this.setState({data: allData})
    console.log(allData)
  }


  render() {
    return (
      <Grid columns='equal' celled>
        <Grid.Column >
          <VideoList videos={this.state.videos} totalCount={this.state.video_count}/>
        </Grid.Column>
        <Grid.Column>
          <h3>Video Uploads per Week</h3>
          <Divider />
          <Chart
            width={'600px'}
            height={'300px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={this.state.data}
            options={{
              hAxis: { title: 'Week Of'},
              vAxis: { title: 'Number of Videos', maxValue: 3},
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
