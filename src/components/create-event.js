import {
  LitElement,
  html,
  css,
  unsafeCSS,
} from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";
import { nahtuhClient, identityManager } from '../index.js';

function validCssValue(cssProp, val) {
  if (cssProp == "length") return false;
  if (val == "") return true;
  var style = new Option().style;
  if (style[cssProp] != "") return false;
  style[cssProp] = val;
  return style[cssProp] !== "";
}

class CreateEvent extends LitElement {
  static get properties() {
    return {
      colorPrimary: { type: String, reflect: true },
      colorSecondary: { type: String, reflect: true },
      colorLink: { type: String, reflect: true },
      onStart: { type: Function },
      onAlert: { type: Function },
      activityName: { type: String, attribute: false },
      activityThumbnail: { type: String, attribute: false },
      eventId: { type: String, attribute: false },
      username: { type: String, attribute: false },
      isHost: { type: Boolean, attribute: false },
    };
  }

  constructor() {
    super();
    this.isHost = true;
  }

  firstUpdated(changedProperties) {
    const url = new URLSearchParams(window.location.search);
    this.eventId = url.get("id") || "";
    this.username = url.get("username") || "";
    this.activityName = url.get("activityname") || "lol";
    this.activityThumbnail =
      url.get("activityThumbnail") ||
      "https://www.searchpng.com/wp-content/uploads/2019/09/Meme-Face-PNG-Image-715x715.jpg";

    this.colorLink = validCssValue("color", this.colorLink) ? this.colorLink : css`#459af2`;
    this.colorPrimary = validCssValue("color", this.colorPrimary)
      ? this.colorPrimary
      : css`#459af2`;
    this.colorSecondary = validCssValue("color", this.colorSecondary)
      ? this.colorSecondary
      : css`#1f43c1`;

    if (this.eventId) {
      if (this.validate(this.username, this.eventId, this.isHost)) {
        nahtuhClient
          .join(this.eventId, this.username, "")
          .then((response) => {
            this.onStart(response);
          })
          .catch((error) => {
            this.toggleForm();
            this.renderRoot.querySelector(".loader").remove();
            this.onAlert(error);
          });
      }
      return;
    }

    this.renderRoot.querySelector(".loader").remove();
    this.renderRoot.querySelector("#username").focus();
    this.renderRoot.querySelector("#username").addEventListener("keydown", (e) => {
      if (e.code == "Enter") {
        e.preventDefault();
        this.renderRoot.querySelector("#enter-btn").click();
      }
    });
  }

  start = async () => {
    this.renderRoot.querySelector("#enter-btn").innerText = "Loading...";
    this.username = this.renderRoot.querySelector("#username").value;
    this.eventId = this.renderRoot.querySelector("#event-id").value;

    if (this.validate(this.username, this.eventId, this.isHost)) {
      if (this.isHost) {
        try {
          let loginResponse = await identityManager.login(this.username, "eventId");
          let createEventResponse = await nahtuhClient.createEvent(
            "XHM",
            "",
            this.username,
            "",
            loginResponse.accessToken
          );
          this.onStart(createEventResponse);
        } catch (err) {
          console.log(err);
          this.renderRoot.querySelector("#enter-btn").innerText = "Create";
        }
      } else {
        await nahtuhClient
          .join(this.eventId, this.username, "")
          .then((response) => {
            this.onStart(response);
          })
          .catch((error) => {
            this.onAlert(error);
            this.renderRoot.querySelector("#enter-btn").innerText = "Join";
          });
      }
    } else {
      this.renderRoot.querySelector("#enter-btn").innerText = this.isHost ? "Create" : "Join";
    }
  };

  toggleForm() {
    this.isHost = !this.isHost;
    this.renderRoot.querySelector("#enter-btn").innerText = this.isHost ? "Create" : "Join";
  }

  validate(uname, eventId, isHost) {
    var text = "";
    if (!isHost && !eventId) text = "Event ID cannot be empty.";
    else if (uname.length < 3 || !/\S/.test(uname))
      text = "Username should be at least 3 characters long.";
    else if (uname.length > 20) text = "Username can only be at most 20 characters long.";
    if (text.length !== 0) {
      this.onAlert(text);
      return false;
    }
    return true;
  }

