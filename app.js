/*Module import*/
import express from 'express'//http모듈같은 것
import mysql from 'mysql'
import bodyParser from 'body-parser'//uri 안깨지도록
import path from 'path'
import connection from 'express-myconnection'
//import expressValidator from 'express-validator'//request 유효값 검사

/*Set const*/
const app = express();
const router = express.Router();
// const conn = mysql.createConnection({
// 	host : 'localhost',
// 	port : 3306,
// 	user : 'root',
// 	password : '',
// 	database: 'new_schema'
// });
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
//app.engine('html', require('ejs').renderFile);

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

//app.use(expressValidator());

/*mysql connection*/
// connection.connect( (err) => {
// 	if(err){
// 		console.error('mysql connection error');
// 		console.error(err);
// 		throw err;
// 	} else {
// 		console.log("연결에 성공했습니다.");
// 	}
// });

/*-----------
CRUD API
-----------*/

/*RESTful set route*/
/*Use router*/
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
		/*현재의 미들웨어 함수가 요청-응답 주기를 종료하지 않는 경우에는 next()를 호출하여 그 다음 미들웨어 함수에 제어를 전달해야 한다. 그렇지 않으면 해당 요청은 정지된 채로 방치됨*/
});

var curut = router.route('/index');
app.use('/api', router);
/*GET-Bring Data*/
// userdb.get(function(req, res, next) {
// 	/*미들웨어 함수에 대한 HTTP 응답, 요청 인수*/
// 	/*미들웨어 함수에 대한 콜백 인수(일반적으로 "next"라 불림).*/
// 	req.getConnection(function(err, conn){
// 		if(err) return next("cannot connect");
// 		let query = ('SELECT * FROM users', function(err, rows){
// 			if(err){
// 				console.log(err);
// 				return next("mysql error, check your query");
// 			}
// 				res.render('user',{title:"RESTful Crud Example-Sophia",data:rows})
// 		});
// 	});
// });


curut.get(function(req,res,next){


    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM users',function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.render('index',{title:"Todo List",data:rows});

         });

    });

});

// app.get('/database', (req, res) => {
// 	//get방식에 유알엘이 / 로 들어왔을 때 -> uri
// 	connection.query('SELECT * FROM users', (err, rows, fields) => {
// 		if(err) throw err;
// 		return res.send({ error: false, data: rows, message: 'todos list.'});
// 		// const users = rows.length !== 0 ? rows : { message : 'No data selected' }
// 		// res.json(users);
// 	});
// });


//데이터 가져오기2
// db.all(function(req,res,next){
// 	console.log("You need to smth about db Route ? Do it here");
// 	console.log(req.params);
// 	next();
// });
//
// db.get(function(res, req, next){
// 	var users_id = req.params.user_id;
// 	req.getConnection(function(err,conn){
//
// 		if(err) return next("Cannot Connect");
// 		var query = conn.query('SELECT * FROM user where users_id=?',[users_id], function(err, rows){
// 			if(err){
// 				console.log(err);
// 				return next("mysql error, check your query");
// 			}
// 			if(rows.length < 1)
// 			return res.send("User Not Found");
// 			res.render('edit', {title:"Edit user", data:rows});
// 		});
// 	});
// });
//get(read)-데이터 id 가져오기
// app.get("/database/:id", function (req, res) {
// 	//get방식에 유알엘이 / 로 들어왔을 때 -> uri
// 	//let users_id = req.params.id;
// 	if(!req.params.id){
// 		return res.status(400).send({ error: true, message: 'please provide users_id'});
// 	}
// 	connection.query('SELECT * FROM users where id=?', function (err, rows, fields) {
// 		if(err) throw err;
// 		return res.send({ error: false, data : results[0], message: 'todo lists.'});
// 		//const users = rows.length !== 0 ? rows[0] : { message : 'Todos' }
// 		//res.json(users);
// 	});
// });





// router.get('/', function(req, res, next) {
// 	res.locals.connection.query('SELECT * from users', function (drror, results, fields){
// 		if(error) throw err;
// 		res.send(JSON.stringify({ "status" : 200, "error" : null, "response" : results}));
// 	});
// });

app.listen(3000, () => {
	console.log('hello');
});
