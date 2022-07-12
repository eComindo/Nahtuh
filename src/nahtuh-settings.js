const yaisettings = new function () {
    if(window.location.origin === 'https://cdn.nahtuh.com' || window.location.origin === 'https://nahtuhprodstasset.blob.core.windows.net'){
        this.apiHubServiceUrl = 'https://nahtuhhubprodfunc.azurewebsites.net';
        this.apiIdentityServiceUrl = 'https://nahtuhidentprodfunc.azurewebsites.net';
        this.apiActivityServiceUrl = 'https://nahtuhactprodfunc.azurewebsites.net';
        this.baseUrl = 'https://cdn.nahtuh.com';
    }else {
        this.apiHubServiceUrl = 'https://yaidevfunc-hub.azurewebsites.net';
        this.apiIdentityServiceUrl = 'https://yaidevfunc-identity.azurewebsites.net';
        this.apiActivityServiceUrl = 'https://yaidevfunc-activity.azurewebsites.net';
        this.baseUrl = 'https://cdn-dev.nahtuh.com';
    }
}

export default yaisettings;