const db = firebase.database().ref()
const stor = firebase.storage().ref()

db.child('music').once('value', snap => {
  const list = snap.val()

  for (let key in list) {
    document.querySelector('.list').innerHTML = document.querySelector('.list').innerHTML + `
    <li>
      <button onclick="playIt('${list[key]}')">${list[key]}</button>
    </li>`
  }
})

function playIt(song) {
  stor.child(`${song}.mp3`).getDownloadURL().then(url => {
    document.querySelector('audio').setAttribute('src', url)
  })
}

// db.child('music').push('Morgenshtern - последняя.mp3')