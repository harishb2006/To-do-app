const express=require('express')
const app =express()

const port=3010

app.get('/',(req,res) => {
    res.send('helllo')
})

app.listen(port, ()=>{
    console.log(`local host running on port http://localhost:${port}`)
})