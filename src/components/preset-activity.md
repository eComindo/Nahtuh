# Preset Activity Component 

Component untuk `save` dan `load` preset activity, termasuk modal form untuk membuat preset activity baru. Terdiri dari dua bagian component: button dan modal. 

## Usage

``````html
<!-- index.html -->
<div class="container"><preset-activity-button></preset-activity-button></div>
<preset-activity-modal></preset-activity-modal>
``````
> Component `preset-activity-modal` diposisikan dalam DOM terdekat dengan `body`. 
```javascript
/* index.js */ 
var presetButton = document.querySelector("preset-activity-button");
var presetModal = document.querySelector("preset-activity-modal");
presetButton.refModal = presetModal
presetButton.buttonPrompt = "Save Survey"
presetModal.validate = validate;
presetModal.getConfig = getConfig;

// customize colors
presetButton.colorPrimary = presetModal.colorPrimary = "#EC4899";
presetButton.colorSecondary = presetModal.colorSecondary = "#BE185D";

// method yang dipanggil setelah join atau create event  
function onConnected(data) {
  // do things     
    
  if (yai.isLoadingActivitySet) loadActivitySet();  
}

async function loadActivitySet() {
  let preset = await yai.getPresetActivityData();
  presetModal.isOwner = yai.isActivitySetOwner;
  presetModal.loadPresetActivityData(preset);

  // do things
}

function validate() {
    valid = true
    // do validation checks
    if (valid) return true
}

function getConfig() {
    // returns up-to-date config as an object
    return { questions: questions }
}
```



## Attributes & Properties

### Preset Activity Button

| Name                            | Type   | Default       | Notes                                                        |
| ------------------------------- | ------ | ------------- | ------------------------------------------------------------ |
| colorPrimary `colorprimary`     | String | #459af2       |                                                              |
| colorSecondary `colorsecondary` | String | \#1f43c1      | Digunakan untuk gradient button. Kalau mau button tanpa gradient, set colorSecondary yang sama dengan colorPrimary. |
| refModal                        |        |               | (❗ required) Reference untuk mengakses modal. Lihat contoh Usage. |
| buttonPrompt                    | String | Save Activity | Text yang akan muncul sebagai prompt di button.              |

### Preset Activity Modal

| Name                            | Type     | Default  | Notes                                                        |
| ------------------------------- | -------- | -------- | ------------------------------------------------------------ |
| colorPrimary `colorprimary`     | String   | #459af2  |                                                              |
| colorSecondary `colorsecondary` | String   | \#1f43c1 | Digunakan untuk gradient button. Kalau mau button tanpa gradient, set colorSecondary yang sama dengan colorPrimary. |
| isOwner                         | Boolean  | false    | Bernilai true jika current user adalah pembuat preset activity yang sedang di-*load*. |
| validate                        | Function |          | Validasi apakah konten dalam config sudah sesuai ketentuan. Return nilai `boolean`. |
| getConfig                       | Function |          | Mengembalikan config up-to-date dalam bentuk object. Akan disimpan sebagai config untuk preset activity. |

**Available Method(s)**

`.loadPresetActivityData(data)` - load data preset activity yang sedang digunakan ke modal form. Lihat contoh usage. 
