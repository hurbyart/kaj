import { Component, OnInit, Input } from '@angular/core';
import {Todo} from './todo';
import { formatDate } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
//function wich will play the sound

declare function playAuido():any;

@Component({
  selector: 'app-noteme',
  templateUrl: './noteme.component.html',
  styleUrls: ['./noteme.component.scss']
})
export class NotemeComponent implements OnInit{
  
  @Input() deadline:Date;
  @Input() tabName:string;
  constructor(private _snackBar: MatSnackBar) { }
  todos=[];
  done = [];
  inProgress = [];
  //select todo on click
  todo=new Todo('', undefined,undefined,undefined);
  selectedTodo:Todo;
  todoControl:FormControl;

  ngOnInit() {
    //parsing deadlines
    setInterval(() => {
      this.pareseDeadLine(this.todos); 
      }, 1000);
      this.todoControl = new FormControl('');
    //get items from local storage
    let loadedTodos = JSON.parse(localStorage.getItem("todos"));
    this.todos = loadedTodos[this.tabName].todo === undefined ? [] : loadedTodos[this.tabName].todo;
    this.inProgress = loadedTodos[this.tabName].inProgress === undefined ? [] : loadedTodos[this.tabName].inProgress
    this.done = loadedTodos[this.tabName].done === undefined ? [] : loadedTodos[this.tabName].done
  } 
  //parsing deadlines and alert user when it will be
  pareseDeadLine(array){
    for(let i in array){
      if(array[i].deadline!=undefined){
        var deadline=formatDate(array[i].deadline,"medium","en-US");
        var temp=formatDate(Date.now(),"medium","en-Us");
        if(deadline.toString()==temp.toString()){
        this._snackBar.open(array[i].text+' deadline passed', '', {
          duration: 10000,
        });
        playAuido();
        }

      }
    }
  this.findCollizion(array);
  }
  onSelect(todo:Todo){
    this.selectedTodo=todo;
  }
  //add new todo to list
  onSubmit(){
    const todoName = this.todoControl.value;
    if(todoName!==0){
      if(todoName!==null && this.validate(todoName)==true){
        var tempTodo:Todo={
          id:this.todos.length+1,text:todoName,date:Date.now(),deadline:this.todo.deadline
        }
        let loadedTodos = JSON.parse(localStorage.getItem('todos'));
        let index = loadedTodos[this.tabName].todo.length + loadedTodos[this.tabName].inProgress.length + loadedTodos[this.tabName].done.length;
        tempTodo.id = index + 1;
        this.todos.push(tempTodo);
        this.todoControl.reset();
        loadedTodos[this.tabName].todo = this.todos;
        localStorage.setItem("todos",JSON.stringify(loadedTodos));
      }else{
        var text=todoName;
      }
    }
   }
  //validate todo
  validate(todoName:String){
    if(todoName.length<60){
      return true;
    }else{
      return false;
    }
  }
  //find colizion in deadlienes
  findCollizion(array){
    for(let i in array){
      for(let j in array){
        if(i!=j){
          if(array[i].deadline!=undefined&&array[j].deadline!=undefined){
            var deadline1=formatDate(array[i].deadline,"medium","en-US");
            var deadline2=formatDate(array[j].deadline,"medium","en-US");
            if(deadline1.toString()==deadline2.toString()){
              console.log(array[i].text);
              console.log(array[j].text);
              return ;
            }
          }
        }
      }
    }
  }
  //drag and drop function
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    let loadedTodos = JSON.parse(localStorage.getItem('todos'));
    loadedTodos[this.tabName].todo = this.todos;
    loadedTodos[this.tabName].inProgress = this.inProgress;
    loadedTodos[this.tabName].done = this.done;
    localStorage.setItem("todos",JSON.stringify(loadedTodos));
    }
  }


  //delete todo
  delete(todo:Todo){
    for(let i=0;i<this.todos.length;i++){
      if(this.todos[i].id===this.selectedTodo.id){
        this.todos.splice(i,1);
        let loadedTodos = JSON.parse(localStorage.getItem("todos"));
        loadedTodos[this.tabName].todo = this.todos;
        localStorage.setItem('todos',JSON.stringify(loadedTodos));
      }
    }
  }
}
