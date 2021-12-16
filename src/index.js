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
import nahtuhsettings from './nahtuh-settings';
import ObservableSlim from './observable-slim';
import identityManager from './identitymanager';

const nahtuhClient = new function () {

    /* Constants
     * 
     **********************************/

    // default service url
    const apiHubServiceUrl = nahtuhsettings.apiHubServiceUrl;
    const apiActivityServiceUrl = nahtuhsettings.apiActivityServiceUrl;

    /* Private properties
    *
    **********************************/
    var scope = this

    // hold hub connection
    var connection;

    // hold activity info that is sets by parent container
    var _activityId = null;
    var _rawActivityId = null;
    var _presetActivityId = null;
    var _avatar = null;
    
    // hold current user access and refresh token
    var _userToken = null;

    // hold detail of current event
    var _eventInfo = null;

    // hold current participant access and refresh token
    var participantToken = null;

    // hold detail of current participant
    var participantInfo = null;

    /* Public properties
    *
    **********************************/
    this.participantId = null;
    this.eventId = null;
    this.isLoadingActivitySet = false;
    this.isActivitySetOwner = false;

    /* Callback functions
    *
    **********************************/

    // call back function when new participant join to an event
    this.onParticipantJoined = () => {};

    // call back function when new participant leave an event
    this.onParticipantLeave = () => {};

    // call back function when host connected or reconnected an event
    this.onHostConnected = () => {};

    // call back function when host disconnected in an event
    this.onHostDisconnected = () => {};

    // call back function when new message received
    this.onIncomingMessage = () => {};

    // call back function when connection closed
    this.onStopped = () => {};

    // call back function when participant join to a group
    this.onGroupMemberJoined = () => {};

    // call back function when participant leave from a group
    this.onGroupMemberLeft = () => {};

    // call back function when event variable changed
    this.onEventVariableChanged = () => {};
    this.onGroupVariableChanged = () => {};
    this.onHostVariableChanged = () => {};

    /* Initialization API
    *
    **********************************/

    var handlePostMessage = (event) => {
        switch (event.data.key) {
            case 'setactivityinfo':
                _activityId = event.data.value.activityId;
                _presetActivityId = event.data.value.presetActivityId;
                _userToken = event.data.value.userToken;
                break;
        }
    }

    this.init = () => {
        window.addEventListener("message", handlePostMessage, true);
        window.onfocus = function(){
            if(connection){
                if(connection.state === 'Disconnected'){
                    connection.start()
                }
            }
        }

        _userToken = new URLSearchParams(window.location.search).get('accessToken');
        _activityId = new URLSearchParams(window.location.search).get('activityId') || 'X002';
        _activityId = _activityId.toUpperCase();
        _rawActivityId = new URLSearchParams(window.location.search).get('rawActivityId');
        _presetActivityId = new URLSearchParams(window.location.search).get('activitySetId');
        _avatar = new URLSearchParams(window.location.search).get('avatar');
        var isActivitySetOwnerTemp = new URLSearchParams(window.location.search).get('isActivitySetOwner');

        if(_presetActivityId){
            this.isLoadingActivitySet = true;
        }

        if(isActivitySetOwnerTemp){
            this.isActivitySetOwner = true;
        }

        try{
            const resizeObserver = new ResizeObserver(entries => {
                var body = document.body,
                    html = document.documentElement;
    
                var height = Math.max(body.scrollHeight, body.offsetHeight,
                    html.clientHeight, html.scrollHeight, html.offsetHeight);
    
                parent.postMessage({ key: 'setheight', value: height });
            });
            resizeObserver.observe(document.body);

            // request parent to set activity info
            parent.postMessage({ key: 'getactivityinfo' });
        }catch(err){
            console.log(err)
        }
    }

    // start initialization
    this.init();

    /* Connection API
    *
    **********************************/

    // start connection to hub service
    this.start = () => {
        return new Promise(function (resolve, reject) {

            connection = new signalR.HubConnectionBuilder()
                .withUrl(`${apiHubServiceUrl}/api/v2`, { accessTokenFactory: () => participantToken.accessToken })
                .withAutomaticReconnect()
                .configureLogging(signalR.LogLevel.Information)
                .build();

            connection.on('onIncomingMessage', (data) => { 
                var onMessageEvent = new CustomEvent('onIncomingMessage', {detail: data});
                window.dispatchEvent(onMessageEvent);
                scope.onIncomingMessage(data); 
            });

            connection.on('onParticipantJoined', (data) => {
                var participantJoinEvent = new CustomEvent('onParticipantJoined', {detail: data});
                window.dispatchEvent(participantJoinEvent);
                scope.onParticipantJoined(data); 
            });

            connection.on('onParticipantLeave', (data) => { 
                var participantLeaveEvent = new CustomEvent('onParticipantLeave', {detail: data});
                window.dispatchEvent(participantLeaveEvent);
                scope.onParticipantLeave(data);
            });

            connection.on('onHostConnected', data => scope.onHostConnected(data))

            connection.on('onHostDisconnected', data => scope.onHostDisconnected(data))

            connection.onclose(() => { scope.onStopped(); })

            connection.on('onGroupMemberJoined', (data) => { scope.onGroupMemberJoined(data); });

            connection.on('onGroupMemberLeft', (data) => { scope.onGroupMemberLeft(data); });

            connection.on('onEventVariableChanged', (data) => {
                if (data.sender !== participantInfo.participantId) {
                    _eventVars[data.name] = data.value;
                    var onVarChangeEvent = new CustomEvent('onEventVariableChanged', {detail: data});
                    window.dispatchEvent(onVarChangeEvent);
                    scope.onEventVariableChanged(data);
                }
            });

            connection.on('onGroupVariableChanged', (data) => {
                if (data.sender !== participantInfo.participantId) {
                    _groupVars[data.groupName][data.name] = data.value;
                    scope.onGroupVariableChanged(data);
                }
            });

            connection.on('onHostVariableChanged', (data) => {
                if (data.sender !== participantInfo.participantId) {
                    //_eventVars[data.name] = data.value;
                    scope.onHostVariableChanged(data);
                }
            });

            connection.start()
                .then(() => {
                    getAllSharedVars('E', 'a').then(() => {
                        // scope.addEventConnection();
                        resolve()
                    });
                });

        });
    }

    // stop connection to hub service
    this.stop = () => {
        connection.stop();
    }

    /* Event API
    *
    **********************************/

    // create an event
    this.createEvent = async (participantName, autoStart = true) => {
        if(!_userToken){
            if(window.location.origin.includes('nahtuh')){
                throw 'Invalid access token, please login before creating event';
            }
            try{
                let res = await identityManager.login(participantName, 'xxxx');
                _userToken = res.accessToken;
            }catch(ex){
                console.log(ex);
            }
        }

        var name = sanitizeString(participantName);
        if(name.length > 20) throw 'Invalid name';

        try{
            var data = await $post('createevent',
            {
                'activityId': _activityId,
                'activitySetId': _presetActivityId,
                'participantName': name,
                'avatarUrl': _avatar,
                'userToken': _userToken,
                'rawId': _rawActivityId
            }, false);

            _eventInfo = data.eventInfo;
            this.eventId = _eventInfo.eventId;
            participantInfo = data.participant;
            scope.participantId = participantInfo.participantId;
            participantToken = data.participantToken;
            
            parent.postMessage({key: 'eventInfo', value: JSON.stringify(_eventInfo)}, '*');
            parent.postMessage({key: 'username', value: participantName}, '*');

            if (autoStart) {
                await scope.start();
            }
            return data;
        }catch(error){
            throw error;
        }
    }

    // join to an event
    this.join = (eventId, participantName, autoStart = true) => {
        var name = sanitizeString(participantName)
        if(name.length > 20) throw 'Invalid name';

        return new Promise(function (resolve, reject) {
            $post('join',
                { 'eventId': eventId, 'participantName': name, 'avatarUrl': _avatar, 'userToken': _userToken }, false)
                .then(data => {
                    _eventInfo = data.eventInfo;
                    scope.eventId = eventId;
                    participantInfo = data.participant;
                    scope.participantId = participantInfo.participantId;
                    participantToken = data.participantToken;
                    
                    parent.postMessage({key: 'username', value: name}, '*');

                    if (autoStart) {
                        scope.start().then(() => resolve(data))
                            .catch(error => reject(error));
                    } else {
                        resolve(data);
                    }
                })
                .catch((error) => reject(error));
        });
    }

    this.addEventConnection = () => {
        $post('addeventconnection', {
            ConnectionId: connection.connectionId,
            Name: participantInfo.participantName,
            EventId: _eventInfo.eventId
        });
    }

    // create an event
    this.leaveEvent = (autoStop = true) => {
        return new Promise(function (resolve, reject) {
            $post('leaveevent')
                .then(() => {
                    ObservableSlim.remove(scope.eventVars);
                    ObservableSlim.remove(scope.groupVars);
                    if (autoStop) scope.stop();
                    resolve();
                })
                .catch(() => reject('Error while try to leave'));
        });
    }

    /* Participant API
    *
    **********************************/

    // get list of event participants
    this.getParticipantList = () => {
        return new Promise(function (resolve, reject) {
            $post('participants')
                .then(data => { resolve(data); })
                .catch(error => reject(error));
        });
    }

    // get current participant info
    this.getCurrentParticipant = () => { return participantInfo; }

    /* Group Management API
    *
    **********************************/

    // join to group
    this.joinGroup = (participantId, groupName) => {
        return new Promise(function (resolve, reject) {
            $post('joingroup', { 'participantId': participantId, 'groupName': groupName })
                .then(() => {
                    _groupVars[groupName] = {};
                    getAllSharedVars('G', groupName).then(() => resolve());
                })
                .catch(() => reject('Error joining group'))
        });
    }

    /// leave from group
    this.leaveGroup = (participantId, groupName) => {
        ObservableSlim.remove(this.groupVars[groupName]);

        return new Promise(function (resolve, reject) {
            $post('leavegroup', { 'participantId': participantId, 'groupName': groupName })
                .then(() => { resolve(); })
                .catch(() => reject('Error leaving group'))
        });
    }

    this.getGroupMember = (groupName) => {
        return new Promise(function (resolve, reject) {
            $post(`participants/${groupName}`)
                .then(data => { resolve(data); })
                .catch(error => reject(error));
        });
    }

    /* Messaging API
    *
    **********************************/

    this.broadcast = (content) => { 
        content = { 'content': content }
        connection.invoke("broadcast2", JSON.stringify(content));
        // $post('broadcast', { 'content': content }); 
    }

    this.sendToUser = (participantId, content) => {
        content = { 'content': content }
        connection.invoke("sendToUser2", participantId, JSON.stringify(content));
        // $post('sendToUser', { 'participantId': participantId, 'content': content });
    }

    this.sendToGroup = (groupName, content) => {
        content = { 'content': content }
        connection.invoke("sendToGroup2", groupName, JSON.stringify(content));
        // $post('sendToGroup', { 'groupName': groupName, 'content': content });
    }

    /* Cloud Variable API
    *
    **********************************/

    // hold cloud variable that is accesible by all event participants
    var _eventVars = {};
    var _groupVars = {};

    function setSharedVariable(varScope, identifier, name, value) {
        return new Promise(function (resolve, reject) {
            $post('setsharedvariable/atomic', {
                'scope': varScope, 'items': [{
                    'identifier': identifier, 'name': name, 'value': value, 'previousValue': scope.eventVars[name]
                }]
            })
                .then(() => resolve(value))
                .catch(error => reject(error));
        });
    }

    // get all shared variable. this is called when connection started
    function getAllSharedVars(scope, identifier) {
        return new Promise(function (resolve, reject) {
            $get(`getallsharedvariables/${scope}/${identifier}`)
                .then(data => {
                    switch (scope) {
                        case 'E':
                            data.forEach(item => {
                                _eventVars[item.name] = item.value;
                            });
                            break;
                        case 'G':
                            data.forEach(item => {
                                _groupVars[identifier][item.name] = item.value;
                            });
                            break;
                    }
                    resolve();
                })
                .catch(error => reject(error));
        });
    }

    // set event variable by ensuring it's atomicity
    this.setEventVariable = (name, value) => {
        return new Promise(function (resolve, reject) {
            setSharedVariable('E', null, name, value)
                .then((data) => { _eventVars[name] = value; resolve(data); })
                .catch((error) => { reject(error) });
        });
    }

    // set group variable by ensuring it's atomicity
    this.setGroupVariable = (group, name, value) => {
        return new Promise(function (resolve, reject) {
            setSharedVariable('G', group, name, value)
                .then((data) => { _groupVars[group][name] = value; resolve(data); })
                .catch((error) => { reject(error) });
        });
    }

    // set event variable by ignoring it's atomicity
    this.eventVars = ObservableSlim.create(_eventVars, true, function (changes) {
        var params = { 'scope': 'E', 'items': [] };

        changes.forEach(item => {
            params.items.push(
                { 'identifier': null, 'name': item.property, 'value': item.newValue, 'previousValue': null });
        });

        $post('setsharedvariable/override', params);
    });

    // set event variable by ignoring it's atomicity
    this.groupVars = ObservableSlim.create(_groupVars, true, function (changes) {
        var params = { 'scope': 'G', 'items': [] };
        changes.forEach(item => {

            var groupName = item.currentPath.substring(0, item.currentPath.indexOf("."));
            params.items.push(
                { 'identifier': groupName, 'name': item.property, 'value': item.newValue, 'previousValue': null });
        });

        $post('setsharedvariable/override', params);
    });

    /* Persistent Variable API
    *
    **********************************/
    this.setPersistentVars = (vars) => {
        return new Promise(function (resolve, reject) {
            $post('PersistentVariable', { 'items': vars })
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }
    
    this.getPersistentVars = (name) => {
        return new Promise(function (resolve, reject) {
            $get(`PersistentVariable/${name}`)
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }

    /* Activity Configuration API
    *
    **********************************/
    this.setConfiguration = (configuration) => {
        return new Promise(function (resolve, reject) {
            $post('Configuration', configuration)
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }

    this.getConfiguration = () => {
        return new Promise(function (resolve, reject) {
            $get(`Configuration`)
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }

    /* Host Configuration API
    *
    **********************************/
    this.setHostConfiguration = (configuration) => {
        return new Promise(function (resolve, reject) {
            $post('hostconfig', {eventId: _eventInfo.eventId, value: configuration})
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }

    this.getHostConfiguration = () => {
        return new Promise(function (resolve, reject) {
            $get(`hostconfig/${_eventInfo.eventId}`)
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }


    this.createPresetActivity = async (description, title, username, isPrivate = false, config = null, image = null) => {
        let formData = new FormData();
        formData.append('description', description);
        formData.append('title', title);
        formData.append('ownerName', username);
        formData.append('file', image);
        formData.append('isPrivate', isPrivate);
        
        if(!image){
            throw 'thumbnail image not valid';
        }

        if(_userToken){
            let params = {
                method: 'POST',
                withCredentials: true,
                body: formData,
                headers: { 'Authorization': 'Bearer ' + _userToken }
            }

            try{
                let res = await fetch(`${apiActivityServiceUrl}/api/activity/${_rawActivityId}/presetactivity`, params);
                let data = await res.json();
                _presetActivityId = data.id;
                await this.updateActivitySetConfig(config);
            }catch(err){
                throw err;
            }
        }
    }

    this.updatePresetActivity = async (description, title, username, isPrivate = false, config = null, image = null) => {
        let formData = new FormData();
        formData.append('description', description);
        formData.append('title', title);
        formData.append('ownerName', username);
        formData.append('isPrivate', isPrivate);
        formData.append('file', image);
        
        if(!image){
            throw 'thumbnail image not valid';
        }

        if(_userToken){
            let params = {
                method: 'PUT',
                withCredentials: true,
                body: formData,
                headers: { 'Authorization': 'Bearer ' + _userToken }
            }

            let tempId = _presetActivityId.split('/')
            let activityset = _presetActivityId
            if(tempId.length > 1){
                activityset = tempId[0]
            }

            try{
                let res = await fetch(`${apiActivityServiceUrl}/api/activity/${_rawActivityId}/presetactivity/${activityset}`, params);
                let data = await res.json();
                _presetActivityId = data.id;
                await this.updateActivitySetConfig(config);
            }catch(err){
                throw err;
            }
        }
    }

    //deprecated will be removed
    this.createActivitySet = async (description, title, username, config = null, image = null) => {
        let formData = new FormData();
        formData.append('description', description);
        formData.append('title', title);
        formData.append('ownerName', username);
        formData.append('file', image);
        
        if(!image){
            throw 'thumbnail image not valid';
        }

        if(_userToken){
            let params = {
                method: 'POST',
                withCredentials: true,
                body: formData,
                headers: { 'Authorization': 'Bearer ' + _userToken }
            }

            try{
                let res = await fetch(`${apiActivityServiceUrl}/api/activity/${_rawActivityId}/presetactivity`, params);
                let data = await res.json();
                _presetActivityId = data.id;
                await this.updateActivitySetConfig(config);
            }catch(err){
                throw err;
            }
        }
    }

    //deprecated will be removed
    this.updateActivitySetConfig = async (config) => {
        let formData = new FormData();
        formData.append('configAsString', JSON.stringify(config));

        if(_userToken){
            let params = {
                method: 'POST',
                withCredentials: true,
                body: formData,
                headers: { 'Authorization': 'Bearer ' + _userToken }
            }
            let tempId = _presetActivityId.split('/')
            let activityset = _presetActivityId
            if(tempId.length > 1){
                activityset = tempId[0]
            }

            try{
                let res = await fetch(`${apiActivityServiceUrl}/api/activity/${_rawActivityId}/presetactivity/${activityset}/config`, params);
            }catch(err){
                throw err;
            }
        }
    }

    //deprecated will be removed
    this.getActivitySetData = async () => {
        let configUrl = new URLSearchParams(window.location.search).get("configUrl");
        let rand = Math.floor(Math.random() * 10000) + 1;
        let res = await fetch(`${configUrl}?${rand}`, {method: 'GET'});
        let data = await res.json();
        return data;
    }

    this.getPresetActivityData = async () => {
        let tempId = _presetActivityId.split('/');
        let activityset = _presetActivityId;
        if(tempId.length > 1){
            activityset = tempId[0];
        }
        let presetActivityUrl = `${apiActivityServiceUrl}/api/activity/${_rawActivityId}/presetactivity/${activityset}`;
        let res1 = await fetch(presetActivityUrl, {method: 'GET'});
        let presetActivity = await res1.json();

        let configUrl = new URLSearchParams(window.location.search).get("configUrl");
        let rand = Math.floor(Math.random() * 10000) + 1;
        let res2 = await fetch(`${configUrl}?${rand}`, {method: 'GET'});
        let config = await res2.json();
        presetActivity.config = config;

        return presetActivity;
    }

    this.shareEvent = () => {
        parent.postMessage({key: 'share', value: true}, '*');
    }

    /* Helper
    *
    **********************************/

    var $post = (url, body, useCredential = true) => {
        var param = { method: 'POST' };

        if (useCredential) {
            param = {
                ...param, withCredentials: true, 
                headers: { 'Authorization': 'Bearer ' + participantToken.accessToken }
            };
        }

        if (body !== 'undefined') {
            param = { ...param, body: JSON.stringify(body) };
        }

        return new Promise(function (resolve, reject) {
            fetch(`${apiHubServiceUrl}/api/${url}`, param)
                .then(response => {
                    response.text()
                        .then(data => {
                            if (response.ok) {
                                if (data !== '') { 
                                    try{
                                        resolve(JSON.parse(data));
                                    } catch(ex){
                                        resolve();
                                    }
                                } else { resolve(); }
                            }
                            else {
                                reject(data);
                            }
                        });
                })
                .catch(error => reject(error))
        });
    };

    var $get = (url, useCredential = true) => {
        var param = { method: 'GET' };

        if (useCredential) {
            param = {
                ...param, withCredentials: true, credentials: 'include',
                headers: { 'Authorization': 'Bearer ' + participantToken.accessToken }
            };
        }

        return new Promise(function (resolve, reject) {
            fetch(`${apiHubServiceUrl}/api/${url}`, param)
                .then(response => {
                    response.text()
                        .then(data => {
                            if (response.ok) {
                                if (data !== '') { resolve(JSON.parse(data)); } else { resolve(); }
                            }
                            else {
                                reject(data);
                            }
                        });
                })
                .catch(error => reject(error))
        });
    };

    function randomString(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
            charactersLength));
       }
       return result;
    }

    function sanitizeString(str){
        str = str.replace(/([^a-z0-9áéíóúñü_-\s\.,]|[\t\n\f\r\v\0])/gim,"");
        return str.trim();
    }
}

export {
    nahtuhClient,
    identityManager
}