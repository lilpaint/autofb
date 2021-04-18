var mysql = require('mysql'); 
var db = mysql.createConnection({   
    host: 'mysql://localhost:3306',     
    user: 'root',     
    password: 'dmdmdm',     
    database: 'remind' 
});  
db.connect(function(err) {    
   if (err) throw err;    
   console.log('Da ket noi database'); 
}); 

module.exports = db; //lệnh exports để xuất (public) ra, cho bên ngoài module có thể dùng được db
