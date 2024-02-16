import express from 'express'
import cors from 'cors'
import {StreamChat} from 'stream-chat'
import{ v4 as uuidv4} from 'uuid'
import bcrypt from 'bcrypt'
import Cookies from 'js-cookie'

const app=express()

app.use(cors({
    origin: 'http://localhost:3000',  
    credentials: true  
  }));
app.use(express.json())

const api_key='qjw3n8m5aen7'
const api_secret='ev794hw5nhq4v4fptnbd25zakxtcsj596um6x3r6b92vvf5v3ctbdafwzjufqhfx'
const serverclient=StreamChat.getInstance(api_key,api_secret)

app.post('/signup', async (req,res)=>{
    try{
        const {firstName,lastName,username,password}=req.body
        const userId=uuidv4()
        const hashedPassword=await bcrypt.hash(password,10)
        await serverclient.upsertUser({
            id: userId, 
            name: username, 
            
            
            firstName: firstName,
            lastName: lastName,
            hashedPassword:hashedPassword
        });
        const token=serverclient.createToken(userId)
        res.json({token,userId,firstName,lastName,username,hashedPassword})
    
    } catch(error){
        res.json(error)
    }
    
})

app.post('/login',async (req,res)=>{
    const {username,password}=req.body
  
        const { users } = await serverclient.queryUsers({ name: username });
        console.log("查询到的用户有:", users);
   
    
    
    if (users.length===0) return res.json({message:'User Not Fount'})
    const token=serverclient.createToken(users[0].id)
    //Cookies.set('faketoken',token)
    const passwordMatch= await bcrypt.compare(password,users[0].hashedPassword)
    if (passwordMatch){
        res.json({
            token,
            firstName:users[0].firstName,
            lastName:users[0].lastName,
            username,
            userId:users[0].id
        })
    }


})


app.listen(3001,()=>{
    console.log('It is running')
    
})