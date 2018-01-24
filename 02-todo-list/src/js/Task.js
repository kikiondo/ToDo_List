
export default class Task{
    constructor(name){
        this.id = new Date().getTime() //Por hora
        this.name = name
        this.isComplete = false
        return this
    }
}