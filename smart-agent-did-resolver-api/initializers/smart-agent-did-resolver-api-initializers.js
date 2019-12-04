'use strict'

const {
  api,
  Initializer
} = require('actionhero')

const {
  DidResolver,
  ContractLoader,
  SignerInternal,
  SignerIdentity
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
        const resolver = new DidResolver({
          ...this.runtime, signerIdentity
        })
        return resolver.getDidDocument(did)
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
          },
          {
            activeIdentity: await verifications.getIdentityForAccount("0x46610b67Eb8a11bC8BD5EB935F42963BB047e4d5", true), //TODO from parameter
            underlyingAccount: "0x46610b67Eb8a11bC8BD5EB935F42963BB047e4d5",
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
