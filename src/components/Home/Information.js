import React from 'react';
import Grid from 'grommet/components/Grid';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import {jiraBoardInfo,weeklyLogInfo,reportInfo} from '../../common/DashboardConstants';

const Information = (props) => {

    return(
        <Grid responsive={true} 
                    areas={[
                        { name: 'info1', start: [0, 0], end: [0, 0] },
                        { name: 'info2', start: [1, 0], end: [1, 0] },
                        { name: 'info3', start: [2, 0], end: [2, 0] }
                        // { name: 'thu', start: [3, 0], end: [3, 0] },
                        // { name: 'fri', start: [4, 0], end: [4, 0] },

                    ]}
                    columns={['1/3']}
                    rows={['1/3']}
                    gap='small'>
                    
                    <InformationBlock 
                        gridArea='info1'
                        bgColor='#f9b931' 
                        blockHeader='Jira Board' 
                        blockData={jiraBoardInfo} />
                    <InformationBlock 
                        gridArea='info2' 
                        bgColor='#f9b931' 
                        blockHeader='Weekly WorkLog' 
                        blockData={weeklyLogInfo} />
                    <InformationBlock 
                        gridArea='info3' 
                        bgColor='#f9b931' 
                        blockHeader='Graphical Reports' 
                        blockData={reportInfo} />                                                           
                </Grid>
    );

}
export default Information;
//bgColor='#30ff33' 
//bgColor='#319cf9' 
const InformationBlock = (props) => {

    return(
        <Box gridArea={props.gridArea}
            background={{color:props.bgColor,opacity:'medium'}} 
            border={{'side':'all','size':'small'}} 
            round='small'
            margin='medium'
            pad='medium'>
            <Heading level='3' margin='small' size='medium' >{props.blockHeader}</Heading>
            {props.blockData}
        </Box>

    );
}