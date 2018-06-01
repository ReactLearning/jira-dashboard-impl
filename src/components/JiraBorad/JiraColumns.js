import React from 'react';
const jiraColumns = [
    {
      Header: 'T',
      accessor: 'fields.issuetype', // String-based value accessors!
      headerClassName: 'jiraBoradHeader',
      Cell: props => <span><img src={props.value.iconUrl} title={props.value.name} /></span>,
      // Cell: props => <span>{props.value}</span>,
      maxWidth: 60,
      filterMethod: (filter, row) => {
        if (filter.value === "all")
          return true;
        else
          return row[filter.id].name.startsWith(filter.value);
      },
      Filter: ({ filter, onChange }) =>
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: "100%" }}
          value={filter ? filter.value : "all"}
        >
          <option value="all">All</option>
          <option value="B">Bug</option>
          <option value="D">Dev</option>
          <option value="R">Req</option>
          <option value="T">Task</option>
        </select>
    }, {
      Header: 'Jira ID',
      accessor: 'key', // String-based value accessors!
      headerClassName: 'jiraBoradHeader',
      maxWidth: 140
    },
    {
      Header: 'Project',
      accessor: 'fields.project.name', // String-based value accessors!
      headerClassName: 'jiraBoradHeader',
      Cell: props => <span>{props.value}</span>,
      id: 'jiraProjectName',
      show: false
    },
    {
      Header: 'Desc',
      accessor: 'fields.summary',
      Cell: props => <div className="wordwrap"> {props.value}</div>,
      headerClassName: 'jiraBoradHeader',
      filterMethod: (filter, row) => {
        return row[filter.id].toLowerCase().includes(filter.value.toLowerCase());
      }
    }, {
      Header: 'Priority',
      accessor: 'fields.priority', // Custom value accessors!
      className: 'jiraPriority',
      headerClassName: 'jiraBoradHeader',
      Cell: props => <span><img src={props.value.iconUrl} title={props.value.name} /> {props.value.name}</span>,
      // Cell: props => <span>{props.value}</span>,
      maxWidth: 150,
      filterMethod: (filter, row) => {
        return row[filter.id].name.startsWith(filter.value);
      },
      
    },
    {
      Header: 'Assignee',
      accessor: 'fields.assignee.displayName', // Custom value accessors!
      Cell: props => <span> {props.value.split(" ")[0]}</span>,
      headerClassName: 'jiraBoradHeader',
      maxWidth: 90
    },
    {
      Header: 'Status',
      accessor: 'fields.status.name', // Custom value accessors!
      headerClassName: 'jiraBoradHeader',
      maxWidth: 180
    },
    {
      Header: 'Charge Code',
      accessor: 'fields.customfield_10570', // Custom value accessors!
      headerClassName: 'jiraBoradHeader',
      maxWidth: 350,
      Cell: props => <div className="wordwrap"> {props.value}</div>,
    }];

const projectColumns = [{
    Header: 'Project Name',
    accessor: 'projectName', // String-based value accessors!
    headerClassName: 'jiraBoradHeader',
    maxWidth: 500
    // columns : jiraColumns
  },
  {
    Header: 'Jira Count',
    accessor: 'projectJiraCount', // String-based value accessors!
    headerClassName: 'jiraBoradHeader'
  }];

let projectNames = (jiraIssues) =>{
    var _ = require("lodash");
  let uniqueProjectNames = _.countBy(jiraIssues, function (jiraIssues) { return jiraIssues.fields.project.name; });

  let projectKeys = _.keys(uniqueProjectNames).sort();
  let projectJiraCount = _.values(uniqueProjectNames);
  let tempUniqueProjectNames = uniqueProjectNames;
  uniqueProjectNames = [];
  for (let i = 0; i < projectKeys.length; i++) {
    uniqueProjectNames.push({ 'projectName': projectKeys[i], 'projectJiraCount': tempUniqueProjectNames[projectKeys[i]] });
  }
  return uniqueProjectNames;
};

export {projectNames, projectColumns, jiraColumns};