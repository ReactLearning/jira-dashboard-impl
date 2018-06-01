import React from 'react';
import { jiraServerUrl } from '../common/DashboardConstants';

const doUserLogin = async () =>
{
    let sessionObject = [];
    await fetch(jiraServerUrl+"userLoginLocal", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'    
      },
      json: true
    }).then(result => result.json())
      .then(jsonResponseObj => {
        sessionObject = jsonResponseObj;
    });
    return sessionObject;
}
const getJirasUsingFilter = async (loginName, sessionValue, filterId)  =>
{    
    let jiraFilterResObj = await getJiraFilterInformation(filterId);
    let implJiras = await getJirasUsingJql(jiraFilterResObj.jql,loginName,sessionValue,[]);    
    return implJiras;   
}

const getJiraFilterInformation = async (filterId) =>
{
    let jiraFilterResObj;
    await fetch(jiraServerUrl+"filterLocal/"+filterId)
        .then(result => jiraFilterResObj = result.json());       
    return jiraFilterResObj;
}
const getJirasUsingJql = async (jql,loginName,sessionValue,fields) =>
{
    if(fields.length ==0 )
    {
        fields = ["*all"];
    }
    let searchJiraResObj;
    await fetch(jiraServerUrl+"searchJiraLocal", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "searchJql": jql,
            "name": loginName,
            "value": sessionValue,
            "fields" : fields,
            "expand": ["issues.renderedFields"]
        }),
        json: true
    })
    .then(result => searchJiraResObj = result.json())
    .catch(() => searchJiraResObj = undefined);
    return searchJiraResObj;
}
export { getJiraFilterInformation, getJirasUsingJql, getJirasUsingFilter, doUserLogin };