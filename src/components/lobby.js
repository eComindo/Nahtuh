import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";
import { lobbyStyles } from "./lobby-styles.js";
import { nahtuhClient } from '../index.js';

const colorGradient = [
  css`#FBD06A, #AC30FF`,
  css`#8CC3EC, #949CE5`,
  css`#C9D302, #09C650`,
  css`#FDCC6D, #FF65C5`,
  css`#0FD1D3, #E5CB4B`,
  css`#33BDFB, #AC30FF`,
  css`#F8CC6B, #FAAC7B`,
  css`#2CF19A, #0DB5E6`,
  css`#75CBCC, #0596E8`,
  css`#75CBCC, #0596E8`,
];

function validCssValue(cssProp, val) {
  if (cssProp == "length") return false;
  if (val == "") return true;
  var style = new Option().style;
  if (style[cssProp] != "") return false;
  style[cssProp] = val;
  return style[cssProp] !== "";
}

function nameShorten(name) {
  const split = name.split(" ");
  if (split.length === 1) return split[0][0].toUpperCase();
  else return `${split[0][0]}${split[split.length - 1][0]}`.toUpperCase();
}

function nameCapitalize(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

function getRandomColor(str) {
  var val = 0;
  str.split("").forEach((c) => (val += c.charCodeAt(0)));
  return colorGradient[val % colorGradient.length];
}

class Lobby extends LitElement {
  static get properties() {
    return {
      validateBeforeStart: { type: Function },
      validateOnInit: { type: Function },
      onAlert: { type: Function },
      onStart: { type: Function },
      onJoin: { type: Function },
      onLeave: { type: Function },
      onVarsChange: { type: Function },
      leaveEvent: { type: Function },
      denyLatePlayers: { type: Boolean },
      showLog: { type: Boolean },
      colorPrimary: { type: String },
      colorSecondary: { type: String },
      colorDanger: { type: String },
      activityName: { type: String, attribute: false },
      activityThumbnail: { type: String, attribute: false },
      eventId: { type: String, attribute: false },
      username: { type: String, attribute: false },
      isHost: { type: Boolean, attribute: false },
      participants: { type: Array, attribute: false },
    };
  }

  constructor() {
    super();
    this.participants = [];
    this.denyLatePlayers = false;
    this.showLog = false;
    const player = nahtuhClient.getCurrentParticipant();
    this.isHost = player.isHost;
    this.username = player.participantName;

    const url = new URLSearchParams(window.location.search);
    this.eventId = url.get("id") || this.eventId;
    this.activityName = url.get("activityname") || "No Activity Name";
    this.activityThumbnail =
      url.get("activityThumbnail") ||
      "https://www.searchpng.com/wp-content/uploads/2019/09/Meme-Face-PNG-Image-715x715.jpg";
  }

  async firstUpdated(changedProperties) {
    let validateFlag = { status: false, message: '', leave: true }
    if (typeof this.validateOnInit === 'function') validateFlag = await this.validateOnInit();
    if (validateFlag.status || (this.denyLatePlayers && nahtuhClient.eventVars.isStartedFromLobby)) {
      if (typeof this.onAlert === 'function'
        && validateFlag.message !== '')
        this.onAlert(validateFlag.message)
      if (validateFlag.leave) await this.leaveEventHandler();
    }

    this.colorPrimary = validCssValue("color", this.colorPrimary) ? this.colorPrimary : css`#459af2`;
    this.colorSecondary = validCssValue("color", this.colorSecondary) ? this.colorSecondary : css`#1f43c1`;
    this.colorDanger = validCssValue("color", this.colorDanger) ? this.colorDanger : css`#FE522C`;

    this.addListener();
    nahtuhClient.getParticipantList().then((res) => {
      this.participants = res.filter((p) => !p.isHost);
      const host = res.find((p) => p.isHost);
      this.renderHost(host);
      this.renderList();
    });
  }

  disconnectedCallback() {
    this.removeListener();
    super.disconnectedCallback();
  }

  startGame = async () => {
    let validateFlag = { status: true, message: '' }
    console.log('CHECK VALIDATE BEFORE START', typeof this.validateBeforeStart === 'function')

    if (this.isHost
      && typeof this.validateBeforeStart === 'function') {
      validateFlag = await this.validateBeforeStart();
      console.log('CHECK RESULT VALIDATE', this.validateBeforeStart(), validateFlag, validateFlag.status);
    }

    if (validateFlag.status) {
      if (this.isHost) nahtuhClient.eventVars.isStartedFromLobby = true;

      var timer = 3;
      var countdown = this.renderRoot.querySelector("#countdown");
      countdown.style.display = "flex";
      var interval = setInterval((lobby = this) => {
        if (timer < 1) {
          clearInterval(interval);
          console.log("timer stopped");
          this.removeListener();
          if (typeof lobby.onStart === "function") lobby.onStart();
          return;
        }
        timer--;
        countdown.innerHTML = `<div id="timer">${timer}</div>`;
      }, 1000);

    } else {
      if (typeof this.onAlert === 'function'
        && validateFlag.message !== '')
        this.onAlert(validateFlag.message)
    }
  };

  leaveEventHandler = () => {
    nahtuhClient.leaveEvent().then(() => {
      if (typeof this.leaveEvent === "function") this.leaveEvent();
    });
  };

  onParticipantJoin = (data) => {
    data = data.detail;
    if (nahtuhClient.eventVars.isStartedFromLobby) return;
    nahtuhClient.getParticipantList().then((res) => {
      this.participants = res.filter((p) => !p.isHost);
      this.renderList();
    });
    this.addLog("joined", data.participantName);
    if (typeof this.onJoin === "function") this.onJoin(data);
  };

  onParticipantLeft = (data) => {
    data = data.detail;
    if (nahtuhClient.eventVars.isStartedFromLobby) return;
    nahtuhClient.getParticipantList().then((res) => {
      this.participants = res.filter((p) => !p.isHost);
      this.renderList();
    });
    this.addLog("left", data.participantName);
    if (typeof this.onLeave === "function") this.onLeave(data);
  };

  onEventVariableChanged = (data) => {
    data = data.detail;
    if (data.name === "isStartedFromLobby" && data.value) {
      this.removeListener();
      this.startGame();
    }
  };

  addListener() {
    window.addEventListener("onParticipantJoined", this.onParticipantJoin);
    window.addEventListener("onParticipantLeave", this.onParticipantLeft);
    window.addEventListener("onEventVariableChanged", this.onEventVariableChanged);
  }

  removeListener() {
    window.removeEventListener("onParticipantJoined", this.onParticipantJoin);
    window.removeEventListener("onParticipantLeave", this.onParticipantLeft);
    window.removeEventListener("onEventVariableChanged", this.onEventVariableChanged);
  }

  listenOnVariableChange(scope, activityCallback = () => { }) {
    scope.onEventVariableChanged = this.onEventVariableChanged;
    this.onVarsChange = activityCallback;
  }

  addLog = (type, name) => {
    var logContainer = this.renderRoot.querySelector(".logs-content");
    var log = document.createElement("div");
    log.className = `log ${type == "joined" ? "log-primary" : "log-danger"}`;
    log.innerHTML = `<span>${name}</span> has ${type}`;
    logContainer.appendChild(log);
  };

  lobbyTabHandler = () => (this.showLog = false);
  logTabHandler = () => (this.showLog = true);

  renderHost = (host) => {
    var hostName = this.renderRoot.querySelector("#event-host span");
    var hostShortname = this.renderRoot.querySelector("#event-host div");
    var hostAvatar = this.renderRoot.querySelector("#event-host .user-avatar");

    hostName.innerText = host.participantName;
    hostShortname.innerText = nameShorten(host.participantName);
    hostAvatar.style.background = `linear-gradient(to bottom right, ${getRandomColor(host.participantId)})`;
  };

  renderList = () => {
    var participantList = this.renderRoot.querySelector("#participant-list");
    var innerHtml = "";

    this.participants.forEach((p) => {
      var playerBlock = `
      <div class="user-block ${p.participantName == this.username ? "user-current" : ""}">
        <div class="user-avatar"
        style="background-image: linear-gradient(to bottom right, ${getRandomColor(p.participantId)});">
          ${nameShorten(p.participantName)}
        </div>
        <span>${p.participantName}</span>
      </div> 
      `;
      innerHtml += playerBlock;
    });
    participantList.innerHTML = innerHtml;
  };

  render() {
    return html`
      <style>
        :host {
          --colorPrimary: ${this.colorPrimary};
          --colorSecondary: ${this.colorSecondary};
          --colorDanger: ${this.colorDanger};
        }
      </style>
      <div class="root-lobby-container">
        <div class="lobby-container">
          <div class="activity-info-container">
            <div class="activity-info-header">
              <div id="activity-info-wrapper">
                <img id="activity-thumbnail" src="${this.activityThumbnail}" alt="image" />
                <div id="activity-header">
                  <div id="activity-name">${this.activityName}</div>
                  <div id="event-id">Event: <span>${this.eventId}</span></div>
                  <div id="event-host">
                    Host:
                    <div class="user-avatar"></div>
                    <span></span>
                  </div>
                </div>
              </div>
              <div
                id="action-btn"
                @click="${this.isHost ? this.startGame : this.leaveEventHandler}"
                class="btn ${this.isHost ? "btn-primary" : "btn-secondary"}"
              >
                ${this.isHost ? "Start" : "Leave Event"}
              </div>
            </div>

            <div class="bar ${nahtuhClient.eventVars.isStartedFromLobby ? "bar-danger" : "bar-primary"}">
              ${nahtuhClient.eventVars.isStartedFromLobby
        ? "The game has already started"
        : "Waiting for host to start the event"}
            </div>

            <div class="tabs">
              <div @click="${this.lobbyTabHandler}" class="tab ${classMap({ active: !this.showLog })}">Lobby</div>
              <div @click="${this.logTabHandler}" class="tab ${classMap({ active: this.showLog })}">Log</div>
            </div>

            <div id="participant-count" class=${classMap({ active: !this.showLog })}>
              Participants: <span>${this.participants.length}</span>
            </div>
            <div id="participant-list" class=${classMap({ active: !this.showLog })}></div>
          </div>

          <div class="logs-container ${classMap({ active: this.showLog })}">
            <div class="logs-header">Log</div>
            <div class="logs-content"></div>
          </div>
        </div>
        <div id="countdown">
          <div id="timer">3</div>
        </div>
      </div>
    `;
  }

  static get styles() {
    return lobbyStyles;
  }
}

export { Lobby };
