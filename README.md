### Nahtuh Client
Nahtuh client is a javascript library to use nahtuh API to develop real time collaboration application.
### Contents
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
    1. [Login](#1-login)
    2. [Create Event](#2-create-event)
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
#### 1. Login
``````javascript
let response = await identityManager.login(username, password);
``````
##### Parameters
| Name                            | Nullable | Type     | Description                                                        |
| ------------------------------- | -------- | -------- | ------------------------------------------------------------ |
|username|No|String|
|password|No|String|

##### Response
| Name                             | Type     | Description                                                        |
| ------------------------------- | -------- | ------------------------------------------------------------ |
|username|String|
|accessToken|String|Token used to access nahtuh API
|refreshToken|String|Token used to refresh accessToken

#### 2. Create Event
``````javascript
let response = await nahtuhClient.createEvent(activityId, presetActivityId, participantName, avatarUrl, userToken, autoStart);
``````
##### Parameters
| Name                            | Nullable | Type     | Description                                                        |
| ------------------------------- | -------- | -------- | ------------------------------------------------------------ |
|activityId|No|String|Unique Id used by the activity created an activity is submitted to nahtuh
|presetActivityId|Yes|String|Preset activity id you want to use to create the event
|participantName|No|String|nickname you want to use in this activity
|avatarUrl|Yes|String|Url to the avatar you want to use in this activity
|accessToken|No|String|Access Token you get from [Login](#login)
|autoStart|Yes|Boolean|Auto Connect web socket when value is true

##### Response
| Name                             | Type     | Description                                                        |
| ------------------------------- | -------- | ------------------------------------------------------------ |
|eventInfo|[EventInfo](#eventinfo)|
|participant|[Participant](#participant)|
|participantToken|[ParticipantToken](#participantToken)|

### Types
#### EventInfo
| Name                             | Type     | Description                                                        |
| ------------------------------- | -------- | ------------------------------------------------------------ |
|activityId|String|Unique Id used by the activity created an activity is submitted to nahtuh
|participant|[Participant](#participant)|
|participantToken|[ParticipantToken](#participantToken)|
#### Participant
#### ParticipantToken