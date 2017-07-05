/**
 * Configuration module
 * 
 * @class Jirascope contains data used across the app
 *
 * CHEATLIST Transition's IDs:
 * 
 * 1        "Open"
 * 4        "Reopened"
 * 6        "Closed"
 * 10008    "Ready for Test"
 * 10035    "Blocked"
 * 10037    "In Progress"
 * 10038    "Done"
 * 10076    "Dev Complete"
 * 10976    "Developer Test"
 * 10678    "Parking Lot"
 * 10977    "Assets Tridion Publishing"
 * 11276    "HTML Tridion Publishing"
 * 11076    "Ready for Live"
 */

class Jirascope {
    constructor() {
            this.teams = {
                dev: ['dan.granata', 'constantin.pojoga', 'william.ramirez', 'eric.nesser', 'brandon.houghton', 'kyle.mcdonald', 'adrian.kopczewski', 'anton.kuzniatsou', 'matt.wade'],
                qa: ['shelby.jones', 'luke.smarto', 'vasyl.stetsyuk', 'patrick.finn', 'alejandro.molina']
            }
            this.params = {
                status: [],
                assignee: this.teams.qa
            }
            this.search = {
                default: `?status=${this.params.status.join('+')}&assignee=${this.params.assignee.join('+')}`,
                current: ``
            }
            this.init();
        }
        //initialization
    init() {
            if (window.location.search.length > 1) {
                this.search.current = window.location.search;
            } else {
                this.search.current = this.search.default;
                window.history.pushState({ state: this.search.default }, this.search.default, ('search' + this.search.default));
            }
        }
        //status methods
    updateStatus(array) {
        this.params.status = array;
    }
    addStatus(status) {
        this.params.status.push(status);
    }
    clearStatus() {
            this.params.status = [];
        }
        //assignee methods
    updateAssignee(array) {
        this.assignee = array;
    }
    addAssignee(assignee) {
        this.assignee.push(assignee);
    }
    clearAssignees() {
        this.params.assignee = [];
    }
}

export default (new Jirascope());