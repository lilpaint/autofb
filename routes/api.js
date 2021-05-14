var express = require('express');
const session = require('express-session');
var router = express.Router();
var db=require('../models/database'); 
/* GET home page. */

// router.post('/getcoin', function (req, res) {
//     let user = req.body.username;
//     let token = req.body.token;
//     if (!user) {
//         return res.status(400).send({ error:true, message: 'Please provide user' });
//     }
//     db.query("SELECT * from users WHERE username = ? AND token = ?", [user, token], function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
//     });
// });

// router.post('/settings', function (req, res) {
//     let user = req.body.username;
//     let token = req.body.token;
//     if (!user) {
//         return res.status(400).send({ error:true, message: 'Please provide user' });1

//     }
//     db.query("SELECT * from settings WHERE username = ? AND token = ?", [user, token], function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
//     });
// });

// router.post('/account/setting', function (req,res){
//     let email = req.body.email;
//     if (!email) {
//         return res.status(400).send({ error:true, message: 'email không được để trống' });
//     }
//     db.query("SELECT * from settings WHERE email = ?", [email], function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
//     });
// })

// router.post('/account/slot', function (req,res){
//     let d = new Date();
//     let createdate = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();

//     let slot = req.body.slot;
//     let username = req.body.username;
//     let token = req.body.token;
//     let comment = req.body.comment;
//     let vip = req.body.vip;
//     if (!slot) {
//         return res.status(400).send({ error:true, message: 'email không được để trống' });
//     }
//     if (!comment){
//         let sql = 'SELECT * FROM users WHERE username = ? AND token = ?';
//         db.query(sql, [username, token] , (err, rows) => {   
//         if (rows.length<=0) { res.redirect("/"); return;}
//         let user = rows[0];        
//         let coin = user.coin;
//         let money = 50000*slot;
//         if(coin < money){
//             res.render("home", {message: 'Không đủ tiền', status: 'error'}); return;
//         }
//         else{
//             db.query("UPDATE users SET coin = coin - ?  WHERE username = ? AND token = ?", [money, username, token], function (error, results, fields) {
//                 if (error) throw error;
//             });
//             db.query("UPDATE users SET slot = slot + ?  WHERE username = ? AND token = ?", [slot, username, token], function (error, results, fields) {
//                 if (error) throw error;
//                 res.render("home", {message: 'Thành công', status: 'error', user:username, token:token}); return;
//             });
//             for(slotmua = 0; slotmua < slot; slotmua++){
//                 let info = [username, token, createdate, vip];        
//                 let sql = 'INSERT INTO settings SET username = ?, token = ?, createdate = ?, expiredate = ADDDATE(createdate, 31), vip = ?';
//                 db.query(sql, info);
//             }
//         }
//     });
//     }
//     else{
//         let sql = 'SELECT * FROM users WHERE username = ? AND token = ?';
//         db.query(sql, [username, token] , (err, rows) => {   
//         if (rows.length<=0) { res.redirect("/"); return;}
//         let user = rows[0];        
//         let coin = user.coin;
//         let money = 70000*slot;
//         if(coin < money){
//             res.redirect("/"); return;
//         }
//         else{
//             db.query("UPDATE users SET coin = coin - ?  WHERE username = ? AND token = ?", [money, username, token], function (error, results, fields) {
//                 if (error) throw error;
//             });
//             db.query("UPDATE users SET slot = slot + ?  WHERE username = ? AND token = ?", [slot, username, token], function (error, results, fields) {
//                 if (error) throw error;
//                 res.redirect("/"); return;
//             });
//             for(slotmua = 0; slotmua < slot; slotmua++){
//                 let info = [username, token, createdate, vip];        
//                 let sql = 'INSERT INTO settings SET username = ?, token = ?, createdate = ?, expiredate = ADDDATE(createdate, 31), comment = 1, vip = ?';
//                 db.query(sql, info);
//             }
//         }
//     });
//     }
// })

// router.post('/account/add', function (req, res) {
//     let email = req.body.email;
//     let password = req.body.password;
//     let key2fa = req.body.key2fa;
//     let limitdaily = req.body.limitdaily;
//     let delay = req.body.delay;
//     let username = req.body.username;
//     let token = req.body.token;
//     let id = req.body.id;
//     let content = req.body.content;
//     let listid = req.body.listid;
//     let time = req.body.time
//     if (!email) {
//         return res.status(400).send({ error:true, message: 'PackageName không được để trống' });
//     }
//     db.query("UPDATE settings SET email = ?, password = ?, key2fa = ?, limitdaily = ?, delay = ?, content = ?, listid = ?, time = ? WHERE username = ? AND token = ? AND id = ?", [email, password, key2fa, limitdaily, delay, content, listid, time, username, token, id], function (error, results, fields) {
//         if (error) throw error;
//         res.redirect("/home");
//     });
// });

