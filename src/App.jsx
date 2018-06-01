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
import { hpe, vanilla } from 'grommet/themes';


const App = (props) => (
  <Grommet theme={hpe}>
    <Router>
      <Box>
        <Box tag="header" direction='row' responsive={true} justify='center' full={true}
          background='neutral-1' round='small'>
          <Heading margin='small' style={{'letterSpacing' : '1em','maxWidth':'100%'}} level={3} size='medium'>IMPL JIRA DASHBOARD</Heading>
        </Box>
        {/* <Box tag='header' direction='row' fixed={true} className="top-hader">
          <Box className="sideBar" full="horizontal" align="center" direction="row" justify="center">            
            <RoutedAnchor path="/">Home</RoutedAnchor>
            <RoutedAnchor path="/jiraBoard">JiraBoard</RoutedAnchor> 
          </Box>
        </Box> */}
        <Box tag="section"  >
          <Box>
            <Route path="/" exact component={Home} />
            {/* <Route path="/jiraBoard" exact component={JiraBoard} /> */}
          </Box>
        </Box>
      </Box>
    </Router>
    <Box tag="footer" align="center" pad={{ horizontal: 'xlarge', vertical: 'large' }} alignSelf="end" className="footer-content">
      For internal use only @ iBASEt india<br />

    </Box>
  </Grommet>
);

export default App;