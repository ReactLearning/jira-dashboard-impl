import React from 'react';
import Box from 'grommet/components/Box';
import Grid from 'grommet/components/Grid';
import Text from 'grommet/components/Text';
import '../ImplWeeklyLog/ImplWeeklyLog.css';
import DatePicker from 'react-datepicker';
import Heading from 'grommet/components/Heading';
import moment from 'moment';
import WorkLogDay from '../ImplWeeklyLog/WorkLogDay';
import ImplResource from '../ImplWeeklyLog/ImplResource';
import Accordian from '../Accordian/Accordian';
import { fetchImplWeeklyWorkLog } from '../ImplWeeklyLog/ImplWorkLogBuilder';


class ImplWeeklyLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(),
            dataFetched : true,
            weekStartDate: moment().format("MM/DD/YYYY"),
            weeklyLoggedJiraIssues: []
        };
        this.weekDateChange = this.weekDateChange.bind(this);
    }
    async weekDateChange(date) {
        this.setState({
            startDate: date,
            dataFetched : false,
            weekStartDate: date.format("MM/DD/YYYY")
        });
        let weeklyIssues = await fetchImplWeeklyWorkLog(date.format("MM/DD/YYYY"), this.props.sessionName, this.props.sessionValue);

        this.setState({
            weeklyLoggedJiraIssues: weeklyIssues,
            dataFetched : weeklyIssues !=undefined ? true : false
        });
    }
    render() {
        return (
            <Box responsive={true} align='center' >
                <Box direction='row'>
                    <Box margin='small'>
                        <Heading level={4} margin='none'>
                            Select Week :
                        </Heading>
                    </Box>
                    <Box margin='small'>

                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.weekDateChange}
                            dateFormat="ddd, MMM D Y" />
                    </Box>
                </Box>
                {   this.state.dataFetched && this.state.weeklyLoggedJiraIssues.map((developerLogHistory,index) => {
                    return <ImplResource key={developerLogHistory.developerName+index} 
                                         workLogStartDate={this.state.weekStartDate} 
                                         title={developerLogHistory.developerName}
                                         developerWorkLogs = {developerLogHistory} />;})
                }
                {
                    (!this.state.dataFetched && this.state.weeklyLoggedJiraIssues!= undefined) && <Box>Loading Data... Please Wait !! </Box>
                }
                {
                    (!this.state.dataFetched && this.state.weeklyLoggedJiraIssues === undefined)
                     && <Box>Error ... Please refresh page OR Check for Server running or not</Box>
                }                
            </Box>
        );
    }
}
export default ImplWeeklyLog;