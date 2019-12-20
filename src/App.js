import React from 'react';
import {Header} from 'semantic-ui-react'
import BodyContainer from './containers/BodyContainer';
import VideoContainer from './containers/VideoContainer';

function App() {
  return (
    <div className= 'parallax'>


      <BodyContainer className='body'/>
      <VideoContainer className='body'/>

    </div>
  );
}

export default App;
