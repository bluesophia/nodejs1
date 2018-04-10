import express from 'express'
import mysql from 'mysql'
import bodyParser from 'body-parser'

const app = express();
const router = express.Router();


const connection = mysql.createConnection({
	host : 'localhost',
	port : 3306,
	user : 'root',
	password : '',
	database: 'new_schema' 
});

connection.connect( (err) => {
	if(err){
		console.error('mysql connection error');
		console.error(err);
		throw err;
	} else {
		console.log("연결에 성공했습니다.");
	}
});

app.use(bodyParser.json())//data body parsing,들어오는데이터는 json만 받는다
//미들웨어 연결하는 애 app은 미들웨어
app.use(bodyParser.urlencoded({ extended: true }));
/*유알엘 자체는 유니코드다 인지하면서 바코드로 바뀐다 -> 깨짐
익스텐드 트루로 하면 안깨지게 한다 
ex)정유빈 -> %fdjkf% ->깨지는 것을 방지
자바스크립트에서도 쓴다 클라이언트, 서버 양쪽에 맞춰주는 것이 좋다 */




app.get('/', (req, res) => {
	//get방식에 유알엘이 / 로 들어왔을 때 -> uri
	const query = connection.query('SELECT * FROM users', (err, rows) => {
		if(err) throw err;
		const users = rows.length !== 0 ? rows : { message : 'No data selected' }
		res.json(users);
	});
})

app.listen(3000, () => {
	console.log('hello');
});