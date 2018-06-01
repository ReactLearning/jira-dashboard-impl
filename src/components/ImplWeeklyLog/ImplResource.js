import React from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Grid from 'grommet/components/Grid';
import Text from 'grommet/components/Text';
import Meter from 'grommet/components/Meter';
import WorkLogDay from '../ImplWeeklyLog/WorkLogDay';
import Accordian from '../Accordian/Accordian';
import moment from 'moment';
import lodash from 'lodash';

const ImplResource = (props) => {
    // return(
    //     <Box pad='xsmall' margin='xsmall' direction='column' alignContent='between'  animation='fadeIn'>
    //         <Box alignSelf='center'  align='center' ><Heading level={3} margin='small'>{props.name}</Heading></Box>
    //         <Box alignSelf='center'  align='center'><Heading level={3} margin='small'>34h</Heading>
    //         <Meter type='circle' round={true} thickness='xsmall' size='xsmall' values={[{ 'value': '80' }]} /></Box>
    //     </Box>
    // );
    
    //console.log(props.developerWorkLogs.workLogs);
    const startDateProp = moment(props.workLogStartDate,"MM/DD/YYYY");    
    const weekDays = ["mon","tue","wed","thu","fri"];    
    let totalHours = lodash.sumBy(props.developerWorkLogs.workLogs, 'timeSpentSeconds') / 3600;    
    totalHours = Math.round(totalHours * 10) / 10;
    return (
        <Accordian title={props.title + "  -  "+totalHours +"h"} flex={false} >
            <Box fill='vertical' pad={{ horizontal: 'small', bottom: 'small', top: 'small' }}>
                <Grid responsive={true} align='stretch' fill='horizontal'
                    areas={[
                        { name: 'mon', start: [0, 0], end: [0, 0] },
                        { name: 'tue', start: [1, 0], end: [1, 0] },
                        { name: 'wed', start: [2, 0], end: [2, 0] },
                        { name: 'thu', start: [3, 0], end: [3, 0] },
                        { name: 'fri', start: [4, 0], end: [4, 0] },

                    ]}
                    columns={['small'['small']]}
                    rows={['small'['small']]}
                    gap='small'>

                    {
                        weekDays.map((weekDay, index) =>{
                            let currentDayWorkLogs = props.developerWorkLogs.workLogs.filter(
                                logs => logs.startDate == startDateProp.startOf('week').add(index+1, 'day').format('DD/MM/YYYY'));
                            
                            return <WorkLogDay 
                                    gridArea={weekDay} 
                                    date={startDateProp} 
                                    addDay = {index+1}
                                    workLogs = {currentDayWorkLogs}
                                    key={weekDay+props.developerWorkLogs.developerName+index}
                                    />;
                        }) 
                    }                    
                </Grid>
            </Box>
        </Accordian>
    );
}

export default ImplResource;