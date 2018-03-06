/**
 * List of projects not to be displayed in Jirascope
 * 
 * @param {string} projectName project name 
 */

const BAN_LIST = [
    'CDMJT',
    'SWD',
    'SMBDI',
    'SMCD',
    'SMFKK',
    'SMIDIG',
    'SUCGT',
    'SMSL',
]

export default function exception(projectName) {
    for (let except of BAN_LIST) {
        if (projectName === except) return true;
    }
    return false;
}