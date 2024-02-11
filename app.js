const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');


const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.use('/login',(req,res,next) => {
    console.log('middleware 1')
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/" method="POST"><input id="username" type="text" name="title"><button type="submit">add</button></form>')

})

let user;
app.post('/',(req,res,next) => {
    console.log(req.body)
    
    if( req.body.username && req.body.message ){
        let mes = req.body.username +': '+ req.body.message+' ';
        fs.appendFile('message.txt',mes,(error)=>{
            if (error){
                console.error(error);
            }
        });
    }
    
    res.redirect('/');
})


 app.get('/',(req,res,next) => {

  let message;

    fs.readFile('message.txt',(err,data) => {
        if (err){
            console.error(err);
        }
        else{
            message = data.toString()
            //console.log(message,'message inside file')
            
        }
        //console.log(message,'message read from file')
        
        let html = '<h1>' + message + '</h1>';
        html += `<form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" action="/" method="POST">
        <input type="text" name="message" >
        <input type="hidden" name="username" id="username"
        <button type="submit">Send Message</button>
        </form>`;
        
        res.send(html)
    })
    
    
})

app.listen(3000);