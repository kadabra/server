const { read, write } = require('./utils/services.js')
const path = require('path');
const fs = require('fs');

const systemEndpoints = ['users', 'endpoints', 'authentication']
const requiredKeys = ['name']

function validate(endpoint, services) {
  let errors = []

  // Confirm that feathers and kadabra system endpoints are excluded
  if (systemEndpoints.includes(endpoint.name)) {
    errors.push('Name cannot be in : ' + ', '.join(systemEndpoints))
  }

  // Confirm that required keys are included
  for (let requiredKey of requiredKeys) {
    if (! (requiredKey in endpoint)) {
      errors.push('Missing required key ' + requiredKey)  
    }
  }

  // Confirm that the endpoint does not already exist
  if (endpoint.name && endpoint.name in services) {
    errors.push('Endpoint with that name already exists')
  }

  return errors
}


module.exports = {
  
  async find() {
    return Promise.resolve(read(process.env['KADABRA_SERVICES']));
  },

  async create(endpoint) {
    const services = read(process.env['KADABRA_SERVICES'])
    const errors = validate(endpoint, services)
    if (errors.length) { 
      return {errors, message: 'failed'}
    } else {
      services[endpoint.name] = endpoint
      write(process.env['KADABRA_SERVICES'], services)
      console.log('created endpoint ' + endpoint.name)
      return { message: 'success' }
    }
  },

  async patch(name, options) {
    const services = read(process.env['KADABRA_SERVICES'])
    if (name in services) {
      services[name] = Object.assign({}, services[name], options) 
      write(process.env['KADABRA_SERVICES'], services)
      console.log('patched endpoint ' + name)
      return {message: 'patched'}
    } else {
      return {message: "not found"}
    }
  },

  async remove(name, options) {
    const services = read(process.env['KADABRA_SERVICES'])
    if (name in services) {
      const dbFilepath = path.join(process.env['KADABRA_FOLDER'], `${name}.db`)
      const db = fs.readFileSync(dbFilepath)
      const dbContents = db.toString('utf8')
      
      if (!dbContents.length || options.deleteData) {
        fs.unlink(dbFilepath, _=>_)
        console.log('deleted db file')
      }
      
      delete services[name]
      write(process.env['KADABRA_SERVICES'], services)
      console.log('deleted endpoint ' + name)
      return {message: 'removed'}
    } else {
      return {message: "not found"}
    }
  }

}