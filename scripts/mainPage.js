class CriarTask {
  constructor() {
    this.container = document.getElementById('tasks')
    this.inputTask = document.getElementById('input')
  }

  verify() {
    let inputVerify = this.inputTask.value.replace(/\s/g, '')
    if (inputVerify.length == 0) {
      return
    }
    this.adicionarTask(this.inputTask.value)
    let taskObj = {
      conteudo: this.inputTask.value,
      estado: 'pendente',
      user: {uid: firebase.auth().currentUser.uid}
    }
    console.log(taskObj)
    salvarTarefa(taskObj)
    this.inputTask.value = ''
  }

  adicionarTask(input) {
    let task = document.createElement('div')
    task.id = 'task'
    this.container.appendChild(task)

    let p = document.createElement('p')
    p.innerText = input
    task.appendChild(p)

    let ic = document.createElement('div')
    ic.id = 'ic'
    task.appendChild(ic)

    let li = document.createElement('i')
    li.classList.add('fa-solid', 'fa-check')
    ic.appendChild(li)

    let ti = document.createElement('i')
    ti.classList.add('fa-solid', 'fa-trash')
    ic.appendChild(ti)
    
    ti.addEventListener('click', () => {
      let divToDelete = ic.parentElement
      this.container.removeChild(divToDelete)
    })
  }
}

const criartask = new CriarTask()
criartask.inputTask.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    criartask.verify()
  }
})
firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      window.location.href ='index.html'
    }else{
      acharTarefas(user)
    }
  })
function acharTarefas(user){
  firebase.firestore().collection('tarefas').where('user.uid', '==', user.uid).get().then(snapshot => {
    const tarefas = snapshot.docs.map(doc => doc.data())
    for(let i = 0; i < tarefas.length; i++){
      criartask.adicionarTask(tarefas[i].conteudo)
    }
  })
}
function salvarTarefa(task){
  firebase.firestore().collection('tarefas').add(task).then(() => {
    console.log('ok');
  }).catch(error => {
    console.log(error);
  });
}
