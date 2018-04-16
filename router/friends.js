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


var friends = router.route('/index/:id');

//delete data
friends.delete(function(req,res,next){

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

export default friends;