// router.post('/account/delete', function (req, res) {
//     let email = 'isNotActive';
//     let username = req.body.username;
//     let token = req.body.token;
//     let id = req.body.id;
//     if (!username) {
//         return res.status(400).send({ error:true, message: 'PackageName không được để trống' });
//     }
//     db.query("UPDATE settings SET email = ? WHERE username = ? AND token = ? AND id = ?", [email, username, token, id], function (error, results, fields) {
//         if (error) throw error;
//         res.redirect("/home");
//     });
// });

// router.post('/update', function (req, res) {
//     let email = req.body.email;
//     let daily = req.body.daily;
//     let total = req.body.total;
//     if (!email) {
//         return res.status(400).send({ error:true, message: 'PackageName không được để trống' });
//     }
//     db.query("UPDATE settings SET daily = ? + daily, total = ? + total WHERE email = ?", [daily, total, email], function (error, results, fields) {
//         if (error) throw error;
//         res.redirect("/home");
//     });
// });

// router.get('/limited', function (req, res) {
//     db.query("SELECT * FROM settings WHERE email != 'isNotActive' limit 20", function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'users list.' });
//     });
//   });

  
// router.post('/account/list', function (req, res) {
//     var level = req.body.level;
//     var username = req.body.username;
//     if (!level) {
//         return res.status(400).send({ error:true, message: 'PackageName không được để trống' });
//     }
//     else if(level == 1 || username == 'test'){
//         db.query("SELECT * FROM users", function (error, results, fields) {
//             if (error) throw error;
//             return res.send({ error: false, data: results, message: 'users list.' });
//         });
//     }
//     else if (level == 0) {
//         return res.status(400).send({ error:true, message: 'PackageName không được để trống' });
//     }
    
// });

// router.post('/users/delete/', function (req, res) {
//     let username = req.body.username;
//     if (!username) {
//      return res.status(400).send({ error: true, message: 'Please provide user_id' });
     
//     }
//     else{
//         db.query("DELETE FROM users WHERE username = ?", [username], function (error, results, fields) {
//             if (error) throw error;
            
//         });
//         db.query("DELETE FROM settings WHERE username = ?", [username], function (error, results, fields) {
//             if (error) throw error;
            
//         });
        
//     }
// });

// router.post('/users/edit', function (req, res) {
//     let username = req.body.username;
//     let coin = req.body.coin;
//     let level = req.body.level;
//     if (!username) {
//      return res.status(400).send({ error: true, message: 'Please provide user_id' });
     
//     }
//     else{
//         db.query("UPDATE users SET coin = ?, level = ? WHERE username = ?", [coin, level, username], function (error, results, fields) {
//             if (error) throw error;
//             res.redirect("/admin");
//         });
        
//     }
// });

// router.post('/logs/add', function (req, res) {
//     let idlike = req.body.idlike;
//     let email = req.body.email;
//     let count = req.body.count;
//     let name = req.body.name;
//     if (!idlike) {
//      return res.status(400).send({ error: true, message: 'Please provide user_id' });
     
//     }
//     else{
        
//         db.query("INSERT INTO logs SET email = ?, idlike = ?, count = ?, name = ?", [email, idlike, count, name], function (error, results, fields) {
//             if (error) throw error;
//             return res.send({ error: false, data: results, message: 'users list.' });
//         });
        
//     }
// });

// router.post('/logs/list', function (req, res) {
//     let idlike = req.body.idlike;
//     let email = req.body.email;
//     if (!idlike) {
//      return res.status(400).send({ error: true, message: 'Please provide user_id' });
     
//     }
//     else{
        
//         db.query("SELECT * FROM logs WHERE idlike = ? AND email = ?", [idlike, email], function (error, results, fields) {
//             if (error) throw error;
//             return res.send({ error: false, data: results, message: 'users list.' });
//         });
        
//     }
// });

// router.get('/logs/delete', function (req, res) {
//     db.query("DELETE FROM logs", function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'users list.' });
//     });
// });

// router.get('/daily/reset', function (req, res) {
//     db.query("UPDATE settings SET daily = 0", function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'users list.' });
//     });
// });


// router.get('/logs/:email', function (req, res) {
//     let email = req.params.email;
//     if (!email) {
//      return res.status(400).send({ error: true, message: 'Please provide user_id' });
     
//     }
//     else{
        
//         db.query("SELECT * FROM logs WHERE email = ?", [email], function (error, results, fields) {
//             if (error) throw error;
//             return res.render('logs',{ error: false, data: results, message: 'users list.', email: email });
//         });
        
//     }
// });

// router.post('/logs/daily', function (req, res) {
//     let email = req.body.email;
//     if (!email) {
//      return res.status(400).send({ error: true, message: 'Please provide user_id' });
     
//     }
//     else{
        
