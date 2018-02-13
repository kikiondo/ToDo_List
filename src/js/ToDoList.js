//LocalStorage tiene dos metodos, uno para establecer valores y otro para obtener valores  localStorage.getItem  localStorage.setItem
import {ENTER_KEY, c, d, j, ls} from './helpers'
export default class ToDoList{
    constructor(key){ //Recibe la llave con la que guardara el localStorage
        this.key = key

        if( !ls.getItem(key) )
            ls.setItem( key, j.stringify([]) )
    }

    //Metodo para agregar tarea -> Manejador de eventos ya que lo va a manipular el input (desencadenara el metodo)
    addTask(e){
        if( !e.target.value) //Objeto que origina el evento target
            alert('No puedes agregar una tarea vacía')

        if( e.keyCode === ENTER_KEY ) //Le da semantica 
        let newTask =  new Task( e.target.value )
    }

    render(){
        task.addEventListener('keyup', this.addTask) //Le estoy diciendo que cuando el input haga algo desencadene un evento   
    }
}