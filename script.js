class Toggle{
    constructor(){
      this.type = true
    }
    change(){
      if (this.type) {
        document.getElementById('logcad').innerHTML = 'Cadastro'
        document.getElementById('text').innerHTML = 'O que está esperando? crie sua conta.'
        document.getElementById('button').innerHTML = 'Cadastrar'
        document.getElementById('toggle').innerHTML = 'Já tem uma conta? <span onclick="toggle.change()">Clique aqui.</a>'
        
        this.type = false
      }else{
        document.getElementById('logcad').innerHTML = 'Login'
        document.getElementById('text').innerHTML = 'É muito bom ter você de volta!'
        document.getElementById('button').innerHTML = 'Logar'
        document.getElementById('toggle').innerHTML = 'Ainda não tem uma conta? <span onclick="toggle.change()">Clique aqui.</a>'
        
        this.type = true
      }
    }
  }
  class Verify{
    constructor(){
      this.email = document.getElementById('email')
      this.senha = document.getElementById('senha')
    }
    verificar(){
      let emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      let senharegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d_.-]{8,}$/;
  
      if(!emailregex.test(this.email.value)){
        setTimeout(() => {
          document.getElementById('inputLine').style.borderColor= '#9032bb'
        },1000)
        document.getElementById('inputLine').style.borderColor = 'red'
        return
      }
      if(!senharegex.test(this.senha.value)){
        setTimeout(() => {
          document.getElementById('inputLinePass').style.borderColor= '#9032bb'
        },1000)
        document.getElementById('inputLinePass').style.borderColor = 'red'
        return
      }
      if(toggle.type){
        login(this.email.value, this.senha.value)
      }else{
        cadastro(this.email.value, this.senha.value)
      }
      this.email.value == ''
      this.senha.value == ''
    }
  }
  class Change{
    constructor(){
        this.eye = document.getElementById('eye')
        this.input = document.getElementById('senha')
        this.type = true
    }
    change(){
        if(this.type){
            this.eye.classList.remove('fa-eye-slash')
            this.eye.classList.add('fa-eye')
            this.input.type = 'text'
            this.type = false
        }else{
            this.eye.classList.remove('fa-eye')
            this.eye.classList.add('fa-eye-slash')
            this.input.type = 'password'
            this.type = true
        }
    }
  }
  function login(email, senha){
    showLoading()
    firebase.auth().signInWithEmailAndPassword(
      email, senha
      ).then(response => {
      window.location.href = "mainPage.html"
    }).catch(error => {
      setTimeout(() => {
          document.getElementById('inputLinePass').style.borderColor= '#9032bb'
          document.getElementById('inputLine').style.borderColor= '#9032bb'
        },1000)
        document.getElementById('inputLinePass').style.borderColor = 'red'
        document.getElementById('inputLine').style.borderColor = 'red'
        hideLoading()
    })
  }
  function cadastro(email, senha) {
    showLoading()
    firebase.auth().createUserWithEmailAndPassword(
      email, senha
    ).then(() => {
      window.location.href = "mainPage.html";
    }).catch(error => {
      setTimeout(() => {
        document.getElementById('inputLinePass').style.borderColor = '#9032bb'
        document.getElementById('inputLine').style.borderColor = '#9032bb'
      }, 1000)
      document.getElementById('inputLinePass').style.borderColor = 'red'
      document.getElementById('inputLine').style.borderColor = 'red'
      hideLoading()
    })
  }
  const verify = new Verify()
  const toggle = new Toggle()
  const change = new Change()

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      window.location.href = 'mainPage.html'
    }
  })