//         db.query("SELECT * FROM logs WHERE email = ?", [email], function (error, results, fields) {
//             if (error) throw error;
//             return res.send({ error: false, data: results, message: 'users list.' });
//         });
        
//     }
// });

router.get('/account', function (req, res) {
    db.query("SELECT * FROM account", function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
  });

router.post('/account/add', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let key2fa = req.body.key2fa;
    if (!key2fa) {
        db.query("INSERT INTO account SET email = ?, password = ?", [email, password], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'users list.' });
        });
     
    }
    else{
        db.query("INSERT INTO account SET email = ?, password = ?, key2fa = ?", [email, password, key2fa], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'users list.' });
        });
        
    }
});

router.post('/account/delete', function (req, res) {
    let email = req.body.email;
    db.query("DELETE from account WHERE email = ?", [email], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

router.get('/script', function (req, res) {
    db.query("SELECT * from scripts", function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

router.post('/script/update', function (req, res) {
    let noti = req.body.noti;
    let story = req.body.story;
    let watch = req.body.watch;
    let market = req.body.market;
    let feed = req.body.feed;
    let viewgroup = req.body.viewgroup;
    let storytime1 = req.body.storytime1;
    let watchtime1 = req.body.watchtime1;
    let markettime1 = req.body.markettime1;
    let feedtime1 = req.body.feedtime1;
    let viewgrouptime1 = req.body.viewgrouptime1;
    let storytime2 = req.body.storytime2;
    let watchtime2 = req.body.watchtime2;
    let markettime2 = req.body.markettime2;
    let feedtime2 = req.body.feedtime2;
    let viewgrouptime2 = req.body.viewgrouptime2;
    let suggest = req.body.suggest;
    let suggesttime1 = req.body.suggesttime1;
    let suggesttime2 = req.body.suggesttime2;


    db.query("UPDATE scripts SET noti = ?, story = ?, watch = ?, market = ?, feed = ?, viewgroup =?, storytime1 = ?, watchtime1 = ?, markettime1 = ?, feedtime1 = ?, viewgrouptime1 = ?, storytime2 = ?, watchtime2 = ?, feedtime2 = ?, markettime2 = ?, viewgrouptime2 = ?, suggest = ?, suggesttime1 = ?, suggesttime2 = ? WHERE id = 1", [noti, story, watch, market, feed, viewgroup, storytime1, watchtime1, markettime1, feedtime1, viewgrouptime1, storytime2, watchtime2, feedtime2, markettime2, viewgrouptime2, suggest, suggesttime1, suggesttime2], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

router.post('/account/cookie', function (req, res) {
    let cookie = req.body.cookie;
    let email = req.body.email;
    let uid = req.body.uid;
    db.query("UPDATE account SET cookie = ?, uid = ? WHERE email = ?", [cookie, uid, email], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

router.post('/account/info', function (req, res) {
    let email = req.body.email;
    let birthday = req.body.birthday;
    let name = req.body.name;
    let cookie = req.body.cookie;
    let uid = req.body.uid;
    let friend_count = req.body.friend_count;
    let status = req.body.status;
    db.query("UPDATE account SET birthday = ?, name = ?, cookie = ?, uid = ?, friend_count = ?, status = ? WHERE email = ?", [birthday, name, cookie, uid, friend_count, status, email], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

router.post('/datatools/useragent', function (req, res) {
    let useragent = req.body.useragent;
    db.query("UPDATE account SET birthday = ?, name = ?, cookie = ?, uid = ?, friend_count = ?, status = ? WHERE email = ?", [birthday, name, cookie, uid, friend_count, status, email], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

router.post('/account/email', function (req, res) {
    let email = req.body.email;
    let newmail = req.body.newmail;
    db.query("UPDATE account SET email = ? WHERE email = ?", [newmail, email], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

router.post('/account/key2fa', function (req, res) {
    let email = req.body.email;
    let key2fa = req.body.key2fa;
    db.query("UPDATE account SET key2fa = ? WHERE email = ?", [key2fa, email], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

router.post('/account/pw', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    db.query("UPDATE account SET password = ? WHERE email = ?", [password, email], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

router.post('/account/proxy', function (req, res) {
    let email = req.body.email;
    let proxy = req.body.proxy;
    db.query("UPDATE account SET proxy = ? WHERE email = ?", [proxy, email], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

router.post('/account/ua', function (req, res) {
    let email = req.body.email;
    let useragent = req.body.useragent;
    db.query("UPDATE account SET useragent = ? WHERE email = ?", [useragent, email], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

router.post('/data/addua', function (req, res) {
    let useragent = req.body.useragent;
    db.query("INSERT INTO datatools SET useragent = ?", [useragent], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

router.get('/data/getua', function (req, res) {
    db.query("SELECT * FROM datatools", function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

module.exports = router;
