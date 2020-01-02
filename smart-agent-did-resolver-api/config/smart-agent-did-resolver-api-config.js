exports['default'] = {
  ethAccounts: {
    '0xdae3511f09DF07bc9abfb51ac95B2A615d5dC7CC': '51b7b56396be74807ca8b67c53c666f9bdb18ad9be1ed55cb9d33d52cad61d72'
  },
  encryptionKeys: {
    '0xcb7275c580834fa264b50adfcd82218b24c2f0b9ad1c10c31176fef5f10cb70d': 'b1529fbe6b1ede4433ee29f3cc4a517a08cf4b83ff3560afaa40decfd8365acf',
    '0x15a76fd2d0c2e0a42267625a44e5bd7c11e218e41daa95cd55206e000610d175': 'b1529fbe6b1ede4433ee29f3cc4a517a08cf4b83ff3560afaa40decfd8365acf'
  },
  smartAgentDidResolverApi: (api) => {
    return {
      disabled: false,
      ethAccount: '0xdae3511f09DF07bc9abfb51ac95B2A615d5dC7CC'
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
