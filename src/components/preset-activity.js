import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";
import { presetStyles } from "./preset-activity-styles.js";

function validCssValue(cssProp, val) {
  if (cssProp == "length") return false;
  if (val == "") return true;
  var style = new Option().style;
  if (style[cssProp] != "") return false;
  style[cssProp] = val;
  return style[cssProp] !== "";
}

class PresetActivityButton extends LitElement {
  static get properties() {
    return {
      colorPrimary: { type: String, reflect: true },
      colorSecondary: { type: String, reflect: true },
      buttonPrompt: { type: String },
      refModal: { attribute: false },
    };
  }

  constructor() {
    super();
    this.buttonPrompt = "Save Activity";
  }

  firstUpdated(changedProperties) {
    this.colorPrimary = validCssValue("color", this.colorPrimary) ? this.colorPrimary : css`#459af2`;
    this.colorSecondary = validCssValue("color", this.colorSecondary) ? this.colorSecondary : css`#1f43c1`;
  }

  toggleModal() {
    this.refModal.toggleModal();
  }

  render() {
    return html`
      <style>
        :host {
          --colorPrimary: ${this.colorPrimary};
          --colorSecondary: ${this.colorSecondary};
        }
      </style>
      <div @click="${this.toggleModal}" class="btn btn-primary">${this.buttonPrompt}</div>
    `;
  }

  static get styles() {
    return presetStyles;
  }
}

class PresetActivityModal extends LitElement {
  static get properties() {
    return {
      BLOB_SOURCE: { type: String },
      colorPrimary: { type: String, reflect: true },
      colorSecondary: { type: String, reflect: true },
      username: { type: String, attribute: false },
      isOwner: { type: Boolean },
      isPrivate: { type: Boolean },
      title: { type: String },
      desc: { type: String },
      config: { type: Object },
      imageUrl: { attribute: false },
      thumbnail: { attribute: false },
      validate: { type: Function },
      getConfig: { type: Function },
    };
  }

  constructor() {
    super();
    var devHost = "https://yaidevstraccwebapp.blob.core.windows.net";
    var prodHost = "https://nahtuhprodstasset.blob.core.windows.net";
    this.BLOB_SOURCE = location.host == "nahtuh.com" ? prodHost : devHost;

    this.imageUrl = "";
    this.thumbnail = "";
    this.isPrivate = true;
    this.validate = () => true;
    this.config = {};
  }

  // DROPZONE UTILS
  // ****************************************************************

  clearPreview() {
    this.renderRoot.querySelector("#preset-activity-thumbnail").value = null;
    this.imageUrl = "";
    this.thumbnail = "";
  }

  dropHandler(event) {
    event.preventDefault();
    this.fileChosen(event);
  }

  fileChosen(event) {
    this.fileToDataUrl(event, (src) => (this.imageUrl = src));
  }

  fileToDataUrl(event, callback) {
    if (!event.target?.files?.length && !event.dataTransfer?.files?.length) return;
    const files = [...(event.target?.files?.length ? event.target?.files : event.dataTransfer?.files)];

    let file = files[0];
    let reader = new FileReader();
    this.thumbnail = file;

    reader.readAsDataURL(file);
    reader.onload = (e) => {
      callback(e.target.result);
    };
  }

  // PRESET
  // ****************************************************************

  savePresetHandler() {
    this.config = this.getConfig();
    if (this.isOwner) {
      swal({
        title: "Update Activity Set",
        text: "Your previous activity set will be overwritten.\nAre you sure?",
        buttons: {
          cancel: "Nevermind",
          saveAs: {
            text: "Save As",
            value: "saveAs",
          },
          save: true,
        },
      }).then((value) => {
        if (value == "saveAs") this.saveAsPresetActivity();
        else if (value) this.updatePresetActivity();
      });
    } else this.saveAsPresetActivity();
  }

  saveAsPresetActivity() {
    if (this.validate())
      yai
        .createPresetActivity(this.desc, this.title, this.username, this.isPrivate, this.config, this.thumbnail)
        .then(() => {
          this.toggleModal();
          swal({
            icon: "success",
            text: "Question set successfully made into preset activity!",
            button: false,
          });
        })
        .catch((err) => swal({ icon: "error", text: err, button: false }));
  }

  updatePresetActivity() {
    if (this.validate())
      yai
        .updatePresetActivity(this.desc, this.title, this.username, this.isPrivate, this.config, this.thumbnail)
        .then(() => {
          this.toggleModal();
          swal({
            icon: "success",
            text: "Preset activity successfully updated!",
            button: false,
          });
        })
        .catch((err) => swal({ icon: "error", text: err, button: false }));
  }

