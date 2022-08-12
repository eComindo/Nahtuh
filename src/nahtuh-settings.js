const yaisettings = new function () {
    if(window.location.origin === 'https://cdn.nahtuh.com' || window.location.origin === 'https://nahtuhprodstasset.blob.core.windows.net'){
        this.apiHubServiceUrl = 'https://nahtuhhubprodfunc.azurewebsites.net';
        this.apiIdentityServiceUrl = 'https://nahtuhidentprodfunc.azurewebsites.net';
        this.apiActivityServiceUrl = 'https://nahtuhactprodfunc.azurewebsites.net/api';
        this.baseUrl = 'https://cdn.nahtuh.com';
        this.mixPanelToken = '39439f2c2a3ec56c29006747e1dc4f5b';
        console.log = function() {}
    }else {
        this.apiHubServiceUrl = 'https://yaidevfunc-hub.azurewebsites.net';
        this.apiIdentityServiceUrl = 'https://yaidevfunc-identity.azurewebsites.net';
        this.apiActivityServiceUrl = 'https://api-dev.nahtuh.com/activityservice';
        this.baseUrl = 'https://cdn-dev.nahtuh.com';
        this.mixPanelToken = 'a28f7aefc88f0b03ddf08cbe9a79d93e';
    }
}

export default yaisettings;