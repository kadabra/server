export function createEndpoint(endpoint, component) {
  if (! component.name) return
  let created = new Promise(resolve => {
    let kadabra = component.$kadabra(component.connection.host)
    kadabra('endpoints').create(endpoint)
    resolve()
  })
  created
    .then(component.sub)
    .then(_=>{component.modal = false})
}

export function updateEndpoint(name, component) {
  let created = new Promise(resolve => {
    let kadabra = component.$kadabra(component.connection.host)
    kadabra('endpoints')
    .patch(name, {
      icon: component.icon
    })
    resolve()
  })
  created
    .then(component.sub)
    .then(_=>{component.modal = false})
}

export function deleteEndpoint(name, component) {
  let deleted = new Promise(resolve => {
    let kadabra = component.$kadabra(component.connection.host)
    kadabra('endpoints').remove(name)
    resolve()
  })
  deleted
    .then(component.sub)
    .then(_=>{component.modal = false})
}

export default {
  createEndpoint,
  updateEndpoint,
  deleteEndpoint,
}