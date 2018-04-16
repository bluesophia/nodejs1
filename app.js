import express from	'express';
import bodyParser from 'body-parser';
import router from './router';

const app = express();

app.listen(3000, () => {
	console.log("server started");
})

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(boyParser.urlencoded({ extended: true }))
app.use(router)
