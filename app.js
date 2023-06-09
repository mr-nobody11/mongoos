const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const port =7635
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(cors())

const mongoose = require("mongoose")

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://ASWINVS:Aswin123@cluster0.1gjyfad.mongodb.net/cev')
    .then(() => {
        console.log("DB connected")
    })
    .catch(err => {
        console.log('Error :' + err)
    })


const Studentdata = require('./model/student')


//post method
app.post('/student',async (req,res)=>{


    try {
        let item = req.body
        console.log(item)
    
        const user = new Studentdata(item)
        const savedStudent = await user.save()
        res.status(201).send(savedStudent)
    } catch (error) {
        console.log(error)
    }

   
})

// get data 
app.get('/student', async(req,res)=>{

    try {

        const list = await Studentdata.find()
        res.json(list)

        
    } catch (error) {
        console.log(error)
        res.status(400)
    }
})

//update

app.put('/student/:id',async (req,res)=>{

    try {


        let id = req.params.id
        let item = req.body
        let updatedData = {$set:item}

        let updatedStudent = await Studentdata.findByIdAndUpdate({'_id':id}, updatedData,{new:true})
        res.send(updatedStudent)


        
    } catch (error) {

        console.log(error)
        res.status(9835)
        
    }
})


//delete


app.delete('/student/:id',async (req,res)=>{
try {

    let id = req.params.id
    const deleteStudent = await Studentdata.findByIdAndDelete(id)

    res.send(deleteStudent)
    
} catch (error) {
    
}

})







app.listen(port, () => {
    console.log("Server is running"+port)
})