  loadPresetActivityData(data) {
    this.title = data.title;
    this.desc = data.description;
    this.isPrivate = data.isPrivate;

    this.renderRoot.querySelector("#preset-activity-title").value = data.title;
    this.renderRoot.querySelector("#preset-activity-desc").value = data.description;
    this.renderRoot.querySelector("#set-private").checked = data.isPrivate;
    this.renderRoot.querySelector("#set-public").checked = !data.isPrivate;
    this.renderRoot.querySelector("#load-thumbnail").src = this.BLOB_SOURCE + "/presetactivity/" + data.imageUrl;
  }

  loadThumbnail() {
    var el = this.renderRoot.querySelector("#load-thumbnail");
    this.loadPresetThumbnail(el.src).then((res) => (this.imageUrl = res));
  }

  loadPresetThumbnail = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    this.thumbnail = blob;
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  // UTILS
  // ****************************************************************

  setTitle(event) {
    this.title = event.target.value;
  }

  setDesc(event) {
    this.desc = event.target.value;
  }

  setIsPrivate() {
    this.isPrivate = this.renderRoot.querySelector("#set-private").checked;
  }

  toggleModal() {
    var body = document.querySelector("body");
    var modal = this.renderRoot.querySelector(".modal");
    modal.classList.toggle("hidden");
    modal.classList.toggle("pointer-events-none");
    body.style.overflow = body.style.overflow === "hidden" ? "initial" : "hidden";
  }

  firstUpdated(changedProperties) {
    this.username = new URLSearchParams(window.location.search).get("username") || "";
    this.colorPrimary = validCssValue("color", this.colorPrimary) ? this.colorPrimary : css`#459af2`;
    this.colorSecondary = validCssValue("color", this.colorSecondary) ? this.colorSecondary : css`#1f43c1`;

    document.addEventListener('keydown', (e) => {
      e = e || window.event;
      var isEscape = false;
      if ("key" in e) {
        isEscape = e.key === "Escape" || e.key === "Esc";
      } else {
        isEscape = e.code === "Escape";
      }
      var modal = this.renderRoot.querySelector(".modal");
      if (isEscape && !modal.classList.contains("hidden")) {
        this.toggleModal();
      }
    });
  }

