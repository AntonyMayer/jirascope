export default function() {
    return fetch(`/api/tickets`)
        .then(res => {
            return res.json();
        })
        .then(tickets => {
            let projects = {}, //temporary object for projects
                table = [ //will be passed to Table component
                    [ //headers (first row)
                        'Project',
                        'Key',
                        'Open',
                        'In Progress',
                        'Dev Complete',
                        'Dev Test',
                        'Tridion Publishing',
                        'Ready for test',
                        'Blocked',
                        'Closed',
                        'Assignees'
                    ]
                ],
                total = { //object contains total counters
                    opened: 0,
                    inProgress: 0,
                    devComplete: 0,
                    devTest: 0,
                    tridion: 0,
                    readyForTest: 0,
                    blocked: 0,
                    closed: 0
                };

            //create project and its counters
            tickets.forEach(ticket => {
                if (!projects[ticket.fields.project.key]) {
                    createRecord(ticket, projects);
                    updateRecord(ticket, projects, total);
                } else {
                    updateRecord(ticket, projects, total);
                }
            });

            //fill table 
            for (let project in projects) {
                let row = [
                    clearProjectName(projects[project]['name']), //full project name
                    project, //project key
                    projects[project]['opened'], //number tickets
                    projects[project]['inProgress'],
                    projects[project]['devComplete'],
                    projects[project]['devTest'],
                    projects[project]['tridion'],
                    projects[project]['readyForTest'],
                    projects[project]['blocked'],
                    projects[project]['closed'],
                    projects[project]['assignees'].join(', ') //list of assignees                
                ];
                table.push(row);
            }

            //add totals to the table
            table.push([
                'TOTAL',
                '-',
                total['opened'], //number tickets
                total['inProgress'],
                total['devComplete'],
                total['devTest'],
                total['tridion'],
                total['readyForTest'],
                total['blocked'],
                total['closed'],
                '-'
            ]);

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
        })
}

function createRecord(ticket, projects) {
    projects[ticket.fields.project.key] = {
        name: ticket.fields.project.name,
        project: ticket.fields.project.key,
        opened: 0,
        inProgress: 0,
        devComplete: 0,
        devTest: 0,
        tridion: 0,
        readyForTest: 0,
        blocked: 0,
        closed: 0,
        assignees: []
    }
}


function updateRecord(ticket, projects, total) {
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

    checkTicketFields(ticket);

    let status = ticket.fields.status.id,
        project = projects[ticket.fields.project.key],
        currentAssignee = ticket.fields.assignee.key;

    switch (status) {
        case "1":
        case "4":
            project.opened++;
            total.opened++;
            updateAssineeList(project, currentAssignee);
            break;
        case "10008":
            project.readyForTest++;
            total.readyForTest++;
            break;
        case "10037":
            project.inProgress++;
            total.inProgress++;
            updateAssineeList(project, currentAssignee);
            break;
        case "10076":
            project.devComplete++;
            total.devComplete++;
            break;
        case "10976":
            project.devTest++;
            total.devTest++;
            break;
        case "11276":
        case "10977":
            project.tridion++;
            total.tridion++;
            break;
        case "10035":
            project.blocked++;
            total.blocked++;
            break;
        case "6":
            project.closed++;
            total.closed++;
            break;

        default:
            break;
    }
}

/**
 * Check for necessary fields to avoid errors
 * 
 * @param {any} ticket 
 * @returns 
 */
function checkTicketFields(ticket) {
    if (ticket.fields.assignee === null) {
        ticket.fields.assignee = {
            key: 'Unassigned'
        }
    }
    if (ticket.fields.status === null) {
        ticket.fields.status = {
            id: 'Undefined'
        }
    }
    return ticket;
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
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
}

function clearProjectName(project) {
    if (project.length > 40) {
        return project.slice(0, 40).concat('\u2026');
    } else {
        return project;
    }
}