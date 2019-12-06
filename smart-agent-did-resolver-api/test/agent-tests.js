const ActionHero = require('actionhero')
const actionhero = new ActionHero.Process()
const path = require('path')
const chai = require('chai')
const expect = chai.expect
const request = require('request-promise-native')

process.env.ACTIONHERO_CONFIG = path.join(__dirname, '../..', 'node_modules/@evan.network/edge-server-seed/config')
process.env.PROJECT_ROOT = path.join(__dirname, '../..', 'node_modules/@evan.network/edge-server-seed/')
process.env.NODE_ENV = 'test'

describe('smart agent did resolver', function () {
    this.timeout(60000)

    let api;
    let baseUrl = ""

    before(async () => {
        console.log(__dirname)
      api = await actionhero.start({configChanges: {
        plugins: {
          'smart-agent-did-resolver': { path: `${__dirname}/..` }
        }
      }})
      baseUrl = `http://localhost:${api.config.servers.web.port}/api`
    })

    after(
        async () => { await actionhero.stop()}
    )

    const validDid = "did:evan:testcore:0x126E901F6F408f5E260d95c62E7c73D9B60fd734";

    const invalidDids = [
        "did:eva:testcore:0x126E901F6F408f5E260d95c62E7c73D9B60fd734",
        "evan:testcore:0x126E901F6F408f5E260d95c62E7c73D9B60fd734",
        "did:evan:testcore:126E901F6F408f5E260d95c62E7c73D9B60fd734",
        "did:testcore:0x126E901F6F408f5E260d95c62E7c73D9B60fd734",
        "did:sov:0x126E901F6F408f5E260d95c62E7c73D9B60fd734",
        "0x126E901F6F408f5E260d95c62E7c73D9B60fd734"
    ];

    it('Should resolve a valid did', async () => {
        const didResponse = JSON.parse(await request.get(`${baseUrl}/smart-agents/smart-agent-did-resolver/did/get/${validDid}`))
        expect(didResponse.did.id).to.equal(validDid)
    })

    it('Should return an error for an invalid did', async () => {

      for(did in invalidDids) {
        await request.get(`${baseUrl}/smart-agents/smart-agent-did-resolver/did/get/${did}`)
        .then(() => {
          expect.fail("200")
        })
        .catch((err) => {
          expect(err.message.substr(0, 3)).to.equal("400")
        })
      }
    })
})
