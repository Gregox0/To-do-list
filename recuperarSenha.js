function recuperar(){
  let email = document.getElementById('email')
  firebase.auth().sendPasswordResetEmail(email.value).then(() => {
    window.location.href = "index.html"
  }).catch(error => {
    console.log(error)
    setTimeout(() => {
      document.getElementById('inputLine').style.borderColor = '#9032bb'
    }, 1000)
    document.getElementById('inputLine').style.borderColor = 'red'
  })
}
