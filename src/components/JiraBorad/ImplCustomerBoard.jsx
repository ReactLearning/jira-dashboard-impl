import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table';
import Box from 'grommet/components/Box';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { projectNames, projectColumns, jiraColumns } from '../JiraBorad/JiraColumns';

const ImplCustomerBoard = (props) => {
    let uniqueProjectNames = projectNames(props.implJiras);
    return (
        <Box>
            <BarChart width={730} height={250} data={uniqueProjectNames} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="projectName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="projectJiraCount" fill="#8884d8" />
            </BarChart> 
            <ReactTable key="client"
                columns={projectColumns} data={uniqueProjectNames}
                showPageJump={true} multiSort={true}
                resizable={true}
                filterable={true}
                showPageSizeOptions={false}
                defaultPageSize={uniqueProjectNames.length}
                className='-striped -highlight jiraBorad'
                SubComponent={(row) => {
                    return (
                        <ReactTable key={row.original.projectName}
                            data={props.implJiras.filter((elem, index, array) => {
                                return (elem.fields.project.name == row.original.projectName);
                            })} columns={jiraColumns}
                            //minRows={row.original.projectJiraCount < 20 ? row.original.projectJiraCount : 20}
                            minRows={row.original.projectJiraCount}
                            showPageJump={true} multiSort={true}
                            resizable={true}
                            filterable={true}
                            className='-striped -highlight jiraBorad' />
                    )
                }}
            />

        </Box>
    );
}

export default ImplCustomerBoard;