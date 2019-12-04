'use strict'
const { Action, api } = require('actionhero')

class SmartAgentDidResolverApiResolv1 extends Action {
  constructor () {
    super()
    this.name = '/resolve/:did'
    this.description = 'Resolve DIDs to DID documents'
    this.inputs = {
      did: { required: true }
    }
    this.outputExample = { }
  }

  async run ({params, response}) {
    try {
      response.did = await api.smartAgentDidResolverApi.resolveDid(params.did)
      response.status = 'success'
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
