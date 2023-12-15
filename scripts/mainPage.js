class CriarTask {
  constructor() {
    this.container = document.getElementById('tasks')
    this.inputTask = document.getElementById('input')
    this.totalTasks = 0
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
    salvarTarefa(taskObj)
    this.totalTasks++
    this.updateTotalTasks()
    this.inputTask.value = ''
  }

  adicionarTask(input) {
    let task = document.createElement('div')
    task.id = 'task'
    task.classList.add('task')
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
      let divToDelete = ic.parentElement;
      this.container.removeChild(divToDelete);
      let user = firebase.auth().currentUser;
      firebase.firestore().collection('tarefas').where('user.uid', '==', user.uid).get().then(snapshot => {
           const tarefas = snapshot.docs.map(doc => ({
             ...doc.data(),
             uid: doc.id
      }));
      const tarefaUID = tarefas.find(tarefa => tarefa.conteudo === p.innerText).uid
      apagarTarefa(tarefaUID)
  })
  this.totalTasks--
  this.updateTotalTasks()
})
    let tic = false
    li.addEventListener('click', () => {
      if (!tic) {
        p.classList.add('completa')
        tic = true
        let user = firebase.auth().currentUser
        let tarefas
        firebase.firestore().collection('tarefas').where('user.uid', '==', user.uid).get().then(snapshot => {
          tarefas = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
          }))
          const tarefaUID = tarefas.find(tarefa => tarefa.conteudo === p.innerText).uid
          atualizarEstadoTarefa(tarefaUID, 'completa')
        })
      } else {
        p.classList.remove('completa')
        tic = false
        let user = firebase.auth().currentUser
        let tarefas
        firebase.firestore().collection('tarefas').where('user.uid', '==', user.uid).get().then(snapshot => {
          tarefas = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
          }))
          const tarefaUID = tarefas.find(tarefa => tarefa.conteudo === p.innerText).uid
          atualizarEstadoTarefa(tarefaUID, 'pendente')
        })
      }
    })
  }
  updateTotalTasks() {
    document.getElementById('total').innerText = `${this.totalTasks} tarefas`
  }
}

const criartask = new CriarTask()
criartask.inputTask.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    criartask.verify()
  }
})
function salvarTarefa(task){
  firebase.firestore().collection('tarefas').add(task).then(() => {
  }).catch(error => {
  });
}
function apagarTarefa(uid) {
  firebase.firestore().collection('tarefas').doc(uid).delete().then(() => {
  }).catch(error => {
  });
}
function acharTarefas(user) {
  firebase.firestore().collection('tarefas').where('user.uid', '==', user.uid).get().then(snapshot => {
    const tarefas = snapshot.docs.map(doc => ({
      ...doc.data(),
      uid: doc.id
    }))
    for (let i = 0; i < tarefas.length; i++) {
      criartask.adicionarTask(tarefas[i].conteudo)
    }
  })
}
firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = 'index.html'
  } else {
    acharTarefas(user)
  }
})
function atualizarEstadoTarefa(uid, estado) {
  firebase.firestore().collection('tarefas').doc(uid).update({
    estado: estado
  }).then(() => {
  }).catch(error => {
  });
}
function clearAllTasks() {
  while (criartask.container.firstChild) {
    criartask.container.removeChild(criartask.container.firstChild)
  }
  let user = firebase.auth().currentUser;

  firebase.firestore().collection('tarefas').where('user.uid', '==', user.uid).get().then(snapshot => {
    const tarefas = snapshot.docs.map(doc => ({
      ...doc.data(),
      uid: doc.id
    }))
    tarefas.forEach(tarefa => {
      apagarTarefa(tarefa.uid)
    })
  })
  criartask.totalTasks = 0
  criartask.updateTotalTasks()
}
function apagarTarefa(uid) {
  firebase.firestore().collection('tarefas').doc(uid).delete().then(() => {
  }).catch(error => {
  })
                                  }
