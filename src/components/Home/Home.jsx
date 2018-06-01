import React from 'react';
import ReactDOM from 'react-dom';
import Box from 'grommet/components/Box';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tabs/Tab';
import ImplJiraBoard from '../JiraBorad/ImplJiraBoard';
import { doUserLogin } from '../../common/JiraServer'
import Information from '../Home/Information';
import 'react-table/react-table.css';
import '../JiraBorad/JiraList.css';
import ImplWeeklyLog from '../ImplWeeklyLog';


import 'react-datepicker/dist/react-datepicker.css';

class Home extends React.Component {
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
      jiraFetchStatus: "Loading Data ... Please Wait"
    };
  }

  componentDidMount() {

    doUserLogin().then(sessionObject => {
      this.setState({
        loginSessionInfo: {
          name: sessionObject.session.name,
          value: sessionObject.session.value
        }
      });
    })
      .catch(ex => {
        console.log(ex);
      });
  }

  render() {

    /*if(this.state.jiraIssues.length==0)
    {
      return(<Box align='center'> <Tabs activeIndex={0}>
        <Tab title="Information"> {this.state.jiraFetchStatus}</Tab></Tabs></Box>);
    }
    else{*/
    return (

      <Tabs>
        <Tab title='Information'>
          <Information />
        </Tab>
        <Tab title='IMPL Jira Board'>
          <ImplJiraBoard
            sessionName={this.state.loginSessionInfo.name}
            sessionValue={this.state.loginSessionInfo.value} />
        </Tab>
        <Tab title='IMPL Weekly Work Log'>
          <ImplWeeklyLog sessionName={this.state.loginSessionInfo.name}
            sessionValue={this.state.loginSessionInfo.value} />
        </Tab>
      </Tabs>
    );
  }
}

export default Home;