const express = require('express');
const mysql = require("mysql")
const dotenv = require('dotenv')
const app = express();
const hbs = require('hbs');
const path = require("path");
//const publicDir = path.join(__dirname, './public')

app.use(express.json())
app.set('view engine', 'hbs')
app.set("views", path.join(__dirname,"/public"));
//app.use(express.static(publicDir))

//app.use(express.urlencoded({extended: 'false'}))
 app.use(express.json())
 app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
//middleware to read req.body.<params>
//CREATE USER


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



app.get("/", (req, res) => {
    res.render("index", {
    name: "Kushan", age: 24
});});


app.get("/login", (req, res) => {
    res.render("login", {
    name: "Kushan", age: 24
});});


app.get("/register", (req, res) => {
    res.render("login", {
    name: "Kushan", age: 24
});});





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

        })
    })



        app.post("/login", (req, res) => {

            const uname = req.body.uname;
            const email=req.body.email;
            const psw=req.body.psw;
            console.log(uname);
            var query=db.query('SELECT * FROM users WHERE uname=? AND psw=?',[uname,psw], function(err, rows, fields) 
            {
              if (err) throw err;
               data=rows;
              console.log(rows[0]);
              console.log(query.sql)
              if(data.length>0)
              {
                return res.render('welcome', {
                                message: 'Welcome'
                            })
              }
             else{
                console.log("incrorrect");
               
                    return res.render('registration', {
                        message: 'please Register'
                    })
          
                
             }
              
        
        //   res.json({data});
        
        });
    
        
                
    });
    
    
     





//db.end();

app.listen(5000, ()=> {
        console.log("server started on port 5000")
    })




   