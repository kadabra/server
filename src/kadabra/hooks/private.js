const { authenticate } = require('@feathersjs/authentication').hooks;
const noPagination = require('./noPagination');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [noPagination],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
