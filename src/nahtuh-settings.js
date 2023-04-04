const yaisettings = new function () {
  if (window.location.origin === 'https://cdn.nahtuh.com' || window.location.origin === 'https://nahtuhprodstasset.blob.core.windows.net') {
    this.apiHubServiceUrl = 'https://api.nahtuh.com/hubservice'
    this.apiIdentityServiceUrl = 'https://api.nahtuh.com/identityservice'
    this.apiActivityServiceUrl = 'https://api.nahtuh.com/activityservice'
    this.baseUrl = 'https://cdn.nahtuh.com'
    this.mixPanelToken = '39439f2c2a3ec56c29006747e1dc4f5b'
    console.log = function () {}
  } else {
    this.apiHubServiceUrl = 'https://api-dev.nahtuh.com/hubservice'
    this.apiIdentityServiceUrl = 'https://api-dev.nahtuh.com/identityservice'
    this.apiActivityServiceUrl = 'https://api-dev.nahtuh.com/activityservice'
    this.baseUrl = 'https://cdn-dev.nahtuh.com'
    this.mixPanelToken = 'a28f7aefc88f0b03ddf08cbe9a79d93e'
  }
}()

export default yaisettings
