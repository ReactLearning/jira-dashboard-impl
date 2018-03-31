import React from 'react';
import Grommet from 'grommet/components/Grommet';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import { RoutedAnchor } from 'grommet/components/Anchor';
import Stack from 'grommet/components/Stack';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import JiraBoard from './components/JiraBorad';
import Home from './components/Home';


import './style.css';
import "react-image-gallery/styles/css/image-gallery.css";

const App = (props) => (
  <Grommet>
    <Router>
      <Box>
        <Box tag='header' direction='row' fixed={true} className="top-hader">          
          <Box className="menu-bar" full="horizontal" align="center" direction="row" justify="center">
          <RoutedAnchor path="/">Home</RoutedAnchor>
          <RoutedAnchor path="/jiraBoard">JiraBoard</RoutedAnchor>
          </Box>
        </Box>
        <Box tag="section" pad={{horizontal: 'xlarge', bottom:'xlarge'}} className="content-data">
          <Box>
          <Route path="/" exact component={Home} />
          <Route path="/jiraBoard" exact component={JiraBoard} />
          </Box>
        </Box>
      </Box>
    </Router>
    <Box tag="footer" align="center" pad={{horizontal: 'xlarge', vertical: 'large'}} alignSelf="end" className="footer-content">
      For internal use only @ iBASEt india<br/>  
      
    </Box>
  </Grommet>
);

export default App;