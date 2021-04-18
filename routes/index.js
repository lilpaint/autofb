var express = require('express');
var router = express.Router();
var db=require('../models/database'); 
/* GET home page. */

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/signup', function(req, res, next) {
    let u = req.body.username;
    let p = req.body.password;
    let em = req.body.email;  
    const bcrypt = require("bcrypt");        
    var salt = bcrypt.genSaltSync(10);
    var pass_mahoa = bcrypt.hashSync(p, salt);
    var gentoken = makeid(50);
    let user_info ={username: u, password:pass_mahoa, email:em, token:gentoken}; 
    let settings ={username: u, token:gentoken};  
    let sql = 'INSERT INTO users SET ?';
    let sql2 = 'INSERT INTO settings SET ?';
    db.query(sql, user_info);
    db.query(sql2, settings);
    res.redirect("/success");
})

router.post('/signin', async function(req, res, next) {
 let u = req.body.username;
 let p = req.body.password;
 let sql = 'SELECT * FROM users WHERE username = ?';
 db.query(sql, [u] , (err, rows) => {   
     if (rows.length<=0) { res.redirect("/"); return;}
     let user = rows[0];        
     let pass_fromdb = user.password;
     let email = user.email;        
     const bcrypt = require("bcrypt");        
     var kq = bcrypt.compareSync(p, pass_fromdb);
     if (kq){ 
         console.log("OK");       
         var sess = req.session;  //initialize session variable
         sess.daDangNhap = true;
         sess.username = user.username;
         sess.email = user.email;
         sess.token = user.token;
         sess.coin = user.coin;             
         if (sess.back){ 
             console.log(sess.back);
             res.redirect(sess.back);
         }
         else {
             res.redirect("/home");
         }
     }   
     else {
         console.log("Not OK");
         res.redirect("/");
     }
 });   
});

router.get('/success', function(req, res, next) {
    res.render("success.ejs");
})

router.get('/home', function(req, res, next) {
 if (req.session.daDangNhap) {
     res.render("home.ejs",{user:req.session.username, token:req.session.token, email:req.session.email, coin:req.session.coin});
 }
 else {       
     req.session.back="/home";
     res.redirect("/");
 }
});

router.get('/a', function(req, res, next) {
    if (req.session.daDangNhap) {
        res.render("a.ejs",{user:req.session.username, token:req.session.token});
    }
    else {       
        req.session.back="/a";
        res.redirect("/");
    }
   });
   


router.get('/exit', function(req, res, next) {
 req.session.destroy();
 res.redirect("/");
});


router.get('/all', function (req, res) {
  db.query('SELECT * FROM account', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'users list.' });
  });
});


module.exports = router;
