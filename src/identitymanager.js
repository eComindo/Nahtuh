import nahtuhsettings from './nahtuh-settings'

const identityManager = new function () {
  const apiIdentityServiceUrl = nahtuhsettings.apiIdentityServiceUrl

  this.login = (uid, password) => {
    const username = sanitizeString(uid)

    return new Promise(function (resolve, reject) {
      fetch(`${apiIdentityServiceUrl}/Login`,
        { method: 'POST', body: JSON.stringify({ Login: username, Password: password }) })
        .then(response => response.text()
          .then(data => {
            const userToken = JSON.parse(data)
            resolve(userToken)
          }))
        .catch((err) => {
          console.log(err)
          reject(new Error('Access denied'))
        })
    })
  }

  this.test = () => {
    alert('test')
  }

  /* Helper
    *
    **********************************/

  function sanitizeString (str) {
    str = str.replace(/([^a-z0-9áéíóúñü_-\s.,]|[\t\n\f\r\v\0])/gim, '')
    return str.trim()
  }
}()

export default identityManager
