import React from 'react';
import Box from 'grommet/components/Box';
import JiraList from './JiraList';


class JiraBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        searchJql: "",
        searchUrl: ""
      },
      loginSessionInfo: {
        name: "",
        value: ""
      },
      jiraFetchStatus: "Loading Jira...!!",
      jiraIssues: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/userLoginLocal", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": "papatel",
        "password": "p$63562dha"
      }),
      json: true
    }).then(result => result.json())
      .then(jsonResponseObj => {
        this.setState({
          loginSessionInfo: {
            name: jsonResponseObj.session.name,
            value: jsonResponseObj.session.value
          }
        });
        fetch("http://localhost:4000/filterLocal/12791")
          .then(result => result.json())
          .then(jsonResponseObj => {
            this.setState({
              filter: {
                searchJql: jsonResponseObj.jql,
                searchUrl: jsonResponseObj.searchUrl
              }
            });

            // console.log("searchUrl" + this.state.filter.searchUrl);
            // console.log("searchJql" + this.state.filter.searchJql);
            // console.log(this.state.loginSessionInfo.name);
            // console.log(this.state.loginSessionInfo.value);
            fetch('http://localhost:4000/searchJiraLocal', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "searchUrl": this.state.filter.searchUrl,
                "searchJql": this.state.filter.searchJql,
                "name": this.state.loginSessionInfo.name,
                "value": this.state.loginSessionInfo.value
              }),
              json: true
            })
              .then(result => result.json())
              .then(jsonResponseObj => {
                //console.log(jsonResponseObj.issues);
                this.setState({
                  jiraIssues: jsonResponseObj.issues,
                  jiraFetchStatus: ""
                });
              });
          });
      });

  }

  render() {
    

    return (
      <Box full="horizontal" align="center" pad={{ vertical: 'large' }}>
        {this.state.jiraFetchStatus}
      
        <JiraList issues={this.state.jiraIssues} />
        </Box>);
  }
}

export default JiraBoard;