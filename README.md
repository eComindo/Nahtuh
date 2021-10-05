### Nahtuh Client
Nahtuh client is a javascript library to use nahtuh API to develop real time collaboration application.
### Contents
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
    - [Connection Api](#connection-api)
        - [Start Connection](#start-connection)
        - [Stop Connection](#stop-connection)
    - [Event Management Api](#event-management-api)
        - [Create Event](#create-event)
        - [Join Event](#join-event)
        - [Leave Event](#leave-event)
        - [Get Participant List](#get-participant-list)
        - [Get Current Participant](#get-current-participant)
    - [Group Management Api](#group-management-api)
        - [Join Group](#join-group)
        - [Leave Group](#leave-group)
        - [Get Group Member](#get-group-member)
    - [Messaging Api](#messaging-api)
        - [Broadcast](#broadcast)
        - [Send To User](#send-to-user)
        - [Send To Group](#send-to-group)
    - [Event Handlers](#event-handlers)
        - [On Participant Joined](#on-participant-joined)
        - [On Participant Leave](#on-participant-leave)
        - [On Incoming Message](#on-incoming-message)
        - [On Group Member Joined](#on-group-member-joined)
        - [On Group Member Left](#on-group-member-left)
        
### Getting Started
#### CDN
``````html
<!-- index.html -->
<script src="https://cdn.nahtuh.com/libraries/nahtuhclient.js"></script>
<script>
  const { nahtuhClient, identityManager } = window.NahtuhClient;
</script>
``````
### NPM
```
npm i nahtuh-client
```
``````javascript
import { nahtuhClient, identityManager } from 'nahtuh-client';
``````
### API Documentation
#### Connection API
##### Start Connection
Start websocket connection
``````javascript
// use this only when autoStart is set to false
let response = await nahtuhClient.start();
``````

##### Stop Connection
Stop websocket connection
``````javascript
// use this only when autoStart is set to false
let response = await nahtuhClient.stop();
``````

#### Event Management API
##### Create Event
``````javascript
let response = await nahtuhClient.createEvent(participantName, autoStart);
``````
###### Parameters
| Name                            | Nullable | Type     | Description                                                        |
| ------------------------------- | -------- | -------- | ------------------------------------------------------------ |
|participantName|No|String|nickname you want to use in the event
|autoStart|Yes|Boolean|Auto Connect web socket when value is true

###### Response
| Name                             | Type     | Description                                                        |
| ------------------------------- | -------- | ------------------------------------------------------------ |
|eventInfo|[EventInfo](#eventinfo)|
|participant|[Participant](#participant)|
|participantToken|[ParticipantToken](#participantToken)|

##### Join Event
``````javascript
let response = await nahtuhClient.join(eventId, participantName, autoStart);
``````
###### Parameters
| Name                            | Nullable | Type     | Description                                                        |
| ------------------------------- | -------- | -------- | ------------------------------------------------------------ |
|eventId|No|String|Unique Id of the event you want to join to
|participantName|No|String|nickname you want to use in the event
|autoStart|Yes|Boolean|Auto Connect web socket when value is true

###### Response
| Name                             | Type     | Description                                                        |
| ------------------------------- | -------- | ------------------------------------------------------------ |
|eventInfo|[EventInfo](#eventinfo)|
|participant|[Participant](#participant)|
|participantToken|[ParticipantToken](#participantToken)|

##### Leave Event
``````javascript
let response = await nahtuhClient.leaveEvent(autoStop);
``````
###### Parameters
| Name                            | Nullable | Type     | Description                                                        |
| ------------------------------- | -------- | -------- | ------------------------------------------------------------ |
|autoStop|Yes|Boolean|Auto Disconnect web socket when value is true

##### Get Participant List
Get all participants in the current event
``````javascript
let response = await nahtuhClient.getParticipantList();
``````
###### Response
| Name                             | Type     | Description                                                        |
| ------------------------------- | -------- | ------------------------------------------------------------ |
||[List<Participant>](#participant)|

##### Get Current Participant
Get current participant info
``````javascript
let response = await nahtuhClient.getCurrentParticipant();
``````
###### Response
| Name                             | Type     | Description                                                        |
| ------------------------------- | -------- | ------------------------------------------------------------ |
||[Participant](#participant)|

#### Group Management API
##### Join Group
Create or join existing group
``````javascript
let response = await nahtuhClient.joinGroup(participantId, groupName);
``````
###### Parameters
| Name                            | Nullable | Type     | Description                                                        |
| ------------------------------- | -------- | -------- | ------------------------------------------------------------ |
|participantId|No|String|
|groupName|No|String|

##### Leave Group
``````javascript
let response = await nahtuhClient.leaveGroup(participantId, groupName);
``````
###### Parameters
| Name                            | Nullable | Type     | Description                                                        |
| ------------------------------- | -------- | -------- | ------------------------------------------------------------ |
|participantId|No|String|
|groupName|No|String|

##### Get Group Member
Get all group members
``````javascript
let response = await nahtuhClient.getGroupMember(groupName);
``````
###### Parameters
| Name                            | Nullable | Type     | Description                                                        |
| ------------------------------- | -------- | -------- | ------------------------------------------------------------ |
|groupName|No|String|

###### Response
| Name                             | Type     | Description                                                        |
| ------------------------------- | -------- | ------------------------------------------------------------ |
||[List<GroupMember>](#groupMember)|

#### Messaging API
##### Broadcast
Send message to all event participants
``````javascript
let response = await nahtuhClient.broadcast(message);
``````
###### Parameters
| Name                            | Nullable | Type     | Description                                                        |
| ------------------------------- | -------- | -------- | ------------------------------------------------------------ |
|message|No|String|

##### Send To User
Send message to a specific user
``````javascript
let response = await nahtuhClient.sendToUser(participantId, message);
``````
###### Parameters
| Name                            | Nullable | Type     | Description                                                        |
| ------------------------------- | -------- | -------- | ------------------------------------------------------------ |
|participantId|No|String|
|message|No|String|

##### Send To Group
Send message to all participant in a specific group
``````javascript
let response = await nahtuhClient.sendToGroup(groupName, message);
``````
###### Parameters
| Name                            | Nullable | Type     | Description                                                        |
| ------------------------------- | -------- | -------- | ------------------------------------------------------------ |
|groupName|No|String|
|message|No|String|

#### Event Handlers
##### On Participant Joined
Call back function when new participant join to an event
``````javascript
nahtuhClient.onParticipantJoined = (data) => {}
``````
###### Data
| Name                             | Type     | Description                                                        |
| ------------------------------- | -------- | ------------------------------------------------------------ |
||[Participant](#participant)|

##### On Participant Leave
call back function when new participant leave an event
``````javascript
nahtuhClient.onParticipantLeave = (data) => {}
``````
###### Data
| Name                             | Type     | Description                                                        |
| ------------------------------- | -------- | ------------------------------------------------------------ |
||[Participant](#participant)|

##### On Incoming Message
call back function when new message received
``````javascript
nahtuhClient.onIncomingMessage = (data) => {}
``````
###### Data
| Name                             | Type     | Description                                                        |
| ------------------------------- | -------- | ------------------------------------------------------------ |
||[Message](#message)|

##### On Group Member Joined
call back function when participant join to a group
``````javascript
nahtuhClient.onGroupMemberJoined = (data) => {}
``````
###### Data
| Name                             | Type     | Description                                                        |
| ------------------------------- | -------- | ------------------------------------------------------------ |
|groupName|String|
|participantId|String|
|participantName|String|

##### On Group Member Left
call back function when participant left a group
``````javascript
nahtuhClient.onGroupMemberLeft = (data) => {}
``````
###### Data
| Name                             | Type     | Description                                                        |
| ------------------------------- | -------- | ------------------------------------------------------------ |
|groupName|String|
|participantId|String|
|participantName|String|

### Types
#### EventInfo
| Name                             | Type     | Description                                                        |
| ------------------------------- | -------- | ------------------------------------------------------------ |
|activityId|String|Unique Id used by the activity created an activity is submitted to nahtuh
|activitySetId|String|
|createdDate|String|Timestamp of the event creation
|eventId|String|Unique Id for the newly created event
|invitationUrl|String|
#### Participant
| Name                             | Type     | Description                                                        |
| ------------------------------- | -------- | ------------------------------------------------------------ |
|avatarUrl|String|
|connected|Boolean|connection status of the websocket
|isHost|Boolean|
|participantId|String|
|participantName|String|
#### ParticipantToken
| Name                             | Type     | Description                                                        |
| ------------------------------- | -------- | ------------------------------------------------------------ |
|username|String|
|accessToken|String|Token used to access nahtuh API
|refreshToken|String|Token used to refresh accessToken
#### GroupMember
| Name                             | Type     | Description                                                        |
| ------------------------------- | -------- | ------------------------------------------------------------ |
|participantId|String|
|participantName|String|

#### Message
| Name                             | Type     | Description                                                        |
| ------------------------------- | -------- | ------------------------------------------------------------ |
|method|String|BM = Broadcast Message, PM=Private Message, GM = Group Message
|content|String|
|senderId|String|ParticipantId of the sender