
// Initializes the `example` service on path `/example`
const createService = require('feathers-nedb');
const { modelMaker } = require('./models.js')
const { default: hooks } = require('./hooks.js');
const fs = require('fs')

function read(filepath) {
  return JSON.parse(fs.readFileSync(filepath))
}

function write(filepath, obj) {
  JSON.stringify(fs.writeFileSync(filepath, JSON.stringify(obj), () => {}))
}

function serviceMaker(endpointName) {
  return function(app) {
    const EndpointModel = modelMaker(endpointName);
    const Model = EndpointModel(app);
    const paginate = app.get('paginate');

    const options = {
      Model,
      paginate
    };
    
    app.use('/' + endpointName, createService(options));
    
    const service = app.service('endpoints');
    service.hooks(hooks);
  }  
}

module.exports = {
  read,
  write,
  serviceMaker,
}