import React from 'react';
// import '../style/video.css';

const VideoItem = ({video, handleSelectVideo}) => {
  return(
    <div onClick={ () => handleSelectVideo(video)} className='video-item item'>
      <img className='ui image'
           src={video.snippet.thumbnails.medium.url}
           alt={video.snippet.description} />
      <div className='content'>
        <div className='header'>{video.snippet.title}</div>
      </div>
    </div>
  )
}
export default VideoItem;
