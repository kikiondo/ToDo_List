import express from 'express'

const routes = express.Router()


routes 
    .get('/', (req, res, next)=>{
        res.render('index',{
            title: 'To Do List',
            description: 'ToDo list isomorfico con Vanilla js'
        })
    })


 export default routes