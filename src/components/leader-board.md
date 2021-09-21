# Leaderboard Component 

Digunakan untuk menampilkan perolehan niiai dari sebuah game atau quiz yang sudah dilakukan oleh peserta dan host.

Terdapat 3 component leaderboard,
- <leader-board-1-component></leader-board-1-component>
- <leader-board-2-component></leader-board-2-component>
- <leader-board-3-component></leader-board-3-component>

Leaderboard 1 dan 2 memiliki 2 mode, dark mode dan light mode, dapat dilihat pada penjelasan pada Attributes & Properties

>Pengguna diminta untuk membuat eventVars dengan nama `leaderBoardData`, ketika variabel ini diupdate, maka component leaderboard akan secara otomatis melakukan render ulang terhadap rank pada leaderboard.

## Usage

``````html
<!-- index.html -->
<head><
    ...
    <!-- import font dibawah ini agar pada saat leaderboard di render font sama dengan design yang telah dibuat -->
    <!-- Google Font [Poppins & K2D] -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=K2D:wght@800&family=Poppins:ital,wght@0,400;0,500;1,600&display=swap"
      rel="stylesheet"
    />
    ...
/head>
``````

```javascript
/* index.js */
    // buat variable global pada index.js sebagai berikut
    ...
    var leaderBoardData = [];
    var localLeaderBoardData = [];
    var intervalCalled = false;
    
    =================================================

    // ketika game atau quiz dimulai update leaderBoardData sebagai berikut (pada function start)
    ...
    var participants = await nahtuhClient.getParticipantList();
    participants.forEach((x) => {
        let leaderBoardItem = {
            id: x.participantId,
            name: x.participantName,
            score: 0,
            time: 0,
        };
        leaderBoardData.push(leaderBoardItem);
        localLeaderBoardData.push(leaderBoardItem); // digunakan sebagai pembanding ketika akan mengupdate eventVars leaderBoardData di akhir
    };
    nahtuhClient.eventVars.leaderBoardData;
    ...
    
    =================================================

    // ketika game atau quiz berakhir kirimkan data leadeboard berupa score dan time tiap peserta kepada host (pada function submit)
    ...
    // contoh content yang dikirimkan ke host
    let quizData = {
        score: 0,
        time: 0,
    };
    // catatan untuk time: adalah waktu yang yang sudah di set dikurangi dengan waktu mengerjakan quiz atau game dalam bentuk detik, contoh quiz atau game diberikan waktu 2 menit (120 detik) dan peserta mengerjakannya dengan waktu 50 detik, maka value untuk property time adalah 120 (detik) - 50 (detik) = 70 (detik)
    quiz.forEach((x) => {
        quizData.score += parseInt(x.score, 10);
        quizData.time += parseInt(x.time, 10);
    });
    const content = { quizData }
    const hostId = participants.find((x) => x.isHost).participantId;
    // kirim ke host data quiz atau game yang sudah diupdate peserta
    nahtuhClient.sendToUser(hostId, content);
    // render component leaderboard oleh peserta
    renderLeaderBoard();
    ...
    
    =================================================

    function onIncomingMessage(params) {
        ...
        if (params.content.quizData) {
            const tmp = localLeaderBoardData
                .map((x) => {
                    let data = x;
                    if (data.id === params.senderId) {
                        data = {
                            ...data,
                            score: params.content.newQuizData.score,
                            time: params.content.newQuizData.time,
                        }
                    }
                    return data;
            });
            localLeaderBoardData = tmp;
            if (!intervalCalled) {
                updateLeaderBoard()
            }
        }
        ...
    }

    =================================================
    
    function updateLeaderBoard() {
        intervalCalled = true;
        timerFunc = setInterval(() => {
            if (JSON.stringify(localLeaderBoardData) !== JSON.stringify(nahtuhClient.eventVars.leaderBoardData)) {
                nahtuhClient.eventVars.leaderBoardData = localLeaderBoardData;
                Render.leaderBoard();
            }
        }, 2500); // dapat disesuaikan lama interval disarankan diatas 1 detik agar tidak terlalu sering eventVars diupdate
    }
    
    =================================================
    
    function renderLeaderBoard() {
        const leaderBoard = document.createElement("leader-board-2-component");
        leaderBoard.darkMode = true;
        // element dibawah tag body hapus semua innerHTML nya atau bisa menggunakan show hide element
        document.getElementById("canvas").innerHTML = '';
        document.getElementById("canvas").appendChild(leaderBoard)
    }
    
    =================================================
    
```



## Attributes & Properties

| Name                            | Type     | Default  | Notes                                                        |
| ------------------------------- | -------- | -------- | ------------------------------------------------------------ |
| `darkMode`     | Boolean   | false  | Leaderboard 1 dan 2 terdapat `darkMode` namun leaderboard 3 tidak terdapat `darkMode`.                                                             |
| `sortByTime` | Boolean   | true | Sorting score dan waktu dilakukan oleh component leaderboard, secara default component akan melakukan sorting berdasarkan score tertinggi dan waktu penyelesaian tercepat. Apabila `sortByTime` bernilai false maka sorting hanya berdasarkan score tertinggi saja.|


## Example Screen
### leaderboard 1
![alt text](https://yaidevstraccwebapp.blob.core.windows.net/components/assets/lb-1-light-mode.png)
![alt text](https://yaidevstraccwebapp.blob.core.windows.net/components/assets/lb-1-dark-mode.png)

### leaderboard 2
![alt text](https://yaidevstraccwebapp.blob.core.windows.net/components/assets/lb-2-light-mode.png)
![alt text](https://yaidevstraccwebapp.blob.core.windows.net/components/assets/lb-2-dark-mode.png)

### leaderboard 3
![alt text](https://yaidevstraccwebapp.blob.core.windows.net/components/assets/lb-3.png)
