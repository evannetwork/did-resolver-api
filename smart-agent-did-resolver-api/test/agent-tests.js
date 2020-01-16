const ActionHero = require('actionhero')
const actionhero = new ActionHero.Process()
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const path = require('path')

const expect = chai.expect

chai.use(chaiAsPromised)
process.env.ACTIONHERO_CONFIG = path.join(__dirname, '../..', 'node_modules/@evan.network/edge-server-seed/config')
process.env.PROJECT_ROOT = path.join(__dirname, '../..', 'node_modules/@evan.network/edge-server-seed/')
process.env.NODE_ENV = 'test'

describe('smart agent did resolver', function () {
  this.timeout(60000)

  let api

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

  describe('when resolving dids', () => {
    const endpointPath = 'smart-agents/smart-agent-did-resolver/did/get/:did'
    const validDid = 'did:evan:testcore:0x126E901F6F408f5E260d95c62E7c73D9B60fd734'
    const invalidDids = [
      'did:eva:testcore:0x126E901F6F408f5E260d95c62E7c73D9B60fd734',
      'evan:testcore:0x126E901F6F408f5E260d95c62E7c73D9B60fd734',
      'did:evan:testcore:126E901F6F408f5E260d95c62E7c73D9B60fd734',
      'did:testcore:0x126E901F6F408f5E260d95c62E7c73D9B60fd734',
      'did:sov:0x126E901F6F408f5E260d95c62E7c73D9B60fd734',
      '0x126E901F6F408f5E260d95c62E7c73D9B60fd734'
    ]

    it('Should resolve a valid did', async () => {
      const didResponse = await api.specHelper.runAction(endpointPath, { did: validDid })
      expect(didResponse.did.id).to.equal(validDid)
    })

    it('Should return an error for an invalid did', async () => {
      invalidDids.forEach(async (invalidDid) => {
        const response = await api.specHelper.runAction(endpointPath, { did: invalidDid })
        expect(response.status).to.eq('error')
      })
    })
  })

  describe('when resolving vcs', () => {
    const endpointPath = 'smart-agents/smart-agent-did-resolver/vc/get/:vc'
    const validVc = 'vc:evan:0x6ac679d5587ad42856ec22fdbb64dd02df9a5b82b1268504abdc5d2fc846dba7'
    const invalidProofVc = 'tbd'
    const invalidVcs = [
      'vc:evan:0x6ac679d5587ad42856ec22fdbb64dd02df9a5b82b1268504abdc5d2fc846dba8',
      'vc:even:0x6ac679d5587ad42856ec22fdbb64dd02df9a5b82b1268504abdc5d2fc846dba7'
    ]
    it('Should resolve a valid vc', async () => {
      const vcResponse = await api.specHelper.runAction(endpointPath, { vc: validVc })
      expect(vcResponse.vc.id).to.equal(validVc)
    })

    it('Should return an error for an invalid vc', async () => {
      invalidVcs.forEach(async (invalidVc) => {
        const response = await api.specHelper.runAction(endpointPath, { vc: invalidVc })
        // TODO: check error message
        expect(response.status).to.eq('error')
      })
    })

    it.skip('Should return an error for vcs with invalid proofs', async () => {
      const response = await api.specHelper.runAction(endpointPath, { vc: invalidProofVc })
      // TODO: check error message
      expect(response.status).to.eq('error')
    })
  })
})
