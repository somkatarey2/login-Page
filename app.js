const express = require('express');
const mysql = require("mysql")
const dotenv = require('dotenv')
const app = express();
const path = require("path");

app.use(express.json())
app.set('view engine', 'hbs')
//app.use(express.static(publicDir))

app.use(express.urlencoded({extended: 'false'}))
// app.use(express.json())
//middleware to read req.body.<params>
//CREATE USER
//const publicDir = path.join(__dirname, './public')

dotenv.config({ path: './.env'})


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,

    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})



db.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL connected!")
    }
})

app.get("/users", (req, res) => {
   var data;
    db.query('SELECT * FROM users', function(err, rows, fields) 
{
  if (err) throw err;
   data=rows;
  console.log(rows[0]);

 
  res.json({data});

//   res.json({data});

});
        
   
    
})

    app.post("/register", (req, res) => {

    const uname = req.body.uname;
    const email=req.body.email;
    const psw=req.body.psw;
    console.log(uname);
    db.query('SELECT * FROM users WHERE uname=?',uname, function(err, rows, fields) 
    {
      if (err) throw err;
       data=rows;
      console.log(rows[0]);
      if(data>0)
      {
        return res.render('registration', {
                        message: 'This email is already in use'
                    })
      }
     else{
        db.query(' INSERT INTO users VALUES(?,?,?)',[uname,email,psw], function(err, rows, fields) 
        {
            if (err) throw err;
            else
            {
                console.log("Inserted Successfully");
            }
            return res.render('login', {
                message: 'registered Succesfully'
            })

        })
     }
      
    
    //   res.json({data});
    
    });

    
            
});



//db.end();

app.listen(5000, ()=> {
        console.log("server started on port 5000")
    })