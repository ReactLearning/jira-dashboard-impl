import React from 'react';
import Box from 'grommet/components/Box';

class ComingSoon extends React.Component
{
  constructor(props)
  {
      super(props);
      this.state =  {serachJql : "asdsa" };
  }

  componentDidMount() {
    fetch("http://localhost:4000/filter/12791")
      .then(result => result.json())
      .then(jsonResponseObj => {
        console.log(jsonResponseObj);
        this.setState({serachJql: jsonResponseObj.jql});
        console.log("Calling Search"+this.state.serachJql);
        fetch('http://localhost:4000/search', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: {
          "jql": this.state.serachJql
          }
        })
        .then(result => result.json())
        .then(jsonResponseObj => {
            console.log(jsonResponseObj.total);         
          });
      });

     
  }

  render()
  {
    console.log("From Render"); 
    return (
      <Box full="horizontal" align="center" pad={{vertical: 'large'}}>
        Coming soon
        {this.state.serachJql}
      </Box>);
  }
}

export default ComingSoon;