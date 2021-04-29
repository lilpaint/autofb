var express = require('express');
const session = require('express-session');
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
        return res.status(400).send({ error:true, message: 'Please provide user' });1

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

router.post('/account/slot', function (req,res){
    let d = new Date();
    let createdate = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();

    let slot = req.body.slot;
    let username = req.body.username;
    let token = req.body.token;
    let comment = req.body.comment;
    let vip = req.body.vip;
    if (!slot) {
        return res.status(400).send({ error:true, message: 'email không được để trống' });
    }
    if (!comment){
        let sql = 'SELECT * FROM users WHERE username = ? AND token = ?';
        db.query(sql, [username, token] , (err, rows) => {   
        if (rows.length<=0) { res.redirect("/"); return;}
        let user = rows[0];        
        let coin = user.coin;
        let money = 50000*slot;
        if(coin < money){
            res.redirect("/"); return;
        }
        else{
            db.query("UPDATE users SET coin = coin - ?  WHERE username = ? AND token = ?", [money, username, token], function (error, results, fields) {
                if (error) throw error;
            });
            db.query("UPDATE users SET slot = slot + ?  WHERE username = ? AND token = ?", [slot, username, token], function (error, results, fields) {
                if (error) throw error;
                res.redirect("/"); return;
            });
            for(slotmua = 0; slotmua < slot; slotmua++){
                let info = [username, token, createdate, vip];        
                let sql = 'INSERT INTO settings SET username = ?, token = ?, createdate = ?, expiredate = ADDDATE(createdate, 31), vip = ?';
                db.query(sql, info);
            }
        }
    });
    }
    else{
        let sql = 'SELECT * FROM users WHERE username = ? AND token = ?';
        db.query(sql, [username, token] , (err, rows) => {   
        if (rows.length<=0) { res.redirect("/"); return;}
        let user = rows[0];        
        let coin = user.coin;
        let money = 70000*slot;
        if(coin < money){
            res.redirect("/"); return;
        }
        else{
            db.query("UPDATE users SET coin = coin - ?  WHERE username = ? AND token = ?", [money, username, token], function (error, results, fields) {
                if (error) throw error;
            });
            db.query("UPDATE users SET slot = slot + ?  WHERE username = ? AND token = ?", [slot, username, token], function (error, results, fields) {
                if (error) throw error;
                res.redirect("/"); return;
            });
            for(slotmua = 0; slotmua < slot; slotmua++){
                let info = [username, token, createdate, vip];        
                let sql = 'INSERT INTO settings SET username = ?, token = ?, createdate = ?, expiredate = ADDDATE(createdate, 31), comment = 1, vip = ?';
                db.query(sql, info);
            }
        }
    });
    }
})

router.post('/account/add', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let key2fa = req.body.key2fa;
    let limitdaily = req.body.limitdaily;
    let delay = req.body.delay;
    let username = req.body.username;
    let token = req.body.token;
    let id = req.body.id;
    let content = req.body.content;
    let listid = req.body.listid;
    if (!email) {
        return res.status(400).send({ error:true, message: 'PackageName không được để trống' });
    }
    db.query("UPDATE settings SET email = ?, password = ?, key2fa = ?, limitdaily = ?, delay = ?, content = ?, listid = ? WHERE username = ? AND token = ? AND id = ?", [email, password, key2fa, limitdaily, delay, content, listid, username, token, id], function (error, results, fields) {
        if (error) throw error;
        res.redirect("/home");
    });
});

router.post('/account/delete', function (req, res) {
    let email = 'isNotActive';
    let username = req.body.username;
    let token = req.body.token;
    let id = req.body.id;
    if (!username) {
        return res.status(400).send({ error:true, message: 'PackageName không được để trống' });
    }
    db.query("UPDATE settings SET email = ? WHERE username = ? AND token = ? AND id = ?", [email, username, token, id], function (error, results, fields) {
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
    db.query("SELECT * FROM settings WHERE email != 'isNotActive' limit 20", function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
  });

  
router.post('/account/list', function (req, res) {
    var level = req.body.level;
    var username = req.body.username;
    if (!level) {
        return res.status(400).send({ error:true, message: 'PackageName không được để trống' });
    }
    else if(level == 1 || username == 'test'){
        db.query("SELECT * FROM users", function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'users list.' });
        });
    }
    else if (level == 0) {
        return res.status(400).send({ error:true, message: 'PackageName không được để trống' });
    }
    
});

router.post('/users/delete/', function (req, res) {
    let username = req.body.username;
    if (!username) {
     return res.status(400).send({ error: true, message: 'Please provide user_id' });
     
    }
    else{
        db.query("DELETE FROM users WHERE username = ?", [username], function (error, results, fields) {
            if (error) throw error;
            
        });
        db.query("DELETE FROM settings WHERE username = ?", [username], function (error, results, fields) {
            if (error) throw error;
            
        });
        
    }
});

router.post('/users/edit', function (req, res) {
    let username = req.body.username;
    let coin = req.body.coin;
    let level = req.body.level;
    if (!username) {
     return res.status(400).send({ error: true, message: 'Please provide user_id' });
     
    }
    else{
        db.query("UPDATE users SET coin = ?, level = ? WHERE username = ?", [coin, level, username], function (error, results, fields) {
            if (error) throw error;
            res.redirect("/admin");
        });
        
    }
});

router.post('/logs/add', function (req, res) {
    let idlike = req.body.idlike;
    let email = req.body.email;
    let count = req.body.count;
    let name = req.body.name;
    if (!idlike) {
     return res.status(400).send({ error: true, message: 'Please provide user_id' });
     
    }
    else{
        
        db.query("INSERT INTO logs SET email = ?, idlike = ?, count = ?, name = ?", [email, idlike, count, name], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'users list.' });
        });
        
    }
});

router.post('/logs/list', function (req, res) {
    let idlike = req.body.idlike;
    let email = req.body.email;
    if (!idlike) {
     return res.status(400).send({ error: true, message: 'Please provide user_id' });
     
    }
    else{
        
        db.query("SELECT * FROM logs WHERE idlike = ? AND email = ?", [idlike, email], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'users list.' });
        });
        
    }
});

router.get('/logs/:email', function (req, res) {
    let email = req.params.email;
    if (!email) {
     return res.status(400).send({ error: true, message: 'Please provide user_id' });
     
    }
    else{
        
        db.query("SELECT * FROM logs WHERE email = ?", [email], function (error, results, fields) {
            if (error) throw error;
            return res.render('logs',{ error: false, data: results, message: 'users list.', email: email });
        });
        
    }
});

router.post('/logs/daily', function (req, res) {
    let email = req.body.email;
    if (!email) {
     return res.status(400).send({ error: true, message: 'Please provide user_id' });
     
    }
    else{
        
        db.query("SELECT * FROM logs WHERE email = ?", [email], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'users list.' });
        });
        
    }
});



module.exports = router;
