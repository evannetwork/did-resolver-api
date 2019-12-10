const ActionHero = require('actionhero')
const actionhero = new ActionHero.Process()
const path = require('path')
const chai = require("chai");

const expect = chai.expect

chai.use(chaiAsPromised)
process.env.ACTIONHERO_CONFIG = path.join(__dirname, '../..', 'node_modules/@evan.network/edge-server-seed/config')
process.env.PROJECT_ROOT = path.join(__dirname, '../..', 'node_modules/@evan.network/edge-server-seed/')
process.env.NODE_ENV = 'test'

describe('smart agent did resolver', function () {
  this.timeout(60000)

  let api;
  const endpointPath = "smart-agents/smart-agent-did-resolver/did/get/:did"

  before(async () => {
    api = await actionhero.start({
      configChanges: {
        plugins: {
          'smart-agent-did-resolver': { path: `${__dirname}/..` }
        }
      }
    })
  })

  after(async () => {
    await actionhero.stop()
  })

  const validDid = "did:evan:testnet:0x126E901F6F408f5E260d95c62E7c73D9B60fd734";

  const invalidDids = [
      "did:eva:testcore:0x126E901F6F408f5E260d95c62E7c73D9B60fd734",
      "evan:testcore:0x126E901F6F408f5E260d95c62E7c73D9B60fd734",
      "did:evan:testcore:126E901F6F408f5E260d95c62E7c73D9B60fd734",
      "did:testcore:0x126E901F6F408f5E260d95c62E7c73D9B60fd734",
      "did:sov:0x126E901F6F408f5E260d95c62E7c73D9B60fd734",
      "0x126E901F6F408f5E260d95c62E7c73D9B60fd734"
  ];

  it('Should resolve a valid did', async () => {
      const didResponse = await api.specHelper.runAction(endpointPath, {did: validDid})
      expect(didResponse.did.id).to.equal(validDid)
  })

  it('Should return an error for an invalid did', async () => {
    invalidDids.forEach(async (invalidDid) => {
      const response = await api.specHelper.runAction(endpointPath, {did: invalidDid})
      expect(response.status).to.eq('error')
    })
  })
})
