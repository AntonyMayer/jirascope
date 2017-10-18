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
        //default teams
        this.teams = {
            dev: ['dan.granata', 
            'constantin.pojoga', 
            'william.ramirez', 
            'eric.nesser', 
            'brandon.houghton', 
            'kevin.middlesworth',
            'kyle.mcdonald', 
            'adrian.kopczewski', 
            'anton.kuzniatsou', 
            'matt.wade',
            'josefina.terrera'],
            qa: ['shelby.jones', 'luke.smarto', 'vasyl.stetsyuk', 'patrick.finn', 'alejandro.molina', 'alyssa.carabez'],
            cp: ['jack.white', 'brian.menard'],
            pm: ['jeremy.primm', 'joe.machak', 'meghan.turnure']
        }
        this.params = {
            status: [],
            assignee: this.teams.dev.concat(this.teams.qa).concat(this.teams.cp),
            updateRate: 5000 
        }
        this.search = {
            default: `?status=${this.params.status.join('+')}&assignee=${this.params.assignee.join('+')}`,
            current: ``
        }

        //placeholder for widgets data => fetches data from server on regular basis
        this.data = {status: 'loading'};

        //custom event - triggered when global updated is required
        this.globalUpdate = new Event('globalUpdate');

        //follow manual updates of location (i.e. user use forward/back browser navigation)
        this.setState = this.setState.bind(this);
        window.onpopstate = this.setState;

        this.state = this.getUrlParams(); //will be used to set initial state for all widgets
        this.getData = this.getData.bind(this);
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
    updateStatusList(array) {
        this.params.status = array;
    }

    //assignee methods
    updateAssigneeList(array) {
        this.params.assignee = array;
        this.updateState();
    }

    //history and location manipulations
    updateState() {
        this.updateHistory();
        this.state = this.getUrlParams();
        window.dispatchEvent(this.globalUpdate);
    }

    //if flag is set to true history object will not be updated    
    setState(flag) {
        this.state = this.getUrlParams();
        this.params.status = this.state.status;
        this.params.assignee = this.state.assignee;
        this.updateHistory(flag);
        window.dispatchEvent(this.globalUpdate);
        console.log('Jirascope state updated');
    }

    //if flag is set to true history object will not be updated    
    updateHistory(flag) {
        this.search.current = `?status=${this.params.status.join('+')}&assignee=${this.params.assignee.join('+')}`;
        if (!flag) window.history.pushState({ state: this.search.current }, this.search.current, ('search' + this.search.current));
    }

    getData() {
        fetch(`/api/tickets${this.search.current}`)
        .then(res => {
            return res.json();
        }).then(data => {
            this.data = data;
            window.dispatchEvent(this.globalUpdate);            
            /**
             * Data is a multidimensional array for building tables
             * 
             * [
             *    [cell, cell, ..., cell],  //row
             *    [cell, cell, ..., cell],  //row
             *    [cell, cell, ..., cell],  //row
             *    ...
             *    [cell, cell, ..., cell]   //row
             * ]
             */
        });
    }

    updateLoop() {
        this.getData();
        setInterval(_=> {
            this.getData();      
        }, this.params.updateRate)
    }

    //get params from location
    getUrlParams(url) {
        var queryString = url ? url.split('?')[1] : window.location.search.slice(1),
            params = {},
            tempData;

        queryString = queryString.split('#')[0];
        tempData = queryString.split('&');

        for (var i = 0; i < tempData.length; i++) {
            var currentParam = tempData[i].split('='),
                paramNum = undefined,
                paramName = currentParam[0],
                paramValue = typeof(currentParam[1]) === 'undefined' ? true : currentParam[1].split('+');

            if (params[paramName]) {
                if (typeof params[paramName] === 'string') {
                    params[paramName] = [params[paramName]];
                }
                if (typeof paramNum === 'undefined') {
                    params[paramName].push(paramValue);
                } else {
                    params[paramName][paramNum] = paramValue;
                }
            } else {
                params[paramName] = paramValue;
            }
        }
        if (!params.assignee) params.assignee = ['noname'];
        if (!params.status) params.status = ['1'];
        return params;
    }
}

export default (new Jirascope());