exports['default'] = {
  ethAccounts: {
    '': ''
  },
  encryptionKeys: {
    '0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563': '',
    '0x633dc4d7da7256660a892f8f1604a44b5432649cc8ec5cb3ced4c4e6ac94dd1d': ''
  },
  smartAgentDidResolverApi: (api) => {
    return {
      disabled: false,
      name: 'did-resolver-api',
      ethAccount: ''
    }
  }
}

exports['test'] = {
  ethAccounts: {
    '0x46610b67Eb8a11bC8BD5EB935F42963BB047e4d5': 'ed4a97f7b55a48bbf93a6e12852f5f625bd3750475538a6c1ac5d9a9ce5a7fc6'
  },
  encryptionKeys: {
    '0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563': '',
    '0x633dc4d7da7256660a892f8f1604a44b5432649cc8ec5cb3ced4c4e6ac94dd1d': ''
  },
  smartAgentDidResolverApi: (api) => {
    return {
      disabled: false,
      ethAccount: '0x46610b67Eb8a11bC8BD5EB935F42963BB047e4d5'
    }
  }
}
