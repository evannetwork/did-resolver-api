'use strict'
const { Action, api } = require('actionhero')

class SmartAgentDidResolverDidGet extends Action {
  constructor () {
    super()
    this.name = 'smart-agents/smart-agent-did-resolver/did/get/:did'
    this.description = 'Resolve DIDs to DID documents'
    this.inputs = {
      did: { required: true }
    }
    this.outputExample = { }
  }

  async run ({ params: { did }, response }) {
    try {
      response.did = await api.smartAgentDidResolverApi.resolveDid(did)
      response.status = 'success'
    } catch (ex) {
      api.log(ex)
      response.status = 'error'
      response.error = ex
    }
  }
}

class SmartAgentDidResolverVcGet extends Action {
  constructor () {
    super()
    this.name = 'smart-agents/smart-agent-did-resolver/vc/get/:vc'
    this.description = 'Resolve a VC ID to a VC document'
    this.inputs = {
      vc: { required: true }
    }
    this.outputExample = { }
  }

  async run ({ params: { vc }, response }) {
    try {
      response.vc = await api.smartAgentDidResolverApi.resolveVc(vc)
      response.status = 'success'
    } catch (ex) {
      api.log(ex)
      response.status = 'error'
      response.error = ex
    }
  }
}

class SmartAgentDidResolverVcCheckStatus extends Action {
  constructor () {
    super()
    this.name = 'smart-agents/smart-agent-did-resolver/vc/status/:vc'
    this.description = 'Check revokation status of VC'
    this.inputs = {
      vc: { required: true }
    }
    this.outputExample = { }
  }

  async run ({ params: { vc }, response }) {
    try {
      response.vcStatus = await api.smartAgentDidResolverApi.getVcStatus(vc)
      response.status = 'success'
    } catch (ex) {
      api.log(ex)
      response.status = 'error'
      response.error = ex
    }
  }
}

module.exports = {
  SmartAgentDidResolverDidGet,
  SmartAgentDidResolverVcGet,
  SmartAgentDidResolverVcCheckStatus,
}
