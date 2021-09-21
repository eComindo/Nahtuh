import {
  LitElement,
  html,
  css,
} from "lit-element";
import { leaderBoard1Styles } from "./leader-board-1-styles.js";
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

function getRandomColor(str) {
  var val = 0;
  str.split("").forEach((c) => (val += c.charCodeAt(0)));
  return colorGradient[val % colorGradient.length];
}

function nameShorten(name) {
  const split = name.split(" ");
  if (split.length === 1) return split[0][0].toUpperCase();
  else return `${split[0][0]}${split[split.length - 1][0]}`.toUpperCase();
}

function nameCapitalize(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

function getAvatar(id, name) {
  return `<div class="participant-avatar text-white text-12"
      style="background-image: linear-gradient(to bottom right, ${getRandomColor(
        id
      )});">
        ${nameShorten(name)}
      </div>`;
}

class LeaderBoard1 extends LitElement {
  static get properties() {
    return {
      darkMode: { type: Boolean },
      data: { type: Array, attribute: false },
      username: { type: String, attribute: false },
      id: { type: String, attribute: false },
      isHost: { type: Boolean, attribute: false },
      participants: { type: Array, attribute: false },
    };
  }

  constructor() {
    super();
    const player = nahtuhClient.getCurrentParticipant();
    this.isHost = player.isHost;
    this.username = player.participantName;
    this.id = player.participantId;
    this.participants = [];
    this.data = nahtuhClient.eventVars.leaderBoardData;
  }

  async firstUpdated(changedProperties) {
    this.addListner();
    nahtuhClient.getParticipantList().then((res) => {
      this.participants = res.filter((p) => !p.isHost);
      this.renderRank();
    });
  }

  addListner() {
    window.addEventListener(
      "onEventVariableChanged",
      this.onEventVariableChanged
    );
    // window.addEventListener("onParticipantLeave", this.onParticipantLeft);
  }

  removeListener() {
    window.removeEventListener(
      "onEventVariableChanged",
      this.onEventVariableChanged
    );
  }

  // onParticipantLeft = (datas) => {
  //   nahtuhClient.getParticipantList().then((res) => {
  //     this.participants = res.filter((p) => !p.isHost);
  //     this.renderRank();
  //   });
  // }

  onEventVariableChanged = (datas) => {
    const data = datas.detail;
    if (data.name === "leaderBoardData" && data.value) {
      this.removeListener();
      this.data = data.value;
      this.renderRank();
      this.addListner();
    }
  };

  renderRank() {
    let sortedData;
    if (this.sortByTime) sortedData = this.data.sort((a, b) => { return b.score - a.score || b.time - a.time; })
    else sortedData = this.data.sort((a, b) => { return b.score - a.score; })
    let rankList = this.renderRoot.querySelector("#rank-list");
    let champions = this.renderRoot.querySelector("#champions");
    let innerHtmlRankList = "";
    let innerHtmlChampions = "";
    sortedData.forEach((x, i) => {
      let is1st = i === 0;
      let dark = this.darkMode;
      let cu = x.id === this.id;
      if (i <= 2) {
        let champs = `
          ${
            is1st
              ? `
          <div class="title">
              <div class="text-semi-bold text-center text-white text-18">
              Leaderboard
              </div>
          </div>`
              : ""
          }
          <div id="${is1st ? "winner" : i === 1 ? "runner-up" : "third-place"}">
          <div class="${dark && !cu ? "dark-" : ""}avatar${
          is1st ? "-winner-" : "-"
        }container${cu ? "-current-user" : ""}">
            <div
              class="avatar${
                is1st ? "-winner-" : "-"
              }content text-white text-semi-bold text-${is1st ? "24" : "18"}"
              style="background-image: linear-gradient(to bottom right, ${getRandomColor(
                x.id
              )});">
                ${nameShorten(x.name)}
            </div>
            ${is1st ? '<div class="winner-crown"></div>' : ""}
          </div>
          <div class="text-white text-center text-12 text-semi-bold" style="z-index: 2; white-space: nowrap; width: ${is1st ? '100%' : '70%'}; overflow: hidden; text-overflow: clip; text-overflow: ellipsis;">
            ${nameCapitalize(x.name)}
          </div>
          <div class="cube${is1st ? "-winner" : ""}">
            <div class="side ${dark ? 'dark-' : ''}front">
              <div class="${
                is1st ? "winner" : i === 1 ? "runner-up" : "third-place"
              }-podium-content">
                <div class="${dark ? "dark-" : ""}point-chip">
                  <div class="text-center text-white text-12 text-semi-bold">
                    ${x.score} <span class="text-regular">pts</span>
                  </div>
                </div>
                <div class="number">${i + 1}</div>
              </div>
            </div>
            <div class="side ${dark ? "dark-" : ""}top"></div>
          </div>
        </div>
      `;
        innerHtmlChampions += champs;
      } else {
        let rankItem = `
        <div class="individual-rank${cu ? "-current-user" : ""}" ${
          i !== sortedData.length - 1 ? 'style="margin-bottom: 8px;"' : ""
        }>
            <div class="participant-rank text-12 text-${dark && !cu ? 'white' : 'dark-blue'}">${i + 1}</div>
                <div class="participant">
                    ${getAvatar(x.id, x.name)}
                    <div class="text-12 text-${dark && !cu ? 'white' : 'dark-blue'}">${nameCapitalize(
                      x.name
                    )}</div>
                </div>
            <div class="participant-point text-12 text-${dark && !cu ? 'white' : 'dark-blue'}">${
              x.score
            } pts</div>
        </div>
        `;
        innerHtmlRankList += rankItem;
      }
    });
    rankList.innerHTML = innerHtmlRankList;
    champions.innerHTML = innerHtmlChampions;
  }

  render() {
    let dark = this.darkMode;
    return html`
      <style>
        ::-webkit-scrollbar-thumb {
          background: #${dark ? "459AF2" : "d3e5f97a"};
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #${dark ? "2C436B" : "cfe2f7"};
        }
      </style>
      <div class="${dark ? "dark-" : ""}root-leaderboard-container">
        <div class="centered-container">
          <div id="champions" class="champions"></div>
        </div>
        <div class="centered-container">
          <div class="${dark ? 'dark-' : ''}rank-panel">
            <div id="rank-list" class="rank-list"></div>
          </div>
        </div>
      </div>
    `;
  }

  static get styles() {
    return leaderBoard1Styles;
  }
}

export { LeaderBoard1 };