  render() {
    return html`
      <style>
        :host {
          --colorPrimary: ${this.colorPrimary};
          --colorSecondary: ${this.colorSecondary};
        }
      </style>
      <div class="modal hidden pointer-events-none">
        <div class="modal-overlay" @click="${this.toggleModal}"></div>

        <div class="modal-container">
          <div class="modal-close modal-close-icon" @click="${this.toggleModal}">
            &#x2715; <span class="text-sm">(Esc)</span>
          </div>

          <div class="modal-content p-8 text-left">
            <div class="flex justify-between items-center pb-4">
              <p class="text-xl font-bold">Save as Preset Activity</p>
              <div class="modal-close cursor-pointer text-black z-50" @click="${this.toggleModal}">&#x2715;</div>
            </div>

            <form id="save-as-preset-activity" class="flex flex-col">
              <label for="title" class="text-sm ml-6 mb-1">Title</label>
              <input
                id="preset-activity-title"
                name="title"
                type="text"
                placeholder="Preset activity title"
                class="input-form mb-4"
                @change="${this.setTitle}"
              />
              <div class="flex gap-8 ml-6 mb-1">
                <label for="set-private">
                  <input id="set-private" type="radio" name="is-private" checked @change="${this.setIsPrivate}" />
                  Private
                </label>
                <label for="set-public">
                  <input id="set-public" type="radio" name="is-private" @change="${this.setIsPrivate}" /> Public
                </label>
              </div>
              <div class="bg-secondary mb-4 rounded-full px-6 py-2 text-sm">
                ${this.isPrivate
                  ? "Only you can view and use this preset activity."
                  : "Everyone may use and customize this preset activity."}
              </div>
              <label for="desc" class="text-sm ml-6 mb-1">Description</label>
              <textarea
                id="preset-activity-desc"
                name="title"
                placeholder="Type preset activity description"
                class="input-form mb-4 rounded-card resize-none"
                rows="3"
                @change="${this.setDesc}"
              ></textarea>
              <label for="thumbnail" class="text-sm ml-6">Thumbnail</label>
              <div class="rounded-card overflow-hidden w-full my-2">
                <div class="w-full">
                  <div class="relative border-dashed h-40 rounded-card border-dashed border border-gray-300 p-2">
                    <div class="relative w-full h-full flex justify-center items-center">
                      <!-- Show the image -->
                      <div class="${classMap({ hidden: this.imageUrl == "" })} h-full w-full">
                        <div class="relative rounded-lg h-full w-full">
                          <img src="${this.imageUrl}" class="object-contain w-full h-full" />
                          <div
                            @click="${this.clearPreview}"
                            class="btn btn-danger btn-rounded text-base absolute bottom-0 right-0 z-20"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="20"
                              height="20"
                              viewBox="0 0 172 172"
                            >
                              <g
                                fill="none"
                                fill-rule="nonzero"
                                stroke="none"
                                stroke-width="1"
                                stroke-linecap="butt"
                                stroke-linejoin="miter"
                                stroke-miterlimit="10"
                                stroke-dasharray=""
                                stroke-dashoffset="0"
                                font-family="none"
                                font-weight="none"
                                font-size="none"
                                text-anchor="none"
                                style="mix-blend-mode: normal"
                              >
                                <path d="M0,172v-172h172v172z" fill="none"></path>
                                <g fill="#ffffff">
                                  <path
                                    d="M71.66667,14.33333l-7.16667,7.16667h-28.66667c-3.956,0 -7.16667,3.21067 -7.16667,7.16667c0,3.956 3.21067,7.16667 7.16667,7.16667h14.33333h71.66667h14.33333c3.956,0 7.16667,-3.21067 7.16667,-7.16667c0,-3.956 -3.21067,-7.16667 -7.16667,-7.16667h-28.66667l-7.16667,-7.16667zM35.83333,50.16667v93.16667c0,7.91917 6.41417,14.33333 14.33333,14.33333h71.66667c7.91917,0 14.33333,-6.41417 14.33333,-14.33333v-93.16667z"
                                  ></path>
                                </g>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>

                      <!-- Show the gray box when image is not available -->
                      <div class=${classMap({ hidden: this.imageUrl != "" })}>
                        <div class="flex flex-col items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="48"
                            height="48"
                            viewBox="0 0 172 172"
                            class="placeholder"
                          >
                            <g
                              fill="none"
                              fill-rule="nonzero"
                              stroke="none"
                              stroke-width="1"
                              stroke-linecap="butt"
                              stroke-linejoin="miter"
                              stroke-miterlimit="10"
                              stroke-dasharray=""
                              stroke-dashoffset="0"
                              font-family="none"
                              font-weight="none"
                              font-size="none"
                              text-anchor="none"
                              style="mix-blend-mode: normal"
                            >
                              <path d="M0,172v-172h172v172z" fill="none"></path>
                              <g class="fill-this">
                                <path
                                  d="M28.66667,28.66667c-7.83362,0 -14.33333,6.49972 -14.33333,14.33333v86c0,7.83362 6.49972,14.33333 14.33333,14.33333h114.66667c7.83362,0 14.33333,-6.49972 14.33333,-14.33333v-86c0,-7.83362 -6.49972,-14.33333 -14.33333,-14.33333zM28.66667,43h114.66667v86h-114.66667zM71.66667,57.33333c-3.95804,0 -7.16667,3.20863 -7.16667,7.16667c0,3.95804 3.20863,7.16667 7.16667,7.16667c3.95804,0 7.16667,-3.20863 7.16667,-7.16667c0,-3.95804 -3.20863,-7.16667 -7.16667,-7.16667zM103.91667,78.83333l-25.08333,28.66667l-17.91667,-17.91667l-19.51237,25.08333h89.38737z"
                                ></path>
                              </g>
                            </g>
                          </svg>
                          <span class="block text-gray-400 text-xs font-normal">Drag and drop image or</span>
                          <div class="btn btn-primary py-1 px-12 mt-2">Browse</div>
                        </div>
                      </div>
                      <img id="load-thumbnail" src="" alt="" @load="${this.loadThumbnail}" class="hidden" />
                      <input
                        id="preset-activity-thumbnail"
                        imgSrc=""
                        type="file"
                        class="h-full w-full opacity-0 absolute top-0 z-10 cursor-pointer"
                        accept="image/*"
                        @drop="${this.dropHandler}"
                        @change="${this.fileChosen}"
                        name="thumbnail"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div class="flex pt-2 gap-2">
              <button class="modal-close btn btn-secondary mr-2 flex-1" @click="${this.toggleModal}">Cancel</button>
              <button id="hp-export-set-btn" class="btn btn-primary flex-1" @click="${this.savePresetHandler}">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    `;
  }

  static get styles() {
    return presetStyles;
  }
}

export { PresetActivityButton, PresetActivityModal };
