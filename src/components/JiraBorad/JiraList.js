import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const JiraList = (props) => {
    let jiraIssues = props.issues;
    let jiraList = "";
    console.log(jiraIssues);
    const columns = [{
        Header: 'Jira ID',
        accessor: 'key' // String-based value accessors!
      }, {
        Header: 'Desc',
        accessor: 'fields.summary'
      }, {        
        Header: 'Priority',
        accessor: 'fields.priority.name' // Custom value accessors!
      },
      {        
        Header: 'Assignee',
        accessor: 'fields.assignee.displayName' // Custom value accessors!
      },
      {        
        Header: 'Status',
        accessor: 'fields.status.name' // Custom value accessors!
      } ];
    if(jiraIssues.length >0 )
    {
        // jiraIssues.forEach(jira => {
           
        // });
    }
    else{

    }
    return (
        <ReactTable data={jiraIssues} columns={columns} />
    );
};

export default JiraList;    