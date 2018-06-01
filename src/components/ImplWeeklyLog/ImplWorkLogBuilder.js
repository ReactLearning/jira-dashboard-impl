import React from 'react';
import { getJirasUsingJql } from '../../common/JiraServer';
import moment from 'moment';
import { jiraPrefixUrl } from '../../common/DashboardConstants';
import dash from 'lodash';

const fetchImplWeeklyWorkLog = async (weekStartDate, sessionName, sessionValue) => {
    let weeklyLoggedImplJiras = [];
    let selectedWeek = moment(weekStartDate, "MM/DD/YYYY");
    
    let fromDate = selectedWeek.startOf('week').add(1, 'day').format("YYYY-MM-DD");
    let thruDate = selectedWeek.startOf('week').add(6, 'day').format("YYYY-MM-DD");
    
    //let searchJql = "project IN (G8) AND workLogDate >= "+fromDate+" AND workLogDate <= "+thruDate;
    let searchJql = "workLogDate >= "+fromDate+" AND workLogDate <= "+thruDate;
    //let fields = ['*all'];
    let fields = ["key","worklog","issuetype","timespent","priority","progress","aggregatetimespent","aggregateprogress","customfield_10570","parent"];
    let jqlSearchResult = await getJirasUsingJql(searchJql, sessionName, sessionValue, fields);

    weeklyLoggedImplJiras = jqlSearchResult != undefined ? extractDeveloperWeeklyLogs(jqlSearchResult.issues, fromDate,thruDate) : undefined;

    return weeklyLoggedImplJiras;
}

const extractDeveloperWeeklyLogs = (jiraIssues,fromDate, thruDate) => {
    
    
    let workLogArr = [];
    let outputJiras = [];
    let developerNames = new Set();
    if(jiraIssues === undefined)
    {
        return undefined;
    }
    jiraIssues.forEach(jira => {        
        
        jira.fields.worklog.worklogs.forEach(wl => {        
            wl = dash.mergeWith(wl, { "jiraId": jira.key });
            wl = dash.mergeWith(wl, { "jiraUrl": jiraPrefixUrl+jira.key });
            wl = dash.mergeWith(wl, { "issueTypeIconUrl": jira.fields.issuetype.iconUrl });
            wl = dash.mergeWith(wl, { "parentIssueTypeIconUrl": (jira.fields.parent!=undefined ? jira.fields.parent.fields.issuetype.iconUrl: undefined) });
            wl = dash.mergeWith(wl, { "priorityIconUrl": (jira.fields.parent!=undefined ? jira.fields.parent.fields.priority.iconUrl : jira.fields.priority.iconUrl) });
            wl = dash.mergeWith(wl, { "parentJiraId": (jira.fields.parent!=undefined ? jira.fields.parent.key: undefined) });
            wl = dash.mergeWith(wl, { "parentJiraUrl": (jira.fields.parent!=undefined ? jiraPrefixUrl+jira.fields.parent.key: undefined) });
            wl = dash.mergeWith(wl, { "chargeCode": jira.fields.customfield_10570!=undefined ? jira.fields.customfield_10570 :undefined  });
            //customfield_10570
            workLogArr = dash.concat(workLogArr, wl);
        });
    });
    
    workLogArr.forEach(wl => {
        developerNames.add(wl.author.displayName);
    });

    let cnt = 0;
    developerNames.forEach(dev => {
        outputJiras.push({});
        outputJiras[cnt]["developerName"] = dev;
        outputJiras[cnt]["workLogs"] = [];
        cnt++;
    });

    workLogArr.forEach(wl => {
        let index = outputJiras.findIndex(s => s.developerName == wl.author.displayName);        
        if (new moment(wl.started).isBetween(fromDate, thruDate, null, '[]')) {
            outputJiras[index]["workLogs"].push({
                "createdDate": new moment(wl.created).format("DD/MM/YYYY"),
                "updatedDate": new moment(wl.updated).format("DD/MM/YYYY"),
                "startDate": new moment(wl.started).format("DD/MM/YYYY"),
                "jiraId": wl.jiraId,
                "parentJiraId": wl.parentJiraId,
                "timeSpent": wl.timeSpent,
                "timeSpentSeconds": wl.timeSpentSeconds,
                "comment" : wl.comment,
                "issueTypeIconUrl" : wl.issueTypeIconUrl,
                "parentIssueTypeIconUrl" : wl.parentIssueTypeIconUrl,
                "priorityIconUrl" : wl.priorityIconUrl,
                "jiraUrl" : wl.jiraUrl,
                "parentJiraUrl" : wl.parentJiraUrl,
                "chargeCode" : wl.chargeCode
            });
        }
    });
    outputJiras = dash.sortBy(outputJiras,["developerName"]);
    return outputJiras;

}
export { fetchImplWeeklyWorkLog };