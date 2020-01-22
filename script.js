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
    const uploadTask = store.child(file.name).put(file)

    uploadTask.on('state_changed', snap => {
      var progress = (snap.bytesTransferred / snap.totalBytes) * 100;
      document.querySelector('.progress').innerHTML = progress + '%'

    }, error => {
      console.log(error)
    }, () => {
      document.querySelector('.progress').innerHTML = 'Done'
      db.child('music').push(file.name.replace('.mp3', ''))
      document.querySelector('input[type=file]').value = null
      window.location.reload()
    })
  } else {
    alert('Select a song')
  }
}
