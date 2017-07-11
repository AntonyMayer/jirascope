import Jirascope from '../jirascope';

export default function() {
    Jirascope.setState(true);
    return fetch(`/api/tickets${Jirascope.search.current}`)
        .then(res => {
            return res.json();
        })
        .then(tickets => {
            let assignees = {}, //temporary object for projects
                table = [],
                headers = [];

            //create project and its counters
            tickets.forEach(ticket => {
                if (!assignees[ticket.fields.assignee.key]) {
                    createRecord(assignees, ticket.fields.assignee.key);
                    updateRecord(assignees, ticket.fields.assignee.key, ticket.fields.project.key);
                    headers.push(ticket.fields.project.key);
                } else {
                    updateRecord(assignees, ticket.fields.assignee.key, ticket.fields.project.key);
                }
            });

            //fill table 
            // for (let project in projects) {
            //     let row = [
            //         clearProjectName(projects[project]['name']), //full project name
            //         project, //project key
            //         projects[project]['opened'], //number tickets
            //         projects[project]['inProgress'],
            //         projects[project]['devComplete'],
            //         projects[project]['devTest'],
            //         projects[project]['tridion'],
            //         projects[project]['readyForTest'],
            //         projects[project]['blocked'],
            //         projects[project]['closed'],
            //         projects[project]['assignees'].join(', ') //list of assignees                
            //     ];
            //     if (checkRow(row.slice(2,9))) table.push(row);
            // }

            //add totals to the table
                // table.push([
                //     'TOTAL',
                //     '-',
                //     total['opened'], //number tickets
                //     total['inProgress'],
                //     total['devComplete'],
                //     total['devTest'],
                //     total['tridion'],
                //     total['readyForTest'],
                //     total['blocked'],
                //     '-',
                //     // total['closed'],
                //     '-'
                // ]);

            /**
             * Return multidimensional array
             * 
             * [
             *    [cell, cell, ..., cell],  //row
             *    [cell, cell, ..., cell],  //row
             *    [cell, cell, ..., cell],  //row
             *    ...
             *    [cell, cell, ..., cell]   //row
             * ]
             */
            console.log(assignees);
            console.log(headers);
            return table;
        })
}

function createRecord(assignees, assignee) {
    assignees[assignee] = {};
}

function updateRecord(assignees, assignee, project) {
   if (!assignees[assignee][project]) assignees[assignee][project] = 1;
   else assignees[assignee][project]++;
}

//eliminate rows with unidentified ticket status and other weird staff (i.e. 0 0 0 0 0 0 0 rows)
function checkRow(row) {
    let totalTickets = 0;
    for (let elm of row) {
        if (elm > 0) {
            totalTickets++;
        }
    } 
    if (totalTickets > 0) return true;
    return false;
}

/**
 * Update list of assignees' initials for table w/ projects
 * 
 * @param {any} project 
 * @param {any} currentAssignee 
 */
function updateAssineeList(project, currentAssignee) {
    currentAssignee = clearAssigneeName(currentAssignee);
    if (project.assignees.indexOf(currentAssignee) < 0) {
        project.assignees.push(currentAssignee);
    }
}

function clearAssigneeName(user) {
    let firstName = user.split('.')[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1, 10);
}

function clearProjectName(project) {
    if (project.length > 30) {
        return project.slice(0, 30).concat('\u2026');
    } else {
        return project;
    }
}