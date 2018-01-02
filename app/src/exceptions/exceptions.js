/**
 * List of projects not to be displayed in Jirascope
 * 
 * @param {string} projectName project name 
 */

const BAN_LIST = [
    'CDMJT'
]

export default function exception(projectName) {
    for (let except of BAN_LIST) {
        if (projectName === except) return true;
    }
    return false;
}