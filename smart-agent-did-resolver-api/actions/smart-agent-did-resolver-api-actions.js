'use strict'
const { Action, api } = require('actionhero')

const rxEtherAccount = /^0x[\da-fA-F]{40}/

class SmartAgentDidResolverApiResolve extends Action {
  constructor () {
    super()
    this.name = 'resolve/:did'
    this.description = 'Resolve DIDs to DID documents'
    this.inputs = {
      did: { required: true }
    }
    this.outputExample = { }
    // this.middleware = ['ensureEvanAuth']
  }

  accountValidator (param) {
    if (!param.match(rxEtherAccount)) {
      throw new Error('not a valid account address')
    }
  }

  async run ({ params, response }) {
    try {
      response.did = await api.smartAgentDidResolverApi.resolveDid(params.did)
    } catch (ex) {
      api.log(ex)
      response.status = 'error'
      response.error = ex
    }
  }
}

module.exports = {
  SmartAgentDidResolverApi: SmartAgentDidResolverApiResolve
}
