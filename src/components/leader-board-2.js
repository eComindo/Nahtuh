import {
  LitElement,
  html,
  css,
} from "lit-element";
import { leaderBoard2Styles } from "./leader-board-2-styles.js";
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

// function getContentWidth(element) {
//   const styles = window.getComputedStyle(element);

//   return (
//     element.clientWidth -
//     parseFloat(styles.paddingLeft) -
//     parseFloat(styles.paddingRight)
//   );
// }

class LeaderBoard2 extends LitElement {
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
    let innerHtmlRankList = "";
    const maxScore = sortedData[0].score;
    // const rankContentWidth = getContentWidth(rankList);
    sortedData.forEach((x, i) => {
      let dark = this.darkMode;
      let cu = x.id === this.id;
      let progressBarWidth = `${(x.score / maxScore) * 100}%`;
      let rankItem = `
      <div class="${dark ? "dark-" : ""}individual-rank" ${
        i !== sortedData.length - 1 ? 'style="margin-bottom: 8px;"' : ""
      }>
        <div class="individual-rank-progress-bar${
          cu ? "-current-user" : ""
        }" style="width: ${progressBarWidth};">
          <div class="rank-content">
            <div class="participant-rank text-12 text-${
              dark && !cu ? "white" : "dark-blue"
            }">${i + 1}</div>
            <div class="participant">
                ${getAvatar(x.id, x.name)}
                <div class="text-12 text-${
                  dark && !cu ? "white" : "dark-blue"
                }">${nameCapitalize(x.name)}</div>
            </div>
            <div class="participant-point text-12 text-${
              dark && !cu ? "white" : "dark-blue"
            }">${x.score} pts</div>
          </div>
        </div>    
      </div>
      `;
      innerHtmlRankList += rankItem;
    });
    rankList.innerHTML = innerHtmlRankList;
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
          <div class="title">Leaderboard</div>
          <div class="${dark ? "dark-" : ""}rank-panel">
            <div id="rank-list" class="rank-list"></div>
          </div>
        </div>
      </div>
    `;
  }

  static get styles() {
    return leaderBoard2Styles;
  }
}

export { LeaderBoard2 };
