# Lobby Component 

Digunakan sebagai waiting room saat host menunggu player untuk join event sekaligus saat player menunggu host memulai event. 

> Sebaiknya dirender setelah `createEvent` atau `join` berhasil. 

## Usage

``````html
<!-- index.html -->
<div id="lobby-container"></div>
``````

```javascript
/* index.js */ 
var container = document.getElementById("lobby-container");

// method yang dipanggil setelah join atau create event 
function onConnected(data) {
  // do something..
  renderLobby(data);
}

function renderGame() { /* do something.. */ }
function leaveEvent() {/* do something.. ex. window.location.reload() */}
function validateBeforeStart() {
  /* Do something to validate before starting the event*/
  /**
   * status: if validated and pass
   * message: message to put when validation fail
   */
  return { status: true, message: '' }
}
function validateOnInit() {
  /* Do something when player entered the lobby*/
  /**
   * status: if validated and pass
   * message: message to put when validation fail
   * leave: automatically make player leave
   */
  return { status: true, message: '', leave: true }
}
function onAlert(message: string) {
  /* Do something to inform failed validation */
}

function renderLobby(data) {
  var lobby = document.createElement("lobby-component");
  lobby.id = "lobby";
  lobby.eventId = data.eventInfo.eventId;
  lobby.validateOnInit = validateOnInit;
  lobby.onAlert = onAlert;
  lobby.validateBeforeStart = validateBeforeStart;
  lobby.onStart = renderGame;
  lobby.leaveEvent = leaveEvent; 
  lobby.denyLatePlayers = false;
    
  // customize colors
  lobby.colorPrimary = "#EC4899";
  lobby.colorSecondary = "#BE185D";
  lobby.colorDanger = "#9D174D";
  container.appendChild(lobby);
}
```



## Attributes & Properties

| Name                            | Type     | Default  | Notes                                                        |
| ------------------------------- | -------- | -------- | ------------------------------------------------------------ |
| colorPrimary `colorprimary`     | String   | #459af2  |                                                              |
| colorSecondary `colorsecondary` | String   | \#1f43c1 | Digunakan untuk gradient button. Kalau mau button tanpa gradient, set colorSecondary yang sama dengan colorPrimary. |
| colorDanger `colordanger`       | String   | \#fe522c | Digunakan untuk warna log participant yang `leave` dan `kicked`. |
| denyLatePlayers                 | Boolean  | false    | Jika enabled, player yang masuk setelah host memulai event akan leave secara paksa. |
| eventId                         | String   |          | (Untuk keperluan local dev) EventId yang didapat dari response `createEvent` atau `join`. Default diambil dari URLSearchParams. |
| validateOnInit                  | Function |          | Callback yang dipanggil saat user masuk lobby. Harus return value sesuai dicontoh. Dapat digunakan untuk validasi user ataupun costum. (Request untuk validasi max player) |
| validateOnInit                  | Function |          | Callback yang dipanggil oleh host ketika host memulai event. Harus return value sesuai dicontoh. Dapat digunakan untuk validasi user ataupun costum. (Request untuk validasi min player) |
| onAlert                         | Function |          | Callback yang dipanggil untuk informasi tambahan dari fungsi validate ketika validasi tidak lolos. |
| onStart                         | Function |          | Callback yang dipanggil saat host memulai event.             |
| leaveEvent                      | Function |          | Callback saat current participant `leaveEvent`. Isinya hanya memanggil `nahtuhClient.leaveEvent()`, untuk handling lainnya diserahkan ke developer. |
