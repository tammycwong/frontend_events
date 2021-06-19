export function deleteEvent(id) {
  return fetch(`http://localhost:3000/events/${id}`, {
        // ${params.id}`, {
        method: "DELETE"
    })
    .then((r) => r.json())
}