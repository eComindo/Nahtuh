/*
 * YAI - API
 * version: 1.0
 * (C)Copyright Ecomindo, 2021
 *
 ************************************************/

/* todo:
    * - buat defaultPostHeader
    * - simplify onconnection handler registration
    * - perbaiki naming private vars dengan menambahkan prefix _
    * - pindahkan login ke js lain
    *********************************************************************/
import nahtuhsettings from './nahtuh-settings'
import ObservableSlim from './observable-slim'
import identityManager from './identitymanager'
import * as signalR from '@microsoft/signalr'
import * as signalRMsgPack from '@microsoft/signalr-protocol-msgpack'
import mixpanel from 'mixpanel-browser'
import DOMPurify from 'isomorphic-dompurify'

const nahtuhClient = new function () {
  /* Constants
     *
     **********************************/

  // default service url
  const apiHubServiceUrl = nahtuhsettings.apiHubServiceUrl
  const apiActivityServiceUrl = nahtuhsettings.apiActivityServiceUrl
  const apiUtilityServiceUrl = nahtuhsettings.apiUtilityServiceUrl

  /* Private properties
    *
    **********************************/
  const scope = this

  // hold hub connection
  let connection

  // hold activity info that is sets by parent container
  let _activityId = null
  let _rawActivityId = null
  let _presetActivityId = null
  let _avatar = null

  // hold current user access and refresh token
  let _userToken = null

  // hold detail of current event
  let _eventInfo = null

  let _eventCode = null

  // hold current participant access and refresh token
  let participantToken = null

  // hold detail of current participant
  let participantInfo = null

  /* Public properties
    *
    **********************************/
  this.participantId = null
  this.eventId = null
  this.isLoadingActivitySet = false
  this.isLoadingEventData = false
  this.isActivitySetOwner = false
  this.isStartMode = false
  this.isPreview = false

  /* Callback functions
    *
    **********************************/

  // call back function when new participant join to an event
  this.onParticipantJoined = () => { }

  // call back function when new participant leave an event
  this.onParticipantLeave = () => { }

  // call back function when host connected or reconnected an event
  this.onHostConnected = () => { }

  // call back function when host disconnected in an event
  this.onHostDisconnected = () => { }

  // call back function when new message received
  this.onIncomingMessage = () => { }

  // call back function when connection closed
  this.onStopped = () => { }

  // call back function when participant join to a group
  this.onGroupMemberJoined = () => { }

  // call back function when participant leave from a group
  this.onGroupMemberLeft = () => { }

  // call back function when event variable changed
  this.onEventVariableChanged = () => { }
  this.onGroupVariableChanged = () => { }
  this.onHostVariableChanged = () => { }

  /* Initialization API
    *
    **********************************/

  const handlePostMessage = (event) => {
    switch (event.data.key) {
      case 'setactivityinfo':
        _userToken = event.data.value.userToken
        break
    }
  }

  this.init = () => {
    window.addEventListener('message', handlePostMessage, true)
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') {
        console.log('hidden')
      } else {
        if (connection) {
          if (connection.state === 'Disconnected') {
            connection.start()
          }
        }
      }
    })

    const tempMode = new URLSearchParams(window.location.search).get('mode')
    if (tempMode === 'start') {
      this.isStartMode = true
    }
    const tempPreview = new URLSearchParams(window.location.search).get('isPreview')
    if (tempPreview === 'true') {
      this.isPreview = true
    }
    _userToken = new URLSearchParams(window.location.search).get('accessToken')
    _activityId = new URLSearchParams(window.location.search).get('activityId') || 'X002'
    _rawActivityId = new URLSearchParams(window.location.search).get('rawActivityId')
    _presetActivityId = new URLSearchParams(window.location.search).get('activitySetId')
    _avatar = new URLSearchParams(window.location.search).get('avatar')
    const isActivitySetOwnerTemp = new URLSearchParams(window.location.search).get('isActivitySetOwner')
    const persistentEventId = new URLSearchParams(window.location.search).get('eventId')
    const isHostPreview = new URLSearchParams(window.location.search).get('isHostPreview') === 'true'

    if (_presetActivityId) {
      this.isLoadingActivitySet = true
    }

    if (persistentEventId && (!this.isPreview || isHostPreview)) {
      this.isLoadingEventData = true
    }

    if (isActivitySetOwnerTemp) {
      this.isActivitySetOwner = true
    }

    try {
      mixpanel.init(nahtuhsettings.mixPanelToken)
    } catch (ex) {
      console.log(ex)
    }

    try {
      const resizeObserver = new ResizeObserver(entries => {
        const body = document.body
        const html = document.documentElement

        const height = Math.max(body.scrollHeight, body.offsetHeight,
          html.clientHeight, html.scrollHeight, html.offsetHeight)

        parent.postMessage({ key: 'setheight', value: height }, '*')
      })
      resizeObserver.observe(document.body)

      // request parent to set activity info
      parent.postMessage({ key: 'getactivityinfo' }, '*')
    } catch (err) {
      console.log(err)
    }
  }

  // start initialization
  this.init()

  /* Connection API
    *
    **********************************/

  // start connection to hub service
  this.start = () => {
    return new Promise(function (resolve, reject) {
      connection = new signalR.HubConnectionBuilder()
        .withUrl(`${apiHubServiceUrl}/v2`, { accessTokenFactory: () => participantToken.accessToken })
        .withAutomaticReconnect()
        .withHubProtocol(new signalRMsgPack.MessagePackHubProtocol())
        .configureLogging(signalR.LogLevel.Information)
        .build()

      connection.on('onIncomingMessage', (data) => {
        if (data.eventId === _eventInfo.eventId) {
          const onMessageEvent = new CustomEvent('onIncomingMessage', { detail: data })
          window.dispatchEvent(onMessageEvent)
          scope.onIncomingMessage(data)
        }
      })

      connection.on('onParticipantJoined', (data) => {
        if (data.eventId === _eventInfo.eventId) {
          const participantJoinEvent = new CustomEvent('onParticipantJoined', { detail: data })
          window.dispatchEvent(participantJoinEvent)
          scope.onParticipantJoined(data)
        }
      })

      connection.on('onParticipantLeave', (data) => {
        console.log(data)
        if (data.eventId === _eventInfo.eventId) {
          const participantLeaveEvent = new CustomEvent('onParticipantLeave', { detail: data })
          window.dispatchEvent(participantLeaveEvent)
          scope.onParticipantLeave(data)
        }
      })

      connection.on('onHostConnected', data => {
        console.log(data)
        if (data.eventId === _eventInfo.eventId) {
          scope.onHostConnected(data)
        }
      })

      connection.on('onHostDisconnected', data => {
        console.log(data)
        if (data.eventId === _eventInfo.eventId) {
          scope.onHostDisconnected(data)
        }
      })

      connection.onclose(() => {
        scope.onStopped()
      })

      connection.on('onGroupMemberJoined', (data) => {
        if (data.eventId === _eventInfo.eventId) {
          scope.onGroupMemberJoined(data)
        }
      })

      connection.on('onGroupMemberLeft', (data) => {
        if (data.eventId === _eventInfo.eventId) {
          scope.onGroupMemberLeft(data)
        }
      })

      connection.on('onEventVariableChanged', (data) => {
        if (data.eventId === _eventInfo.eventId && data.sender !== participantInfo.participantId) {
          _eventVars[data.name] = data.value
          const onVarChangeEvent = new CustomEvent('onEventVariableChanged', { detail: data })
          window.dispatchEvent(onVarChangeEvent)
          scope.onEventVariableChanged(data)
        }
      })

      connection.on('onGroupVariableChanged', (data) => {
        if (data.eventId === _eventInfo.eventId && data.sender !== participantInfo.participantId) {
          _groupVars[data.groupName][data.name] = data.value
          scope.onGroupVariableChanged(data)
        }
      })

      connection.on('onHostVariableChanged', (data) => {
        if (data.eventId === _eventInfo.eventId && data.sender !== participantInfo.participantId) {
          // _eventVars[data.name] = data.value;
          scope.onHostVariableChanged(data)
        }
      })

      connection.start()
        .then(() => {
          getAllSharedVars('E', 'a').then(() => {
            // scope.addEventConnection();
            resolve()
          })
        })
    })
  }

  // stop connection to hub service
  this.stop = () => {
    connection.stop()
  }

  /* Event API
    *
    **********************************/

  // create an event
  this.createEvent = async (participantName, autoStart = true) => {
    if (!_userToken) {
      if (window.location.origin.includes('nahtuh')) {
        throw new Error('Invalid access token, please login before creating event')
      }
      try {
        const res = await identityManager.login(participantName, 'xxxx')
        _userToken = res.accessToken
      } catch (ex) {
        console.log(ex)
      }
    }

    const name = sanitizeString(participantName)
    if (name.length > 20) throw new Error('Invalid name')

    const data = await $post('createevent',
      {
        activityId: _activityId,
        activitySetId: _presetActivityId,
        participantName: name,
        avatarUrl: _avatar,
        userToken: _userToken,
        rawId: _rawActivityId,
        eventId: new URLSearchParams(window.location.search).get('eventId') || this.eventId
      }, false)

    _eventInfo = data.eventInfo
    this.eventId = data.eventInfo.eventId
    participantInfo = data.participant
    scope.participantId = participantInfo.participantId
    participantToken = data.participantToken

    let lockResolver
    if (navigator && navigator.locks && navigator.locks.request) {
      console.log('locking tab')
      const promise = new Promise((resolve) => {
        lockResolver = resolve
      })

      try {
        navigator.locks.request(_eventInfo.eventId, { mode: 'shared' }, () => {
          return promise
        })
      } catch (err) {
        console.log('failed locking')
      }
    }

    parent.postMessage({ key: 'eventInfo', value: JSON.stringify(_eventInfo) }, '*')
    parent.postMessage({ key: 'username', value: participantName }, '*')

    if (autoStart) {
      await scope.start()
    }
    return data
  }

  this.createNewEvent = async (description, title, config = null, image = null) => {
    const formData = {
      activityId: _rawActivityId,
      activitySetId: _presetActivityId
    }
    const res = await $post('event', formData)
    this.eventId = res.id
    await this.saveEvent(description, title, config, image)
    return res
  }

  this.startEvent = async (eventDuration = 60) => {
    const persistentEventId = new URLSearchParams(window.location.search).get('eventId') || this.eventId
    const formData = new FormData()
    formData.append('defaultduration', eventDuration)
    const params = {
      method: 'POST',
      withCredentials: true,
      body: formData,
      headers: { Authorization: 'Bearer ' + _userToken }
    }
    await fetch(`${apiHubServiceUrl}/Event/${persistentEventId}/Start`, params)
  }

  this.startLobby = async (eventDuration = 60) => {
    const formData = new FormData()
    formData.append('defaultduration', eventDuration)
    const params = {
      method: 'POST',
      withCredentials: true,
      body: formData,
      headers: { Authorization: 'Bearer ' + _userToken }
    }
    await fetch(`${apiHubServiceUrl}/Event/${_eventInfo.id}/Lobby/Start`, params)
  }

  // join to an event
  this.join = (eventId, participantName, autoStart = true) => {
    const name = sanitizeString(participantName)
    if (name.length > 20) throw new Error('Invalid name')

    return new Promise(function (resolve, reject) {
      $post('join',
        { eventId, participantName: name, avatarUrl: _avatar, userToken: _userToken }, false)
        .then(data => {
          _eventInfo = data.eventInfo
          scope.eventId = eventId
          participantInfo = data.participant
          scope.participantId = participantInfo.participantId
          participantToken = data.participantToken

          let lockResolver
          if (navigator && navigator.locks && navigator.locks.request) {
            console.log('locking tab')
            const promise = new Promise((resolve) => {
              lockResolver = resolve
            })

            try {
              navigator.locks.request(_eventInfo.eventId, { mode: 'shared' }, () => {
                return promise
              })
            } catch (err) {
              console.log('failed locking')
            }
          }

          parent.postMessage({ key: 'username', value: name }, '*')

          if (autoStart) {
            scope.start().then(() => resolve(data))
              .catch(error => reject(error))
          } else {
            resolve(data)
          }
        })
        .catch((error) => reject(error))
    })
  }

  this.addEventConnection = () => {
    $post('addeventconnection', {
      ConnectionId: connection.connectionId,
      Name: participantInfo.participantName,
      EventId: _eventInfo.eventId
    })
  }

  // create an event
  this.leaveEvent = (autoStop = true) => {
    return new Promise(function (resolve, reject) {
      $post('leaveevent')
        .then(() => {
          ObservableSlim.remove(scope.eventVars)
          ObservableSlim.remove(scope.groupVars)
          if (autoStop) scope.stop()
          resolve()
        })
        .catch(() => reject(new Error('Error while try to leave')))
    })
  }

  this.createPreviewEvent = async () => {
    const eventId = new URLSearchParams(window.location.search).get('eventId')
    let configData
    if (eventId) {
      configData = await this.getEventData()
    } else {
      configData = await this.getPresetActivityData()
    }

    const data = await $post('event/preview', {
      activityId: _rawActivityId,
      assetUrl: configData.assetUrl
    })
    parent.postMessage({ key: 'eventpreview', value: data }, '*')
    return data
  }

  this.getPreviewEventDetail = async () => {
    const data = await $get(`event/${new URLSearchParams(window.location.search).get('eventId') || this.eventId}?preview=true`)
    return data
  }

  /* Participant API
    *
    **********************************/

  // get list of event participants
  this.getParticipantList = () => {
    return new Promise(function (resolve, reject) {
      $post('participants')
        .then(data => { resolve(data) })
        .catch(error => reject(error))
    })
  }

  // get current participant info
  this.getCurrentParticipant = () => { return participantInfo }

  /* Group Management API
    *
    **********************************/

  // join to group
  this.joinGroup = (participantId, groupName) => {
    return new Promise(function (resolve, reject) {
      $post('joingroup', { participantId, groupName })
        .then(() => {
          _groupVars[groupName] = {}
          getAllSharedVars('G', groupName).then(() => resolve())
        })
        .catch(() => reject(new Error('Error joining group')))
    })
  }

  /// leave from group
  this.leaveGroup = (participantId, groupName) => {
    ObservableSlim.remove(this.groupVars[groupName])

    return new Promise(function (resolve, reject) {
      $post('leavegroup', { participantId, groupName })
        .then(() => { resolve() })
        .catch(() => reject(new Error('Error leaving group')))
    })
  }

  this.getGroupMember = (groupName) => {
    return new Promise(function (resolve, reject) {
      $post(`participants/${groupName}`)
        .then(data => { resolve(data) })
        .catch(error => reject(error))
    })
  }

  /* Messaging API
    *
    **********************************/

  this.broadcast = (content) => {
    content = { content, eventId: _eventInfo.eventId }
    connection.invoke('broadcast2', JSON.stringify(content))
    // $post('broadcast', { 'content': content });
  }

  this.sendToUser = (participantId, content) => {
    content = { content, eventId: _eventInfo.eventId }
    connection.invoke('sendToUser2', participantId, JSON.stringify(content))
    // $post('sendToUser', { 'participantId': participantId, 'content': content });
  }

  this.sendToGroup = (groupName, content) => {
    content = { content, eventId: _eventInfo.eventId }
    connection.invoke('sendToGroup2', groupName, JSON.stringify(content))
    // $post('sendToGroup', { 'groupName': groupName, 'content': content });
  }

  this.sendEventFeedback = (eventId, activityId, content) => {
    connection.invoke('sendEventFeedback', eventId, activityId, JSON.stringify(content))
  }

  this.sendToLog = (eventId, message) => {
    connection.invoke('sendToLog', eventId, message)
  }

  /* Cloud Variable API
    *
    **********************************/

  // hold cloud variable that is accesible by all event participants
  var _eventVars = {}
  var _groupVars = {}

  function setSharedVariable (varScope, identifier, name, value) {
    return new Promise(function (resolve, reject) {
      $post('setsharedvariable/atomic', {
        scope: varScope,
        items: [{
          identifier, name, value, previousValue: scope.eventVars[name]
        }]
      })
        .then(() => resolve(value))
        .catch(error => reject(error))
    })
  }

  // get all shared variable. this is called when connection started
  function getAllSharedVars (scope, identifier) {
    return new Promise(function (resolve, reject) {
      $get(`getallsharedvariables/${scope}/${identifier}`)
        .then(data => {
          switch (scope) {
            case 'E':
              data.forEach(item => {
                _eventVars[item.name] = item.value
              })
              break
            case 'G':
              data.forEach(item => {
                _groupVars[identifier][item.name] = item.value
              })
              break
          }
          resolve()
        })
        .catch(error => reject(error))
    })
  }

  this.getAllEventVariable = async () => {
    await getAllSharedVars('E', 'a')
    return _eventVars
  }

  // set event variable by ensuring it's atomicity
  this.setEventVariable = (name, value) => {
    return new Promise(function (resolve, reject) {
      setSharedVariable('E', null, name, value)
        .then((data) => { _eventVars[name] = value; resolve(data) })
        .catch((error) => { reject(error) })
    })
  }

  // set group variable by ensuring it's atomicity
  this.setGroupVariable = (group, name, value) => {
    return new Promise(function (resolve, reject) {
      setSharedVariable('G', group, name, value)
        .then((data) => { _groupVars[group][name] = value; resolve(data) })
        .catch((error) => { reject(error) })
    })
  }

  // set event variable by ignoring it's atomicity
  this.eventVars = ObservableSlim.create(_eventVars, true, function (changes) {
    const params = { scope: 'E', items: [] }

    changes.forEach(item => {
      params.items.push(
        { identifier: null, name: item.property, value: item.newValue, previousValue: null })
    })

    const token = participantToken
    if (token) {
      $post('setsharedvariable/override', params)
    }
  })

  // set event variable by ignoring it's atomicity
  this.groupVars = ObservableSlim.create(_groupVars, true, function (changes) {
    const params = { scope: 'G', items: [] }
    changes.forEach(item => {
      const groupName = item.currentPath.substring(0, item.currentPath.indexOf('.'))
      params.items.push(
        { identifier: groupName, name: item.property, value: item.newValue, previousValue: null })
    })

    const token = participantToken
    if (token) {
      $post('setsharedvariable/override', params)
    }
  })

  /* Persistent Variable API
    *
    **********************************/
  this.setPersistentVars = (vars) => {
    return new Promise(function (resolve, reject) {
      $post('PersistentVariable', { items: vars })
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  this.getPersistentVars = (name) => {
    return new Promise(function (resolve, reject) {
      $get(`PersistentVariable/${name}`)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  /* Activity Configuration API
    *
    **********************************/
  this.setConfiguration = (configuration) => {
    return new Promise(function (resolve, reject) {
      $post('Configuration', configuration)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  this.getConfiguration = () => {
    return new Promise(function (resolve, reject) {
      $get('Configuration')
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  /* Host Configuration API
    *
    **********************************/
  this.setHostConfiguration = (configuration) => {
    return new Promise(function (resolve, reject) {
      $post('hostconfig', { eventId: _eventInfo.eventId, value: configuration })
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  this.getHostConfiguration = () => {
    return new Promise(function (resolve, reject) {
      $get(`hostconfig/${_eventInfo.eventId}`)
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  this.saveEvent = async (description, title, config = null, image = null) => {
    const formData = new FormData()
    formData.append('description', description)
    formData.append('title', title)
    formData.append('file', image)
    const persistentEventId = new URLSearchParams(window.location.search).get('eventId') || this.eventId

    if (_userToken) {
      const params = {
        method: 'PATCH',
        withCredentials: true,
        body: formData,
        headers: { Authorization: 'Bearer ' + _userToken }
      }

      try {
        const res = await fetch(`${apiHubServiceUrl}/event/${persistentEventId}`, params)
        if (res.ok) {
          await res.json()
          if (config) {
            await this.uploadEventConfig(config)
          }
        } else {
          const error = await res.text()
          throw error
        }
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }

  this.updateEventIsAsync = async (isAsync, config = null, image = null) => {
    const formData = new FormData()
    formData.append('file', image)
    formData.append('isAsync', isAsync)
    const persistentEventId = new URLSearchParams(window.location.search).get('eventId') || this.eventId

    if (_userToken) {
      const params = {
        method: 'PATCH',
        withCredentials: true,
        body: formData,
        headers: { Authorization: 'Bearer ' + _userToken }
      }

      try {
        const res = await fetch(`${apiHubServiceUrl}/event/${persistentEventId}`, params)
        if (res.ok) {
          await res.json()
          if (config) {
            await this.uploadEventConfig(config)
          }
        } else {
          const error = await res.text()
          throw error
        }
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }

  this.uploadEventConfig = async (config) => {
    const formData = new FormData()
    formData.append('configAsString', JSON.stringify(config))
    const persistentEventId = new URLSearchParams(window.location.search).get('eventId') || this.eventId
    if (_userToken) {
      const params = {
        method: 'POST',
        withCredentials: true,
        body: formData,
        headers: { Authorization: 'Bearer ' + _userToken }
      }
      await fetch(`${apiHubServiceUrl}/event/${persistentEventId}/config`, params)
    }
  }

  this.savePublicEvent = async (description, title, config = null, image = null, eventId = null, hostId = null) => {
    if (!hostId || !eventId) throw new Error('Event Id and Host Id must not be empty')

    const formData = new FormData()
    formData.append('description', description)
    formData.append('title', title)
    formData.append('file', image)

    if (_userToken) {
      const params = {
        method: 'PATCH',
        body: formData
      }

      try {
        const res = await fetch(`${apiHubServiceUrl}/Activity/${_rawActivityId}/Event/${eventId}?hostId=${hostId}`, params)
        if (res.ok) {
          await res.json()
          if (config) {
            await this.uploadPublicEventConfig(config, eventId, hostId)
          }
        } else {
          const error = await res.text()
          throw error
        }
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }

  this.uploadPublicEventConfig = async (config, eventId, hostId) => {
    const formData = new FormData()
    formData.append('configAsString', JSON.stringify(config))

    if (_userToken) {
      const params = {
        method: 'POST',
        body: formData
      }
      await fetch(`${apiHubServiceUrl}/Activity/${_rawActivityId}/Event/${eventId}/Config?hostId=${hostId}`, params)
    }
  }

  this.uploadEventFile = async (file) => {
    const formData = new FormData()
    formData.append('Files', file, file.name)

    const persistentEventId = new URLSearchParams(window.location.search).get('eventId') || this.eventId

    if (_userToken) {
      const params = {
        method: 'POST',
        withCredentials: true,
        body: formData,
        headers: { Authorization: 'Bearer ' + _userToken }
      }

      try {
        const res = await fetch(`${apiActivityServiceUrl}/event/${persistentEventId}/${_eventCode}/file`, params)
        return res.json()
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }

  this.uploadTemplateFile = async (file) => {
    const formData = new FormData()
    formData.append('Files', file, file.name)

    if (_userToken) {
      const params = {
        method: 'POST',
        withCredentials: true,
        body: formData,
        headers: { Authorization: 'Bearer ' + _userToken }
      }

      const tempId = _presetActivityId.split('/')
      let activityset = _presetActivityId
      if (tempId.length > 1) {
        activityset = tempId[0]
      }

      if (!activityset) activityset = crypto.randomUUID()

      try {
        const res = await fetch(`${apiActivityServiceUrl}/activity/${_rawActivityId}/template/${activityset}/file`, params)
        return res.json()
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }

  this.saveResult = async (files, engagementScore = 0, engagementScoreDetail = '', hostname = '', isAsync = false, isDelay = false, reportData = {}) => {
    if (this.isPreview) return
    const formData = new FormData()
    formData.append('engagementScore', engagementScore)
    formData.append('engagementScoreDetail', engagementScoreDetail)
    if (!isDelay) {
      files.forEach((file, index) => {
        formData.append(index, file)
      })
    } else {
      formData.append('reportData', JSON.stringify(reportData))
    }
    if (isAsync) formData.append('hostName', hostname)
    const persistentEventId = new URLSearchParams(window.location.search).get('eventId') || this.eventId
    if (!_userToken) return
    const params = {
      method: 'POST',
      withCredentials: true,
      body: formData,
      headers: { Authorization: 'Bearer ' + _userToken }
    }
    try {
      if (isAsync) {
        await fetch(`${apiHubServiceUrl}/event/${persistentEventId}/FinishAsync`, params)
      } else if (isDelay) {
        await fetch(`${apiHubServiceUrl}/event/${persistentEventId}/FinishReportDelay`, params)
      } else {
        await fetch(`${apiHubServiceUrl}/event/${persistentEventId}/Finish`, params)
      }
    } catch (err) {
      console.error('NahtuhClient.saveResult', err)
      throw err
    }
  }

  this.saveHistory = async (htmlString, eventId, ownerId) => {
    if (this.isPreview) return
    if (!_userToken) return
    const body = {
      html: htmlString,
      eventId,
      ownerId
    }
    const params = {
      method: 'POST',
      withCredentials: true,
      body: JSON.stringify(body),
      headers: { Authorization: 'Bearer ' + _userToken, 'Content-Type': 'application/json' }
    }
    const eventUrl = `${apiHubServiceUrl}/History/Save`
    await fetch(eventUrl, params)
  }

  this.setEngagementScore = async (engagementScore = 0, engagementScoreDetail = '') => {
    if (this.isPreview) return
    const formData = new FormData()
    formData.append('engagementScore', engagementScore)
    formData.append('engagementScoreDetail', engagementScoreDetail)
    const persistentEventId = new URLSearchParams(window.location.search).get('eventId') || this.eventId
    if (!_userToken) return
    const params = {
      method: 'PATCH',
      withCredentials: true,
      body: formData,
      headers: { Authorization: 'Bearer ' + _userToken }
    }
    await fetch(`${apiHubServiceUrl}/event/${persistentEventId}`, params)
  }

  this.getCourseQuizQuestion = async (ownerId) => {
    if (!_userToken) return
    const params = {
      method: 'POST',
      withCredentials: true,
      body: JSON.stringify({ ownerId }),
      headers: { Authorization: 'Bearer ' + _userToken }
    }
    const res = await fetch(`${apiHubServiceUrl}/event/${_eventInfo.id}/Question`, params)
    return res
  }

  this.saveParticipantState = async (state, ownerId) => {
    if (!_userToken) return
    const participants = await this.getParticipantList()
    let hostName = ''
    let index = 0
    while (hostName === '' && index < participants.length) {
      if (participants[index].isHost) {
        hostName = participants[index].participantName
      }
      index += 1
    }

    const date = new Date()
    const offset = date.getTimezoneOffset()

    const params = {
      method: 'POST',
      withCredentials: true,
      body: JSON.stringify({ state, ownerId, isDone: false, eventCode: _eventInfo.eventId, hostName, participantTimeDiffInMinutes: offset }),
      headers: { Authorization: 'Bearer ' + _userToken }
    }
    const res = await fetch(`${apiHubServiceUrl}/event/${_eventInfo.id}/State/Save`, params)
    return res
  }

  this.getParticipantState = async () => {
    if (!_userToken) return
    const params = {
      method: 'GET',
      withCredentials: true,
      headers: { Authorization: 'Bearer ' + _userToken }
    }
    const res = await fetch(`${apiHubServiceUrl}/event/${_eventInfo.id}/State`, params)
    return res
  }

  this.getLeaderboardCourseQuiz = async () => {
    if (!_userToken) return
    const params = {
      method: 'GET',
      withCredentials: true,
      headers: { Authorization: 'Bearer ' + _userToken }
    }
    const res = await fetch(`${apiHubServiceUrl}/event/${_eventInfo.id}/Leaderboard?eventCode=${_eventInfo.eventId}&ownerId=${_eventInfo.hostId}`, params)
    return res
  }

  this.submitCourseQuiz = async (state, ownerId) => {
    if (!_userToken) return
    const participants = await this.getParticipantList()
    let hostName = ''
    let index = 0
    while (hostName === '' && index < participants.length) {
      if (participants[index].isHost) {
        hostName = participants[index].participantName
      }
      index += 1
    }

    const date = new Date()
    const offset = date.getTimezoneOffset()

    const params = {
      method: 'POST',
      withCredentials: true,
      body: JSON.stringify({ state, ownerId, isDone: true, eventCode: _eventInfo.eventId, hostName, participantTimeDiffInMinutes: offset }),
      headers: { Authorization: 'Bearer ' + _userToken }
    }
    const res = await fetch(`${apiHubServiceUrl}/event/${_eventInfo.id}/State/Submit`, params)
    return res
  }

  this.createPresetActivity = async (description, title, username, isPrivate = false, config = null, image = null) => {
    const formData = new FormData()
    formData.append('description', description)
    formData.append('title', title)
    formData.append('ownerName', username)
    formData.append('file', image)
    formData.append('isPrivate', isPrivate)

    if (!image) {
      throw new Error('thumbnail image not valid')
    }

    if (_userToken) {
      const params = {
        method: 'POST',
        withCredentials: true,
        body: formData,
        headers: { Authorization: 'Bearer ' + _userToken }
      }

      const res = await fetch(`${apiActivityServiceUrl}/activity/${_rawActivityId}/presetactivity`, params)
      if (res.ok) {
        const data = await res.json()
        _presetActivityId = data.id
        await this.updateActivitySetConfig(config)
      } else {
        const error = await res.text()
        throw error
      }
    }
  }

  this.updatePresetActivity = async (description, title, username, isPrivate = false, config = null, image = null) => {
    const formData = new FormData()
    formData.append('description', description)
    formData.append('title', title)
    formData.append('ownerName', username)
    formData.append('isPrivate', isPrivate)
    formData.append('file', image)

    if (!image) {
      throw new Error('thumbnail image not valid')
    }

    if (_userToken) {
      const params = {
        method: 'PUT',
        withCredentials: true,
        body: formData,
        headers: { Authorization: 'Bearer ' + _userToken }
      }

      const tempId = _presetActivityId.split('/')
      let activityset = _presetActivityId
      if (tempId.length > 1) {
        activityset = tempId[0]
      }

      const res = await fetch(`${apiActivityServiceUrl}/activity/${_rawActivityId}/presetactivity/${activityset}`, params)
      if (res.ok) {
        const data = await res.json()
        _presetActivityId = data.id
        await this.updateActivitySetConfig(config)
      } else {
        const error = await res.text()
        throw error
      }
    }
  }

  // deprecated will be removed
  this.createActivitySet = async (description, title, username, config = null, image = null) => {
    const formData = new FormData()
    formData.append('description', description)
    formData.append('title', title)
    formData.append('ownerName', username)
    formData.append('file', image)

    if (!image) {
      throw new Error('thumbnail image not valid')
    }

    if (_userToken) {
      const params = {
        method: 'POST',
        withCredentials: true,
        body: formData,
        headers: { Authorization: 'Bearer ' + _userToken }
      }

      const res = await fetch(`${apiActivityServiceUrl}/activity/${_rawActivityId}/presetactivity`, params)
      if (res.ok) {
        const data = await res.json()
        _presetActivityId = data.id
        await this.updateActivitySetConfig(config)
      } else {
        const error = await res.text()
        throw error
      }
    }
  }

  // deprecated will be removed
  this.updateActivitySetConfig = async (config) => {
    const formData = new FormData()
    formData.append('configAsString', JSON.stringify(config))

    if (_userToken) {
      const params = {
        method: 'POST',
        withCredentials: true,
        body: formData,
        headers: { Authorization: 'Bearer ' + _userToken }
      }
      const tempId = _presetActivityId.split('/')
      let activityset = _presetActivityId
      if (tempId.length > 1) {
        activityset = tempId[0]
      }

      await fetch(`${apiActivityServiceUrl}/activity/${_rawActivityId}/presetactivity/${activityset}/config`, params)
    }
  }

  // deprecated will be removed
  this.getActivitySetData = async () => {
    const configUrl = new URLSearchParams(window.location.search).get('configUrl')
    const rand = Math.floor(Math.random() * 10000) + 1
    const res = await fetch(`${configUrl}?${rand}`, { method: 'GET' })
    const data = await res.json()
    return data
  }

  this.getPresetActivityData = async () => {
    const tempId = _presetActivityId.split('/')
    let activityset = _presetActivityId
    if (tempId.length > 1) {
      activityset = tempId[0]
    }
    const presetActivityUrl = `${apiActivityServiceUrl}/activity/${_rawActivityId}/presetactivity/${activityset}`
    const res1 = await fetch(presetActivityUrl, { method: 'GET' })
    const presetActivity = await res1.json()

    if (presetActivity.assetUrl) {
      const configUrl = nahtuhsettings.baseUrl + '/presetactivity/' + presetActivity.assetUrl
      if (configUrl) {
        const res2 = await fetch(`${configUrl}`, { method: 'GET' })
        const config = await res2.json()
        presetActivity.config = config
      }
    }

    return presetActivity
  }

  this.getEventData = async () => {
    const params = {
      method: 'GET',
      withCredentials: true,
      headers: { Authorization: 'Bearer ' + _userToken }
    }
    const persistentEventId = new URLSearchParams(window.location.search).get('eventId') || this.eventId
    let eventUrl = `${apiHubServiceUrl}/event/${persistentEventId}`
    if (nahtuhClient.isPreview) {
      eventUrl += '?preview=true'
    }
    const res1 = await fetch(eventUrl, params)
    const eventData = await res1.json()
    _eventCode = eventData.eventCode

    if (eventData.assetUrl) {
      let configUrl = nahtuhsettings.baseUrl + '/events/' + eventData.assetUrl
      if (eventData.assetUrl.split('/').length > 3) {
        configUrl = nahtuhsettings.baseUrl + '/presetactivity/' + eventData.assetUrl
      }
      if (configUrl) {
        const res2 = await fetch(`${configUrl}`, { method: 'GET' })
        const config = await res2.json()
        eventData.config = config
      }
    }

    return eventData
  }

  this.getPublicEventData = async (eventId, hostId) => {
    if (!eventId || !hostId) throw new Error('Event id and host id must not be empty')
    const params = {
      method: 'GET'
    }

    let eventUrl = `${apiHubServiceUrl}/Activity/${_rawActivityId}/Event/${eventId}?hostId=${hostId}`
    if (nahtuhClient.isPreview) {
      eventUrl += '?preview=true'
    }
    const res1 = await fetch(eventUrl, params)
    const eventData = await res1.json()

    if (eventData.assetUrl) {
      let configUrl = nahtuhsettings.baseUrl + '/events/' + eventData.assetUrl
      if (eventData.assetUrl.split('/').length > 3) {
        configUrl = nahtuhsettings.baseUrl + '/presetactivity/' + eventData.assetUrl
      }
      if (configUrl) {
        const res2 = await fetch(`${configUrl}`, { method: 'GET' })
        const config = await res2.json()
        eventData.config = config
      }
    }

    return eventData
  }

  this.courseQuizGenerateQuestions = async (subject, topic, difficulty, amount, language) => {
    console.log('NAHTUH CLIENT - courseQuizGenerateQuestions')
    if (_userToken) {
      const params = {
        method: 'POST',
        withCredentials: true,
        body: JSON.stringify({ subject, topic, difficulty, amount, language }),
        headers: { Authorization: 'Bearer ' + _userToken, 'Content-Type': 'application/json' }
      }
      console.log(params)

      try {
        // const res = await fetch(`${apiUtilityServiceUrl}/GenerateQuestions`, params)
        const res = await fetch(`${apiUtilityServiceUrl}/GenerateQuestions`, params)
        return res.json()
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }

  this.courseQuizGenerateQuestionsArticle = async (article, difficulty, amount, language) => {
    console.log('NAHTUH CLIENT - courseQuizGenerateQuestions')
    if (_userToken) {
      const params = {
        method: 'POST',
        withCredentials: true,
        body: JSON.stringify({ article, difficulty, amount, language }),
        headers: { Authorization: 'Bearer ' + _userToken, 'Content-Type': 'application/json' }
      }
      console.log(params)

      try {
        // const res = await fetch(`${apiUtilityServiceUrl}/GenerateQuestions`, params)
        const res = await fetch(`${apiUtilityServiceUrl}/GenerateQuestionsArticle`, params)
        return res.json()
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }

  this.shareEvent = () => {
    parent.postMessage({ key: 'share', value: true }, '*')
  }

  this.track = (eventName, data) => {
    mixpanel.track(eventName, data)
  }

  /* Helper
    *
    **********************************/

  const $post = (url, body, useCredential = true) => {
    let param = { method: 'POST' }

    if (useCredential) {
      param = {
        ...param,
        withCredentials: true,
        headers: { Authorization: 'Bearer ' + (participantToken ? participantToken.accessToken : _userToken) }
      }
    }

    if (body !== 'undefined') {
      param = { ...param, body: JSON.stringify(body) }
    }

    return new Promise(function (resolve, reject) {
      fetch(`${apiHubServiceUrl}/${url}`, param)
        .then(response => {
          response.text()
            .then(data => {
              if (response.ok) {
                if (data !== '') {
                  try {
                    resolve(JSON.parse(data))
                  } catch (ex) {
                    resolve()
                  }
                } else { resolve() }
              } else {
                reject(data)
              }
            })
        })
        .catch(error => reject(error))
    })
  }

  const $get = (url, useCredential = true) => {
    let param = { method: 'GET' }

    if (useCredential) {
      param = {
        ...param,
        withCredentials: true,
        credentials: 'include',
        headers: { Authorization: 'Bearer ' + participantToken.accessToken }
      }
    }

    return new Promise(function (resolve, reject) {
      fetch(`${apiHubServiceUrl}/${url}`, param)
        .then(response => {
          response.text()
            .then(data => {
              if (response.ok) {
                if (data !== '') { resolve(JSON.parse(data)) } else { resolve() }
              } else {
                reject(data)
              }
            })
        })
        .catch(error => reject(error))
    })
  }

  function sanitizeString (str) {
    return DOMPurify.sanitize(str, { ALLOWED_TAGS: [] })
  }

  this.sanitizeInputString = (inputString) => {
    return sanitizeString(inputString)
  }
}()

export {
  nahtuhClient,
  identityManager
}
