import axios from 'axios';


const key = 'AIzaSyBtEvB8-6JTbK1alH0jZlP0yedw5VA_a3c';

export default axios.create({

  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    maxResults: 3,
    key: key
  }
})
