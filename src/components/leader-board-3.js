import {
    LitElement,
    html,
    css,
  } from "lit-element";
  import { leaderBoard3Styles } from "./leader-board-3-styles.js";
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
  
  class LeaderBoard3 extends LitElement {
    static get properties() {
      return {
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
      let decoration = this.renderRoot.querySelector("#decoration");
      let innerHtmlRankList = "";
      let innerHtmlChampions = "";
      const position = ['winner', 'runner-up', 'third-place'];
      const color = ['#FF553B', '#F8B727', '#1BBBD1']
      sortedData.forEach((x, i) => {
        let cu = x.id === this.id;
        if (i <= 2) {
          let champ = `
          ${i === 0 ? `
          <div class="title">Leaderboard</div>
          <div class="clouds">
            <div class="cloud1"></div>
            <div class="cloud2"></div>
            <div class="cloud3"></div>
          </div>
          ` : ""}
          <div class="${position[i]} ${cu ? 'cu-animation' : ''}">
          <div class="baloon" style="background-color: ${color[i]};">
            <div class="avatar text-white" style="background-image: linear-gradient(to bottom right, ${getRandomColor(x.id)});">${nameShorten(x.name)}</div>
            <div class="text-white text-12" style="position: relative; top: 20px; text-align: center;">
            <div style="white-space: nowrap; width:100px; overflow: hidden; text-overflow: clip; text-overflow: ellipsis;">${nameCapitalize(x.name)}</div>
            </div>
            <div class="point-chip text-white text-12" style="position: relative; top: 22.5px;">${x.score} pts</div>
          </div>
          <div class="baloon-bottom text-white text-12" style="background-color: ${color[i]};">${i+1}</div>
          <svg width="17" height="198" viewBox="0 0 17 198" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.19206 0.437011C-15.7824 50.179 34.8882 118.123 7.19205 197.587" stroke="white" stroke-width="2"/>
            </svg>
        </div>
          `
          innerHtmlChampions += champ
        } else {
          let rankItem = `
          <div class="individual-rank${cu ? "-current-user" : ""}" ${i !== sortedData.length - 1 ? 'style="margin-bottom: 8px;"' : ''}>
              <div class="participant-rank text-12 text-dark-blue}">${i + 1}</div>
                  <div class="participant">
                      ${getAvatar(x.id, x.name)}
                      <div class="text-12 text-dark-blue}">${nameCapitalize(
                        x.name
                      )}</div>
                  </div>
              <div class="participant-point text-12 text-dark-blue}">${
                x.score
              } pts</div>
          </div>
          `;
          innerHtmlRankList += rankItem;
        }
      });
      rankList.innerHTML = innerHtmlRankList;
      decoration.innerHTML = innerHtmlChampions
    }
  
    render() {
      return html`
        <style>
          ::-webkit-scrollbar-thumb {
            background: #d3e5f97a;
            border-radius: 10px;
          }
  
          ::-webkit-scrollbar-thumb:hover {
            background: #cfe2f7;
            border-radius: 10px;
          }
        </style>
        <div class="root-leaderboard-container">
        <div class="centered-container">
          <div id="decoration" class="decoration"></div>
            <div class="rank-panel">
              <div id="rank-list" class="rank-list"></div>
            </div>
          </div>
        </div>
      `;
    }
  
    static get styles() {
      return leaderBoard3Styles;
    }
  }
  
  export { LeaderBoard3 };
  