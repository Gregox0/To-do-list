class CriarTask {
  constructor() {
    this.container = document.getElementById('tasks')
    this.inputTask = document.getElementById('input')
    this.tasks = {
      user: '',
      task: []
    }
  }

  verify() {
    let inputVerify = this.inputTask.value.replace(/\s/g, '')
    if (inputVerify.length == 0) {
      return
    }
    this.adicionarTask(this.inputTask.value)
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
      
