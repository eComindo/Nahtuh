import { CreateEvent } from './create-event.js'
import { Lobby } from './lobby.js'
import { LeaderBoard1 } from './leader-board-1.js'
import { LeaderBoard2 } from './leader-board-2.js'
import { LeaderBoard3 } from './leader-board-3.js'
import { PresetActivityButton, PresetActivityModal } from "./preset-activity.js";

customElements.define('create-event-component', CreateEvent);
customElements.define('lobby-component', Lobby);
customElements.define("preset-activity-button", PresetActivityButton);
customElements.define("preset-activity-modal", PresetActivityModal);
customElements.define('leader-board-1-component', LeaderBoard1);
customElements.define('leader-board-2-component', LeaderBoard2);
customElements.define('leader-board-3-component', LeaderBoard3);