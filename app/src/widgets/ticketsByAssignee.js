export default function(tickets) {
    // console.log(tickets);
    if (tickets.status) {
        return [
            ['Loading...']
        ]
    }
    let assignees = {}, //temporary object for projects
        table = [],
        headers = ['Assignee'];

    //create project and its counters
    /**
     * CHEATLIST Transition's IDs:
     * 
     * 1        "Open"
     * 4        "Reopened"
     * 6        "Closed"
     * 10008    "Ready for Test"
     * 10035    "Blocked"
     * 10037    "In Progress"
     * 10076    "Dev Complete"
     * 10976    "Developer Test"
     * 10678    "Parking Lot"
     * 10977    "Assets Tridion Publishing"
     * 11276    "HTML Tridion Publishing"
     * 11076    "Ready for Live"
     */
    tickets.forEach(function(ticket) {
        if (checkTicketStatus(ticket)) {
            if (!assignees[ticket.fields.assignee.key]) {
                createRecord(assignees, ticket.fields.assignee.key);
            }
            createHeader(headers, ticket.fields.project.key);
            updateRecord(assignees, ticket.fields.assignee.key, ticket.fields.project.key);
        }
    });

    //add headers to table
    table.push(headers);

    //fill table => create rows => ["junk.man", 0, 0, 1, 0, 0]
    for (let assignee in assignees) {
        let row = Array(headers.length - 1).fill(0);
        for (let project in assignees[assignee]) {
            let index = headers.indexOf(project);
            if (index > -1) {
                row.splice((index - 1), 1, assignees[assignee][project]);
            }
        }
        row.splice(0, 0, clearAssigneeName(assignee));
        table.push(row);
    }

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
    return table;
}

function createRecord(assignees, assignee) {
    assignees[assignee] = {};
}

function createHeader(headers, project) {
    if (!headers.includes(project)) headers.push(project);
}

function updateRecord(assignees, assignee, project) {
    if (!assignees[assignee][project]) assignees[assignee][project] = 1;
    else assignees[assignee][project]++;
}

function checkTicketStatus(ticket) {
    let status = Number(ticket.fields.status.id);
    if (status !== 1 &&
        status !== 4 &&
        status !== 10008 &&
        status !== 10037 &&
        // status !== 10076 &&    // show/hide "Dev in progress tickets"
        status !== 10976 &&
        status !== 10977 &&
        status !== 11276) {
        return false;
    } else {
        return true;
    }
}

function clearAssigneeName(user) {
    let firstName = user.split('.')[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1, 10);
}