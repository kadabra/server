const { authenticate } = require('@feathersjs/authentication').hooks;
const noPagination = require('./../../kadabra/hooks/noPagination');

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

function magicWord(context) {
  if (context.arguments[0].magic !== process.env['MAGIC_WORD']) {
    throw new Error("That's not the magic word!")
  } else {
    console.log(`Magic word recognized, creating user: ${context.arguments[0].email}`)
    delete context.arguments[0].magic
    return context
  }
}

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt'), noPagination ],
    get: [ authenticate('jwt') ],
    create: [ magicWord, hashPassword(), ],
    update: [ hashPassword(),  authenticate('jwt') ],
    patch: [ hashPassword(),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
