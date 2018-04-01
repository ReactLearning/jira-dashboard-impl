import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../JiraBorad/JiraList.css';

const JiraList = (props) => {
  let jiraIssues = props.issues;
  let jiraList = "";
  console.log(jiraIssues);
  const columns = [{
    Header: 'Jira ID',
    accessor: 'key', // String-based value accessors!
    headerClassName: 'jiraBoradHeader'
  }, {
    Header: 'Desc',
    accessor: 'fields.summary',
    headerClassName: 'jiraBoradHeader'
  }, {
    Header: 'Priority',
    accessor: 'fields.priority', // Custom value accessors!
    className: 'jiraPriority',
    headerClassName: 'jiraBoradHeader',
    Cell: props => <span><img src={props.value.iconUrl} title={props.value.name} /> {props.value.name}</span>
  },
  {
    Header: 'Assignee',
    accessor: 'fields.assignee.displayName', // Custom value accessors!
    Cell: props => <span> {props.value.split(" ")[0]}</span>,
    headerClassName: 'jiraBoradHeader'
  },
  {
    Header: 'Status',
    accessor: 'fields.status.name', // Custom value accessors!
    headerClassName: 'jiraBoradHeader'
  },
  {
    Header: 'Charge Code',
    accessor: 'fields.customfield_10570', // Custom value accessors!
    headerClassName: 'jiraBoradHeader'
  }];
  if (jiraIssues.length > 0) {
    // jiraIssues.forEach(jira => {

    // });
  }
  else {

  }
  return (
    <ReactTable data={jiraIssues} columns={columns}
      sortable={true}
      showPageJump={true} multiSort={true}
      resizable={true}
      filterable={false}
      className='jiraBorad'
    />
  );
};

export default JiraList;    