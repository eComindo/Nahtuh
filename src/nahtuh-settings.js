const yaisettings = new function () {
    if(window.origin === 'https://nahtuh.com'){
        this.apiHubServiceUrl = 'https://nahtuhhubprodfunc.azurewebsites.net';
        this.apiIdentityServiceUrl = 'https://nahtuhidentprodfunc.azurewebsites.net';
        this.apiActivityServiceUrl = 'https://nahtuhactprodfunc.azurewebsites.net';
    }else {
        this.apiHubServiceUrl = 'https://yaidevfunc-hub.azurewebsites.net';
        this.apiIdentityServiceUrl = 'https://yaidevfunc-identity.azurewebsites.net';
        this.apiActivityServiceUrl = 'https://yaidevfunc-activity.azurewebsites.net';
    }
}

export default yaisettings;