export default function() {
    return fetch(`/api/tickets?status=open`)
        .then(res => {
            return res.json();
        })
        .then(tickets => {
            let projects = {}, //temporary object
                table = []; //will be passed to Table component

            //create project and its counters
            tickets.forEach(ticket => {
                if (!projects[ticket.fields.project.key]) {
                    createRecord(ticket, projects);
                } else {
                    updateRecord(ticket, projects);
                }
            });

            //fill table 
            for (let project in projects) {
                // console.log(projects[project]);
                let row = [project, projects[project]['opened']];
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
        })
}

function createRecord(ticket, projects) {
    projects[ticket.fields.project.key] = {
        name: undefined,
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


function updateRecord(ticket, projects) {
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
        case 1:
        case 4:
            project.opened++;
            updateAssineeInitialsList(project, currentAssignee);
            break;
        case 10008:
            project.readyForTest++;
            break;
        case 10037:
            project.inProgress++;
            updateAssineeInitialsList(project, currentAssignee);
            break;
        case 10076:
            project.devComplete++;
            break;
        case 10976:
            project.devTest++;
            break;
        case 11276:
        case 10977:
            project.tridion++;
            break;
        case 10035:
            project.blocked++;
            break;
        case 6:
            project.closed++;
            break;

        default:
            // console.log(ticket);
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
function updateAssineeInitialsList(project, currentAssignee) {
    if (project.assignees.indexOf(currentAssignee) < 0) {
        project.assignees.push(currentAssignee);
    }
}
