/*Module import*/
import express from 'express'//http모듈같은 것
import mysql from 'mysql'
import bodyParser from 'body-parser'//uri 안깨지도록
import path from 'path'
import connection from 'express-myconnection'


/*Set const*/
const app = express();
const router = express.Router();

/*//tutor
const conn = mysql.createConnection({
	host : 'localhost',
	port : 3306,
	user : 'root',
	password : '',
	database: 'new_schema'
});

//mysql connection
connection.connect( (err) => {
	if(err){
		console.error('mysql connection error');
		console.error(err);
		throw err;
	} else {
		console.log("연결에 성공했습니다.");
	}
});*/

app.use(

    connection(mysql,{
        host     : 'localhost',
				port		 : 3306,
        user     : 'root',
        password : '',
        database : 'new_schema',
    },'request')

);

/*Set template engine*/
app.set('view engine', 'ejs');
app.set('views','./views');

/*Module Express use*/
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));//정적 파일 사용
app.use(bodyParser.json())//data body parsing,들어오는데이터는 json만 받는다
app.use(bodyParser.urlencoded({ extended: true }));//support x-www-form-urlencoded
//extended는 request 객체의 body에 대한 url encoding의 확장을 할 수 있도록
/*
유알엘 자체는 유니코드다 인지하면서 바코드로 바뀐다 -> 깨짐
익스텐드 트루로 하면 안깨지게 한다
ex)정유빈 -> %fdjkf% ->깨지는 것을 방지
자바스크립트에서도 쓴다 클라이언트, 서버 양쪽에 맞춰주는 것이 좋다 */



/*--------------------------
CRUD API1-api/index/
----------------------------*/
//route1
var curut = router.route('/index');

//GET
curut.get(function(req,res,next){
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
curut.post(function(req,res,next){

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
curut.delete(function(req,res,next){

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

/*Tutor*/
// app.get('/database', (req, res) => {
// 	//get방식에 유알엘이 / 로 들어왔을 때 -> uri
// 	connection.query('SELECT * FROM users', (err, rows, fields) => {
// 		if(err) throw err;
// 		return res.send({ error: false, data: rows, message: 'todos list.'});
// 		// const users = rows.length !== 0 ? rows : { message : 'No data selected' }
// 		// res.json(users);
// 	});
// });

/*--------------------------
CRUD API2-api/index/:id
----------------------------*/
var routerId = router.route('/index/:id');

//delete data
routerId.delete(function(req,res,next){

    var id = req.params.id;

     req.getConnection(function (err, conn) {
        if (err) return next("Cannot Connect");
        var query = conn.query("DELETE FROM users  WHERE id = ? ",[id], function(err, rows){
             if(err){
                console.log(err);
                return next("Mysql error, check your query");
             }
             res.sendStatus(200);
        });
     });
});
app.use('/api', router);

app.listen(3000, () => {
	console.log('hello');
});
