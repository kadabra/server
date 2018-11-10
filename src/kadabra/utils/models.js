const NeDB = require('nedb')
const path = require('path')

function modelMaker(endpointName) {
  return function(app) {
    const dbPath = app.get('nedb')
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