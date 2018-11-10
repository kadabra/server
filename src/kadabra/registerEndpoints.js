const { read, serviceMaker } = require('./utils/services.js')


function registerEndpoints(after) {
  return function(app) {
    const newServices = read('src/kadabra/services.json')
    app.service('endpoints')
      .find()
      .then(oldServices => {
        // Array of Objects --> Object 
        let svcs = {}
        for (let os of oldServices.data || []) {
          svcs[os.name] = {
            desc: os.desc,
            id: os._id,
          }
        }
        return svcs
      })
      .then(oldSvcs => {
        // Delete removed services 
        for (let oldName of Object.keys(oldSvcs)) {
          if (! (oldName in newServices)) {
            app.service('endpoints').remove(oldSvcs[oldName].id)
          }
        }
        return oldSvcs
      })
      .then(oldSvcs => {
        for (let [name, desc] of Object.entries(newServices)) {
          if (name in oldSvcs) {
            // Patch existing services if description changed
            if (oldSvcs[name].desc != newServices[name]) {
              app.service('endpoints').patch(oldSvcs[name].id, {desc})
            }
          } else if (! ['users', 'endpoints', 'authentication', 'endpoint-manager'].includes(name)) {
            // Register new services in endppoint
            app.service('endpoints').create({name, desc})
          }
          // Create new services
          app.configure(serviceMaker(name))
        }
        return newServices
      })
      .then(d => after(d))
      .catch(e=>console.log(e))
  }
}

module.exports = {
  registerEndpoints
}