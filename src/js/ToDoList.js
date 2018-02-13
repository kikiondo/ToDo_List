//LocalStorage tiene dos metodos, uno para establecer valores y otro para obtener valores  localStorage.getItem  localStorage.setItem
import {ENTER_KEY, c, d, j, ls} from './helpers'
export default class ToDoList{
    constructor(key){ //Recibe la llave con la que guardara el localStorage
        this.key = key

        if( !ls.getItem(key) )
            ls.setItem( key, j.stringify([]) )
    }

    render(){
        
    }
}