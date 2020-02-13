'use strict'

const {
  api,
  Initializer
} = require('actionhero')

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
      /**
       * initialize smart agent instance and create runtime
       *
       * @return     {Promise<void>}   resolved when done
       */
      async initialize () {
        await super.initialize({ useIdentity: true })
      }

      /**
       * get DID document
       *
       * @param      {string}        did     DID name to get DID document for
       * @return     {Promise<any>}  DID document
       */
      async resolveDid (did) {
        return this.runtime.did.getDidDocument(did)
      }

      /**
       * get VC document
       *
       * @param      {string}        vcId      VC id to get document for
       * @return     {Promise<any>}  vc document
       */
      async resolveVc (vcId) {
        return this.runtime.vc.getVc(vcId)
      }

      /**
       * Get status of VC document (active, revoked)
       * @param {string} vcId VC id to get status for
       * @return {Promise<string>} Status
       */
      async getVcStatus (vcId) {
        const isRevoked = await this.runtime.vc.getRevokeVcStatus(vcId);
        return isRevoked ? 'revoked' : 'active'
      }
    }

    // start the initialization code
    const smartAgentDidResolverApi =
      new SmartAgentDidResolverApi(api.config.smartAgentDidResolverApi)
    await smartAgentDidResolverApi.initialize()

    // objects and values used outside initializer
    api.smartAgentDidResolverApi = smartAgentDidResolverApi
  }
}
