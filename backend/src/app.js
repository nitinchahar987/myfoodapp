require('dotenv').config({ quiet: true })
const express=require('express')
const authRoutes=require('./routes/auth.routes')
const partnerRoutes=require('./routes/foodpartner.routes')
const cookieParser=require('cookie-parser')
const fooditemRoutes=require('./routes/fooditem.routes')
const cors=require('cors')

const path=require('path')

const app=express()
const _dirname=path.resolve()
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use('/api/foodpartner',partnerRoutes)
app.use('/api/fooditems',fooditemRoutes)
                                                                                                                                
app.use(express.static(path.join(_dirname,'/frontend/dist')))
app.get("*",(req,res)=>{
    res.sendFile(path.join(_dirname,'/frontend/dist/index.html'))
})

module.exports=app;