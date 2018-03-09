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

    fetch("https://jira.ibaset.com/rest/auth/latest/session",{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: {
        "username":"papatel",
        "password" : "orbitparth"
      }}).then(result => console.log(result));

    // fetch("https://jira.ibaset.com/rest/api/2/filter/12791")
    //   .then(result => result.json())
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