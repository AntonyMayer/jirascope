export default function() {
    return fetch(`/api/tickets?status=inProgress`);
}