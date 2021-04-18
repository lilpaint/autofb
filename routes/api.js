var express = require('express');
var router = express.Router();
var db=require('../models/database'); 
/* GET home page. */

router.post('/getcoin', function (req, res) {
    let user = req.body.username;
    let token = req.body.token;
    if (!user) {
        return res.status(400).send({ error:true, message: 'Please provide user' });
    }
    db.query("SELECT * from users WHERE username = ? AND token = ?", [user, token], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});

router.post('/settings', function (req, res) {
    let user = req.body.username;
    let token = req.body.token;
    if (!user) {
        return res.status(400).send({ error:true, message: 'Please provide user' });
    }
    db.query("SELECT * from settings WHERE username = ? AND token = ?", [user, token], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});

router.post('/account/setting', function (req,res){
    let email = req.body.email;
    if (!email) {
        return res.status(400).send({ error:true, message: 'email không được để trống' });
    }
    db.query("SELECT * from settings WHERE email = ?", [email], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
})

router.post('/account/add', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let key2fa = req.body.key2fa;
    let username = req.body.username;
    let token = req.body.token;
    if (!email) {
        return res.status(400).send({ error:true, message: 'PackageName không được để trống' });
    }
    db.query("UPDATE settings SET email = ?, password = ?, key2fa = ? WHERE username = ? AND token = ?", [email, password, key2fa, username, token], function (error, results, fields) {
        if (error) throw error;
        res.redirect("/home");
    });
});

router.post('/update', function (req, res) {
    let email = req.body.email;
    let daily = req.body.daily;
    let total = req.body.total;
    if (!email) {
        return res.status(400).send({ error:true, message: 'PackageName không được để trống' });
    }
    db.query("UPDATE settings SET daily = ? + daily, total = ? + total WHERE email = ?", [daily, total, email], function (error, results, fields) {
        if (error) throw error;
        res.redirect("/home");
    });
});

router.get('/limited', function (req, res) {
    db.query('SELECT * FROM settings limit 10', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
  });

module.exports = router;
