'use strict';

/* your code goes here! */

class Task {

  constructor(newDescription, newComplete) {
    this.description = newDescription;
    this.complete = newComplete;
  }

  render() {
    let element = document.createElement("li");
    element.textContent = this.description;
    if(this.complete) {
      element.classList.add('font-strike');
    }

    console.log(" before callback is defined", this);
    element.addEventListener('click', () => {
      console.log("you clicked me");

      console.log("inside the callback", this);

      this.toggleFinished();
      element.classList.toggle('font-strike');
    })

    return element;
  }

  toggleFinished() {
    this.complete = !this.complete;
  }
}

class TaskList {
  constructor(taskArray){
    this.tasks = taskArray;
  }

  addTask(descrString) {
    let newTask = new Task(descrString, false);
    this.tasks.push(newTask);
  }

  render() {
    let olElem = document.createElement('ol');
    this.tasks.forEach((aTask) => {
      let taskElem = aTask.render();
      olElem.appendChild(taskElem);
    })
    return olElem;
  }
}

class NewTaskForm {
  constructor(whatFunctionToCallWhenSubmitted) {
    this.submitCallback = whatFunctionToCallWhenSubmitted;
  }

  render() {
    let formElem = document.createElement('form');


    let inputElem = document.createElement('input');
    inputElem.classList.add('form-control', 'mb-3');
    inputElem.setAttribute('placeholder', "What else do you have to do?")
    formElem.appendChild(inputElem);
    let buttomElem = document.createElement('button');
    buttomElem.classList.add('btn', 'btn-primary');
    buttomElem.textContent = "Add task to list";
    formElem.appendChild(buttomElem);

    buttomElem.addEventListener('click', (event) => {
      event.preventDefault();

      let inputvalue = inputElem.value;
      let whatToDo = this.submitCallback;
      whatToDo(inputvalue);
    })

    return formElem;
  }
}

class App {
  constructor(newParentElement, newTaskList) {
    this.parentElement = newParentElement;
    this.taskList = newTaskList;
  }

  render() {
    let listElem = this.taskList.render();
    this.parentElement.appendChild(listElem);

    let whoYouGonnaCall = (arg) => this.addTaskToList(arg);
    let formObj = new NewTaskForm(whoYouGonnaCall);
    this.parentElement.appendChild(formObj.render());
  }

  addTaskToList(descrString) {
    this.taskList.addTask(descrString);


    this.parentElement.innerHTML = '';
    this.render();
  }
}



let taskListObj = new TaskList([
  new Task("Make some classes", true),
  new Task("Arrow some functions", false)
]);



let appElem = document.querySelector('#app');

let appObj = new App(appElem, taskListObj);
appObj.render();


//Make functions and variables available to tester. DO NOT MODIFY THIS.
if(typeof module !== 'undefined' && module.exports){
  /* eslint-disable */
  if(typeof Task !== 'undefined')
    module.exports.Task = Task;
  if(typeof TaskList !== 'undefined')
    module.exports.TaskList = TaskList;
  if(typeof NewTaskForm !== 'undefined')
    module.exports.NewTaskForm = NewTaskForm;
  if(typeof App !== 'undefined')
    module.exports.App = App;
}