  render() {
    return html`
      <style>
        :host {
          --colorPrimary: ${this.colorPrimary};
          --colorSecondary: ${this.colorSecondary};
          --colorLink: ${this.colorLink};
        }
      </style>
      <div class="loader">Loading...</div>
      <div class="create-event-container">
        <div class="form-container">
          <img src="${this.activityThumbnail}" alt="${this.activityName}" id="thumbnail" />
          <div id="activity-name">${this.activityName}</div>
          <div id="title">${this.isHost ? "Create Event" : "Join an existing event"}</div>
          <div id="event-id-wrapper" class=${classMap({ hidden: this.isHost })}>
            <label for="event-id" class="label"> Event Code </label>
            <input
              type="text"
              id="event-id"
              name="event-id"
              value=${this.eventId}
              placeholder="Type Event Code..."
              class="form-input"
            />
          </div>
          <div id="username-wrapper">
            <label for="nickname" class="label">Nickname</label>
            <input
              type="text"
              id="username"
              name="nickname"
              value=${this.username}
              placeholder="Type Nickname..."
              class="form-input"
            />
          </div>
          <button id="enter-btn" @click="${this.start}" class="btn">
            ${this.isHost ? "Create" : "Join"}
          </button>
        </div>
        <div id="backlink" @click="${this.toggleForm}">
          ${this.isHost ? "Join an existing event" : "Create Event"}
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        width: 100%;
      }
      .loader {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #f4f8fd;
        z-index: 40;
      }
      .hidden {
        display: none;
      }
      input,
      button {
        -webkit-appearance: none;
        appearance: none;
        border: none;
        background-image: none;
        background-color: transparent;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        font: inherit;
      }
      input:focus {
        -webkit-appearance: none;
        outline: 2px solid transparent;
        outline-offset: 2px;
        box-shadow: none;
      }

      .create-event-container {
        width: 100%;
        font-family: Poppins, inherit;
        font-weight: 400;
        color: #071755;
        margin-top: 4.5rem;
      }

      .form-container {
        margin: 1rem;
        padding: 0 1rem 1rem 1rem;
        background: #ffffff;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;

        -moz-box-shadow: 0px 8px 16px hsla(213, 50%, 2%, 0.06);
        -webkit-box-shadow: 0px 8px 16px hsla(213, 50%, 2%, 0.06);
        box-shadow: 0px 8px 16px hsla(213, 50%, 2%, 0.06);
      }

      #username-wrapper,
      #event-id-wrapper {
        width: 100%;
        text-align: left;
      }

      .form-input {
        appearance: none;
        border: 1px solid rgba(7, 23, 85, 0.2);
        width: 100%;
        padding: 0.75rem 1.5rem;
        box-sizing: border-box;
        -moz-border-radius: 9999px;
        -webkit-border-radius: 9999px;
        border-radius: 9999px;
        margin-bottom: 1rem;
        font-size: 12px;
      }
      .form-input:focus {
        border: 1px solid rgba(7, 23, 85, 0.4);
      }

      .btn {
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        width: 100%;
        padding: 0.75rem 0;
        text-align: center;
        -moz-border-radius: 9999px;
        -webkit-border-radius: 9999px;
        border-radius: 9999px;
        background: linear-gradient(
          90deg,
          var(--colorPrimary) 3.21%,
          var(--colorSecondary) 105.94%
        );
        color: #ffffff;
        transition: all 0.15s ease-in-out;
      }
      .btn:hover,
      #backlink:hover {
        filter: brightness(0.9);
      }

      .label {
        width: 100%;
        margin: 0 0 0.25rem 1.5rem;
        font-size: 12px;
        font-weight: 500;
      }

      #title {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 1rem;
      }

      #activity-name {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      #thumbnail {
        width: 9rem;
        height: 9rem;
        border-radius: 16px;
        margin: -4.5rem 0 1rem 0;
      }

      #backlink {
        text-align: center;
        font-size: 14px;
        color: var(--colorLink);
        cursor: pointer;
      }

      @media (min-width: 576px) {
        :host,
        .create-event-container {
          width: 26rem;
        }
        .form-container {
          padding: 0 1.5rem 1.5rem;
        }
      }
    `;
  }
}

export { CreateEvent };
