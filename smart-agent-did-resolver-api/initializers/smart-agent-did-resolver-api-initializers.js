'use strict'

const {
  api,
  Initializer
} = require('actionhero')

const evan = require('evan-did-resolver')

const {
  Resolver
} = require('did-resolver')

module.exports = class SmartAgentDidResolverApiInitializer extends Initializer {
  constructor () {
    super()
    this.name = 'did-resolver-api'
    this.loadPriority = 4100
    this.startPriority = 4100
    this.stopPriority = 4100
  }

  async initialize () {
    if (api.config.smartAgentDidResolverApi.disabled) {
      return
    }

    // specialize from blockchain smart agent library
    class SmartAgentDidResolverApi extends api.smartAgents.SmartAgent {
      async initialize () {
        await super.initialize()
      }

      async resolveDid(did) {
        const resolver = new Resolver(evan.getResolver())
        return api.config.eth.nameResolver
        //const didDocument = resolver.resolve(did)

        //return didDocument
      }
    }

    // start the initialization code
    const smartAgentDidResolverApi = new SmartAgentDidResolverApi(api.config.smartAgentDidResolverApi)
    await smartAgentDidResolverApi.initialize()

    // objects and values used outside initializer
    api.smartAgentDidResolverApi = smartAgentDidResolverApi
  }
}
