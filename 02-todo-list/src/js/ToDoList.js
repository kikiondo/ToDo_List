import {ENTER_KEY, c, d, j, ls} from './helpers'
import Task from './Task'

export default class ToDoList{
    constructor (key){//Recibe la llave del localStorage
        this.key = key

        if(!ls.getItem( key ))
            ls.setItem( key, j.stringify )

        this.addTask = this.addTask.bind(this)
    }

    addTask(e){
        if(!e.target.value) //Si el target está vacio
        alert('No puedes agregar una tarea vacía')

        if(e.keyCode === ENTER_KEY){
            let newTask = new Task( e.target.value ),
                tasks = j.parse( ls.getItem(this.key) )
              

                tasks.push( newTask )
                ls.setItem( this.key, j.stringify(tasks) )
                this.renderTask( newTask )
                e.target.value = null
                
        }
    }//Lo va a manipular el imput

    render(){
        task.addEventListener('keyup', this.addTask)
    }
}