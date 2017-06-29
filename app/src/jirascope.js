//creating a global namespace
window.jirascope = {};
var jirascope = window.jirascope,
    jirascopeReady = false;

//default values
jirascope.defaults = {
    status: ['1', '4'],
    assignee: ['junkman', 'anton.kuzniatsou']
}

//search object - will be modified with filters
jirascope.search = {
    default: `?status=${jirascope.defaults.status.join('+')}&assignee=${jirascope.defaults.assignee.join('+')}`,
    current: ``
}

//utility methods
jirascope.utils = {
    //ticket status methods
    updateStatus(array) {
        this.status = array;
    },
    addStatus(status) {
        this.status.push(status);
    },
    //assignee methods
    updateAssignee(array) {
        this.assignee = array;
    },
    addAssignee(assignee) {
        this.assignee.push(assignee);
    }
}

//cold start - check for GET query values
if (window.location.search.length > 1) {
    jirascope.search.current = window.location.search;
} else {
    jirascope.search.current = jirascope.search.default;
    window.history.pushState({ state: jirascope.search.default }, jirascope.search.default, ('search' + jirascope.search.default));
}

jirascopeReady = true;
export default jirascopeReady;