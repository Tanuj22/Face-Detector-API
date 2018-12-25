const express = require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const bcrypt=require('bcrypt-nodejs');
const knex = require('knex');

const register =require('./controllers/register');
const signin =require('./controllers/signin');
const image =require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'tanuj123',
    database : 'facebrain'
  }
});

const app =express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
	res.send(database.users);
})

app.post('/signin',(req,res)=>{signin.forSignIn(req,res,db,bcrypt)})

app.post('/register',(req,res)=>{register.forRegister(req,res,db,bcrypt)})

app.put('/image',(req,res)=>{image.forImage(req,res,db)})

app.post('/imageapi',(req,res)=>{image.ApiCall(req,res)})


app.listen(3001,()=>{
	console.log('app is running on port 3001'); 
})