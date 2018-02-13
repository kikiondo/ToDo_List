//LocalStorage tiene dos metodos, uno para establecer valores y otro para obtener valores  localStorage.getItem  localStorage.setItem
import {ENTER_KEY, c, d, j, ls} from './helpers'
import Task from './task'

export default class ToDoList{
    constructor(key){ //Recibe la llave con la que guardara el localStorage
        this.key = key

        if( !ls.getItem(key) )
            ls.setItem( key, j.stringify([]) )

            this.addTask = this.addTask.bind(this)
    }

    //Metodo para agregar tarea -> Manejador de eventos ya que lo va a manipular el input (desencadenara el metodo)
    addTask(e){
        if( !e.target.value) //Objeto que origina el evento target
            alert('No puedes agregar una tarea vacía')

        if( e.keyCode === ENTER_KEY ){ //Le da semantica 
            let newTask =  new Task( e.target.value ),
                tasks = j.parse( ls.getItem( this.key ) ) //Analizar en formato json lo que tenga ls

                tasks.push( newTask )
                ls.setItem( this.key, j.stringify( tasks ) )
                this.renderTask( newTask ) //Renderizar en el navegador la nueva tarea una vez ya creada
                e.target.value = ''
        }
    }

    render(){
        task.addEventListener('keyup', this.addTask) //Le estoy diciendo que cuando el input haga algo desencadene un evento   
    }
}