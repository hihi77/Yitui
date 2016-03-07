var express = require('express');
var app = express();
var users = require('./Service/account');
var hire = require('./Service/hire');
var activity = require('./Service/activity');
var info = require('./Service/information');
var invest = require('./Service/investigation');
var IM = require('./Service/IM');
var imageupload = require('./Service/multerUtil.js');

var MongoClient = require('mongodb').MongoClient;

var DB_CONN_STR = 'mongodb://localhost:27017/meapp';

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

app.use(express.static('www'));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.use('/upload',function(req,res){

imageupload.upload(req,res);
})


app.get('/service', function (req, res) {
 var action=req.query.action;
 var param=parse(req.query.param,res);
 var data=parse(req.query.data,res);
 switch (action)
  {
    case "get_user":
        // ...
        break;
    case "add_user":
      dbcon(users.newuser,data,param,res)
        // ...
        break;

   case "add_hire":
     //
     dbcon(hire.newhire,data,param,res)
     break;

   case "get_hire":
     //
     dbcon(hire.findhire,data,param,res)
     break;

   case "add_activity":
     //
     dbcon(activity.newactivity,data,param,res)
     break;

   case "get_activity":
     //
     dbcon(activity.findactivity,data,param,res)
     break;

   case "add_info":
     //
     dbcon(info.newinfo,data,param,res)
     break;

   case "get_info":
     //
     dbcon(info.findinfo,data,param,res)
     break;

   case "add_invest":
     //
     dbcon(invest.newinvest,data,param,res)
     break;

   case "get_invest":
     //
     dbcon(invest.findinvest,data,param,res)
     break;

   case "del_user":
        // ...
        break;
   case "update_user":

        dbcon(users.updateuser,data,param,res)
        break;

   case "updatearray_user":

        dbcon(users.updatearrayuser,data,param,res)
        break;

   case "updatepush_user":
        dbcon(users.updatepushuser,data,param,res)
        break;

   case "updatepull_user":
        dbcon(users.updatepulluser,data,param,res)
        break;

   case "find_user":
       dbcon(users.finduser,data,param,res)
        // ...
        break;

   case "IM_gettoken":
       dbcon(IM.gettoken,data,param,res)
       break;

    default:
        res.send('非法请求');
   }





})

app.post('/service', function (req, res)
{

})

function dbcon(daction,data,param,res)
{

  MongoClient.connect(DB_CONN_STR,function(err, db)
{
  if(err)
    {console.log(err);
   res.send(' 数据库连接错误');
    }
else
  daction(db,data,param,res);
 //res.send(' 数据库连接错误');
});



}

function parse(data,res)
{console.log(data);
 
 try {
  return  JSON.parse(data);
  } 
  catch (e) 
  {
    console.log(data);
    res.send('传入数据出错');
  return 
  }



}
