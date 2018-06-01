import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table';
import Box from 'grommet/components/Box';
import { jiraColumns } from '../JiraBorad/JiraColumns';
import { getJirasUsingFilter} from '../../common/JiraServer'
import ImplCustomerBoard from '../JiraBorad/ImplCustomerBoard';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tabs/Tab';

class ImplJiraBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            implJiras: []
        };
    }

    componentDidMount() {
        if(this.state.implJiras.length ==0)
        {
            getJirasUsingFilter(this.props.sessionName, this.props.sessionValue,12791).then(result => {
                this.setState({
                    implJiras: result.issues
                });
            });
        }
    }

    render() {
        return (
            <Box responsive={true} margin='xsmall'>
            { this.state.implJiras.length == 0  && 
                <Box  align='center'>Loading Data... Please Wait !! </Box> 
            }
            { this.state.implJiras.length >= 1 && 
                <Tabs>                
                    <Tab title="Jira List">
                        
                        <ReactTable key="single"
                            columns={jiraColumns} data={this.state.implJiras}
                            showPageJump={true} multiSort={true}
                            resizable={true}
                            filterable={true}
                            className='-striped -highlight jiraBorad' /> }
                    </Tab>
                    <Tab title="Customer Board">
                        <ImplCustomerBoard implJiras={this.state.implJiras} />  
                    </Tab>
                </Tabs>
            }
            </Box>            
        );
    }
}

export default ImplJiraBoard;