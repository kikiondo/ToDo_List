//Llamando al modulo por destructuración 
import {d} from './helpers'
import ToDoList from './ToDoList'

const task = d.querySelector('#task'),
    list = d.querySelector('#list'),
    todo = new ToDoList('edList') //Todo lo que guarde en la edList se guardare en el localStorage

    todo.render()