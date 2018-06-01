import React from 'react';
import Box from 'grommet/components/Box';
import Grid from 'grommet/components/Grid';
import Meter from 'grommet/components/Meter';
import Text from 'grommet/components/Text';
import WorkLogCell from '../ImplWeeklyLog/WorkLogCell';
import moment from 'moment';
import lodash from 'lodash';

const WorkLogDay = (props) => {
    
    // let currentDayWorkLogs = props.workLogs.filter(
    //     logs => logs.updatedDate == props.date.startOf('week').add(props.addDay, 'day').format('DD/MM/YYYY'));
    
    let dayHours = lodash.sumBy(props.workLogs, 'timeSpentSeconds') / 3600 ;
    dayHours = Math.round(dayHours * 10) / 10;
    let workLogMeterValue = (((dayHours - 0) * (100 - 0)) / (8 - 0));
    return (
        <Box responsive={true} elevation='small' overflow='auto'>
            <Box direction='row' overflow='auto'>
                <Box fill='horizontal' pad='small' >
                    <Text weight='bold'>
                        {props.date.startOf('week').add(props.addDay, 'day').format('ddd, MMM D')}
                    </Text>
                </Box>
                <Box fill='horizontal' pad='small' style={{ 'textAlign': 'right' }}><Text weight='bold'>{dayHours}</Text></Box>
            </Box>
            <Box>
                <Meter type='bar' thickness='xsmall' values={[{'value': workLogMeterValue}]} />
            </Box>
            <div style={{ 'padding': '2px' }} />
            {
                props.workLogs.map((dayLog ,index) => {                    
                    return <WorkLogCell 
                                key={dayLog.jiraId+index} 
                                dayLog = {dayLog}
                                dayHours = {dayHours}/>;
                })
            }
        </Box>
    );
}

export default WorkLogDay;