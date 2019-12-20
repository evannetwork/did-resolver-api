'use strict'

const {
  api,
  Initializer
} = require('actionhero')

const {
  Did,
  ContractLoader,
  SignerInternal,
  SignerIdentity,
  Vc
} = require('@evan.network/api-blockchain-core')

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
        const signerIdentity = this.retrieveSignerIdentity()
        const resolver = new Did({
          ...this.runtime, signerIdentity
        })
        return resolver.getDidDocument(did)
      }

      async resolveVc(vc) {
        const signerIdentity = this.retrieveSignerIdentity()
        const resolver = new Vc({
          ...this.runtime, signerIdentity
        })
        return resolver.getVC(vc)
      }

      async retrieveSignerIdentity() {
        const web3 = this.runtime.web3

        const contracts = await this.runtime.contracts;
        const contractLoader =  new ContractLoader({
          contracts,
          web3,
        });
        const accountStore = this.runtime.accountStore;
        const verifications = this.runtime.verifications;
        const underlyingSigner = new SignerInternal({
          accountStore,
          contractLoader,
          config: {},
          web3,
        });
        const signer = new SignerIdentity({
            contractLoader,
            verifications,
            web3,
          }, {
            activeIdentity: await verifications.getIdentityForAccount(this.config.ethAccount, true),
            underlyingAccount: this.config.ethAccount,
            underlyingSigner,
          }
        );

        return signer
      }
    }

    // start the initialization code
    const smartAgentDidResolverApi = new SmartAgentDidResolverApi(api.config.smartAgentDidResolverApi)
    await smartAgentDidResolverApi.initialize()

    // objects and values used outside initializer
    api.smartAgentDidResolverApi = smartAgentDidResolverApi
  }
}
