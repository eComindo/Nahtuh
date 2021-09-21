# Create / Join Room Component 

Digunakan saat user pertama kali membuka activity app untuk membuat event baru (`createEvent`) atau bergabung ke event yang sudah berjalan (`join`). 

> Komponen ini hanya dirender saat user menggunakan entry point dari portal nahtuh. Selain itu, (misalnya dari entry point invitation link,) tampilan ini di-*skip* dan langsung memanggil callback `onStart`. 

## Usage

``````html
<!-- index.html -->
<create-event-component id="create-event"></create-event-component>
<create-event-component id="create-event" colorlink="#EC4899" colorprimary="#EC4899" colorsecondary="#BE185D"></create-event-component>
``````

```javascript
/* index.js */ 
var createEvent = document.getElementById("create-event");
createEvent.onStart = onConnected;
createEvent.onAlert = onAlert;

function onConnected(data) {
  // do something
}

function onAlert(message) { 
  // do something
  // ex. alert(message)
}
```



## Attributes & Properties

| Name                            | Type     | Default  | Notes                                                        |
| ------------------------------- | -------- | -------- | ------------------------------------------------------------ |
| colorPrimary `colorprimary`     | String   | #459af2  |                                                              |
| colorSecondary `colorsecondary` | String   | \#1f43c1 | Digunakan untuk gradient button. Kalau mau button tanpa gradient, set colorSecondary yang sama dengan colorPrimary. |
| colorLink `colorlink`           | String   | \#459af2 | Untuk warna link toggle form join/create event.              |
| onStart                         | Function |          | Callback yang dipanggil saat user berhasil create/join room. |
| onAlert                         | Function |          | Callback untuk memunculkan feedback saat validasi username/eventId gagal |

