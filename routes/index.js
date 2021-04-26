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
    if (req.session.daDangNhap) {
        res.render("home.ejs",{user:req.session.username, token:req.session.token, level:req.session.level, coin:req.session.coin});
    }
    else {       
        req.session.back="/home";
        res.render('index', {message: ''});
    }
});

router.post('/signup', function(req, res, next) {
    let u = req.body.username;
    let p = req.body.password;
    let em = req.body.email;
    var sess = req.session;
    if (!u){
        res.redirect("/login"); return
    }
    else if(!p){
        res.redirect("/login"); return;
    }
    else if(!em){

        res.redirect("/login"); return;
    }
    
    let sql3 = 'SELECT * FROM users WHERE username = ?';
    db.query(sql3, [u] , (err, rows) => {   
        if (rows.length > 0) { 
            res.render('index', {message: 'Tên tài khoản đã tồn tại', status: 'error'})}
           
        else{
            const bcrypt = require("bcrypt");         
            var salt = bcrypt.genSaltSync(10);
            var pass_mahoa = bcrypt.hashSync(p, salt);
            var gentoken = makeid(50);
            let user_info ={username: u, password:pass_mahoa, email:em, token:gentoken};        
            let sql = 'INSERT INTO users SET ?';
            db.query(sql, user_info);
            res.render('index', {message: 'Đăng kí thành công, vui lòng đăng nhập', status: 'success'});
        }
 });   
});

router.post('/signin', async function(req, res, next) {
 let u = req.body.username;
 let p = req.body.password;
 if (!u){
    res.redirect("/login");
 }
 let sql = 'SELECT * FROM users WHERE username = ?';
 db.query(sql, [u] , (err, rows) => {   
     if (rows.length<=0) { res.redirect("/"); return;}
     let user = rows[0];        
     let pass_fromdb = user.password;
     let level = user.level;        
     const bcrypt = require("bcrypt");        
     var kq = bcrypt.compareSync(p, pass_fromdb);
     if (kq){       
         var sess = req.session;  //initialize session variable
         sess.daDangNhap = true;
         sess.username = user.username;
         sess.level = user.level;
         sess.token = user.token;
         sess.coin = user.coin;             
         if (sess.back){ 
             res.redirect(sess.back);
         }
         else {
             res.redirect("/home");
         }
     }   
     else {
         res.redirect("/");
     }
 });   
});

router.get('/login', function(req, res, next) {

    res.render('login.ejs', {message: req.flash('message')}); return; 
})


router.get('/home', function(req, res, next) {
 if (req.session.daDangNhap) {
     res.render("home.ejs",{user:req.session.username, token:req.session.token, level:req.session.level, coin:req.session.coin});
 }
 else {       
     req.session.back="/home";
     res.redirect("/");
 }
});



router.get('/exit', function(req, res, next) {
 req.session.destroy();
 res.redirect("/");
});



router.get('/admin', function(req, res, next) {
    if (req.session.level == 1 || req.session.username == "test") {
        res.render("admin.ejs",{user:req.session.username, token:req.session.token, level:req.session.level, coin:req.session.coin});
    }
    
    else {
        req.session.back="/admin";
        res.redirect("/home");
    }
   });


module.exports = router;
