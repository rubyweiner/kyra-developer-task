import React from 'react';
import {Header} from 'semantic-ui-react'
import BodyContainer from './containers/BodyContainer';
import VideoContainer from './containers/VideoContainer';

function App() {
  return (
    <div className= 'parallax'>
    
      <div className='body'></div>
      <VideoContainer className='videos'/>

    </div>
  );
}

export default App;
