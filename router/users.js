import express from 'express';
import mysql from 'mysql';

const app = express();
const router = express.Router();

const connection = mysql.createConnection({
  host:'localhost',
  port:3306,
  user:'root',
  password:'',
  database:'new_schema'
})

//route1
var users = router.route('/index');

//GET
users.get(function(req,res,next){
    req.getConnection(function(err,conn){
        if (err) return next("Cannot Connect");
        var query = conn.query('SELECT * FROM users',function(err,rows){
            if(err){
                throw err;
                return next("Mysql error, check your query");
								/*미들웨어 함수에 대한 콜백 인수(일반적으로 "next"라 불림).*/
								/*현재의 미들웨어 함수가 요청-응답 주기를 종료하지 않는 경우에는 next()를 호출하여 그 다음 미들웨어 함수에 제어를 전달해야 한다. 그렇지 않으면 해당 요청은 정지된 채로 방치됨*/
            }
            res.render('index',{title:"Todo List",data:rows});
         });
    });
});


//POST
users.post(function(req,res,next){

    var data = {
        name:req.body.name,
     };

    req.getConnection(function (err, conn){
        if (err) return next("Cannot Connect");
        var query = conn.query("INSERT INTO users set ? ",data, function(err, rows){
           if(err){
                throw err;
                return next("Mysql error, check your query");
           }
          res.sendStatus(200);
        });
     });
});


//DELETE
users.delete(function(req,res,next){

    var id = req.params.id;

     req.getConnection(function (err, conn) {
        if (err) return next("Cannot Connect");
        var query = conn.query("DELETE FROM users WHERE id = ? ",[id], function(err, rows){
             if(err){
                throw err;
                return next("Mysql error, check your query");
             }
             res.sendStatus(200);
        });
     });
});

export default users;
