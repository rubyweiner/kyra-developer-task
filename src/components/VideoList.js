import React from 'react';
import VideoItem from './VideoItem';


const VideoList = ({videos, handleSelectVideo}) => {
  const renderedVideos = videos.map((video) => {
    return <VideoItem key={video.id.videoId}
                      video={video}
                      handleSelectVideo={handleSelectVideo} />
  });

  return <div className= 'ui relaxed divided list'>{renderedVideos}</div>;
};

export default VideoList;
