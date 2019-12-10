# did-resolver-api
This project implements a DID resolving REST api for evan.network.
It allows you to query the evan.network for DID documents, providing a valid evan DID.
In order to receive a DID, you have to send a `GET` request to the resolver endpoint at

`https://agents.test.evan.network/api/smart-agents/smart-agent-did-resolver/did/get/:did`

where `:did` resembles a valid DID.

A response for a valid DID looks as follows:

```JSON
{
  "did": {
    "@context": "https://w3id.org/did/v1",
    "id": "did:evan:testnet:0x126E901F6F408f5E260d95c62E7c73D9B60fd734",
    "publicKey": [
      {
        "id": "did:evan:testnet:0x126E901F6F408f5E260d95c62E7c73D9B60fd734#key-1",
        "type": [
          "Secp256k1SignatureVerificationKey2018",
          "ERC725ManagementKey"
        ],
        "publicKeyHex": "045adfd502c0bc55f4fcb90eea36368d7e19c5b3045aa6f51dfa3699046e9751251d21bc6bdd06c1ff0014fcbbf9f1d83c714434f2b33d713aaf46760f2d53f10d"
      }
    ],
    "authentication": [
      "did:evan:testnet:0x126E901F6F408f5E260d95c62E7c73D9B60fd734#key-1"
    ]
  },
  "status": "success"
}
```

whereas for an invalid DID an error is returned:

```JSON
{
  "status": "error",
  "error": "given did (\"invalidDid\") is no valid evan DID",
}
```
