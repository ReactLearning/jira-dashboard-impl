import React from 'react';
import Box from 'grommet/components/Box';

class Home extends React.Component
{
  constructor(props)
  {
      super(props);
      this.state =  {serachJql : "asdsa" };
  }

  render()
  {

    

     
    return (<Box full="horizontal" align="center" pad={{vertical: 'large'}}>
    IMPL Jira Dashborad
    
    </Box>);
  }
}

export default Home;