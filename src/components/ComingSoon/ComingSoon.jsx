import React from 'react';
import Box from 'grommet/components/Box';

class ComingSoon extends React.Component
{
  constructor(props)
  {
      super(props);
      this.state =  {serachJql : "asdsa" };
  }

  render()
  {

    

     fetch("http://localhost:4000/filter/12791")
       .then(result => result.json());
    //   .then(data => data.jql)
    //   .then(jql => fetch("https://jira.ibaset.com/rest/api/2/search",{
    //     method:'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: {
    //       jql: jql
    //     }
    //   } 
    //   ))
    //   .then(result => console.log(result));

    return (<Box full="horizontal" align="center" pad={{vertical: 'large'}}>
    Coming soon 12 {this.state.serachJql}
    
    </Box>);
  }
}

export default ComingSoon;