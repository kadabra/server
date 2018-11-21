const NeDB = require('nedb')
const path = require('path')

function modelMaker(endpointName) {
  return function(app) {
    let dbPath = process.env['KADABRA_FOLDER']
    const Model = new NeDB({
      filename: path.join(dbPath, endpointName+'.db'),
      autoload: true
    })

    return Model
  }
}

module.exports = {
  modelMaker
}