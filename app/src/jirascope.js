/**
 * Configuration module
 * 
 * @class Jirascope contains data used across the app
 */

class Jirascope {
    constructor() {
        this.params = {
            status: ['1', '4'],
            assignee: ['junkman', 'anton.kuzniatsou']
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