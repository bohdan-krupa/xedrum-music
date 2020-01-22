const db = firebase.database().ref()
const store = firebase.storage().ref()

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
  store.child(`${song}.mp3`).getDownloadURL().then(url => {
    document.querySelector('audio').setAttribute('src', url)
  })
}

document.querySelector('.upload').onclick = async () => {
  const file = document.querySelector('input[type=file]').files[0]
  if (file) {
    document.querySelector('input[type=file]').value = null
    await store.child(file.name).put(file)
    await db.child('music').push(file.name.replace('.mp3', ''))
  } else {
    alert('Select a song')
  }
}
