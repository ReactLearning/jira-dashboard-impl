import React from 'react';
import Box from 'grommet/components/Box';
import Text from 'grommet/components/Text';
import Anchor from 'grommet/components/Anchor';

const WorkLogCell = (props) => {
    return (
        <Box background='#efefef' style={{ 'borderColor': '#c7c7c7' }}
            direction='column' margin='xsmall' elevation='xsmall' >
            <Box direction='column'
                overflow='auto'
                background='white'
                wrap={true}
                style={{'fontSize':'14px'}}>
                <Box direction='row' fill='true' >
                    <Box basis='3/4' style={{ 'padding':'3px','display':'block' }} direction='row' align='center'>
                        {props.dayLog.priorityIconUrl && <img src={props.dayLog.priorityIconUrl} style={{'height':'16px','width':'16px'}} />}
                        
                        {props.dayLog.parentJiraId && 
                            <img src={props.dayLog.parentIssueTypeIconUrl} />
                        }
                        {props.dayLog.parentJiraId && 
                            <Anchor label={props.dayLog.parentJiraId} href={props.dayLog.parentJiraUrl} target='_blank'/>
                        }
                        {props.dayLog.parentJiraId && "/" }
                        <img src={props.dayLog.issueTypeIconUrl} />
                        <Anchor label={props.dayLog.jiraId} href={props.dayLog.jiraUrl} target='_blank'/>
                    </Box>
                    <Box basis='1/4' style={{ 'textAlign': 'right','padding':'3px','display':'block' }}>                        
                        {props.dayLog.timeSpent}
                    </Box> 
                    
                </Box>
                { props.dayLog.chargeCode != undefined &&
                <Box fill='horizontal' style={{ 'padding':'3px' }}>
                    {props.dayLog.chargeCode}
                </Box>
                }
                { props.dayLog.comment != undefined &&                
                    <Box overflow='auto'  wrap={true} style={{ 'padding':'3px','height':'36px' }}>
                    {props.dayLog.comment}
                </Box>
                }
                
            </Box>
        </Box>
    );

}

export default WorkLogCell;