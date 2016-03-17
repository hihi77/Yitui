var express = require('express');
var app = express();
var users = require('./Service/users');
var hire = require('./Service/hire');
var index = require('./Service/index');
var activity = require('./Service/activity');
var info = require('./Service/information');
var invest = require('./Service/investigation');
var circle = require('./Service/circle');
var inform = require('./Service/inform');


var MongoClient = require('mongodb').MongoClient;

var DB_CONN_STR = 'mongodb://localhost:27017/meapp';

var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;
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
 console.log(action)
 var param=parse(req.query.param,res);
 var data=parse(req.query.data,res);

 switch (action)
  {

    case "new_inform":
    dbcon(inform.new_inform,data,param,res);
    break;

    case "get_participate_item":
    dbcon(users.get_participate_item,data,param,res);
    break;
    /*
    * Circle
    * */
    //Get data for circle-index.html 
    case "get_circle_index":
        dbcon(circle.get_circle_index,data,param,res);
        break;
        
    case "get_circle_members":
        dbcon(circle.get_circle_members,data,param,res);
        break;
     //Add a new circle
    case "add_circle":
       dbcon(circle.add_circle,data,param,res);
       break;

     //To push new information/invest/hire/activity to circle
    case "update_circle_rRecord":
       dbcon(circle.update_circle_rRecord,data,param,res);
       break;

     //Get circle by type("myCircle/hotCircle")
    case "get_circle":
       dbcon(circle.get_circle,data,param,res);
       break;

    //DataHand.Sdata("get","delete_circle",{},{circleId:**})
    case "delete_circle":
       dbcon(circle.delete_circle,data,param,res);
       break;

     //Get specific item in circle, such as "information","hire" and so on
    case "get_circle_item":
       dbcon(circle.get_circle_item,data,param,res);
       break;


      /*
      * Discover
      * */
     //Get data for discover-index.html
    case "get_index_detail":
       dbcon(index.get_index_detail,data,param,res);
       break;

    case "get_info_detail":
       //
       dbcon(info.get_info_detail,data,param,res);
       break;
    case "get_info_byType":
       //
       dbcon(info.get_info_byType,data,param,res);
       break;

    case "submit_info_rRecord":
       //
       dbcon(info.submit_info_rRecord,data,param,res);
       break;

    case "get_activity_detail":
       dbcon(activity.get_activity_detail,data,param,res);
       break;

    case "get_activity_area":
       //
       dbcon(activity.get_activity_area,data,param,res);
       break;

       //
    case "submit_activity_rRecord":
       //
       dbcon(activity.submit_activity_rRecord,data,param,res);
       break;

    case "get_activity_registrationAdditionalModel":
       // 
       dbcon(activity.get_activity_registAdditModel,data,param,res);
       break;

    case "get_activity_evaluationModel":
       //
       dbcon(activity.get_activity_evaluationModel,data,param,res)
       break;

    case "get_invest_byType":
       //
       dbcon(invest.get_info_byType,data,param,res);
       break;

    case "get_invest_model":
       //
       dbcon(invest.get_invest_model,data,param,res)
       break;

       //
    case "submit_invest_rRecord":
       //
       dbcon(invest.submit_invest_rRecord,data,param,res)
       break;

       //应聘
    case "apply_hire":
       //
       dbcon(hire.apply_hire,data,param,res)
       break;

    case "get_hire_byParam":
       //
       dbcon(hire.get_hire_byParam,data,param,res);
       break;




    /*
    * Publish
    * */
    /*
    * Hire
    * */
    case "add_hire":
     //
        dbcon(hire.newhire,data,param,res)
        break;

    case "get_hire":
     //
        dbcon(hire.findhire,data,param,res)
        break;
    case "get_u_hire":
     //
        dbcon(hire.get_u_hire,data,param,res)
        break;
    /*
    * Activity
    * */
    case "add_activity":
     //
        dbcon(activity.newactivity,data,param,res)
        break;

    case "get_activity":
     //
        dbcon(activity.getactivity,data,param,res)
        break;

    case "get_u_activity":
     //
        dbcon(activity.get_u_activity,data,param,res)
        break;
    /*
    * Information
    * */
    case "add_info":
     //
        dbcon(info.newinfo,data,param,res)
        break;

    case "get_u_info":
     //
        dbcon(info.get_u_info,data,param,res)
        break;
    /*
    * Investigation
    * */
    case "add_invest":
     //
        dbcon(invest.newinvest,data,param,res)
        break;

    case "get_invest_detail":
     //
        dbcon(invest.get_invest_detail,data,param,res)
        break;

    case "get_u_invest":
     //
        dbcon(invest.get_u_invest,data,param,res)
        break;



    /*
    * users
    * */
    case "get_user":
        dbcon(users.get_user,data,param,res)
        break;
        
    case "get_friend":
        dbcon(users.getfriend,data,param,res)
        break;

    case "add_friend":
        dbcon(users.add_friend,data,param,res)
        break;

    case "get_user_basic":
        dbcon(users.get_user_basic,data,param,res)
        break;

    case "update_user_info":
        dbcon(users.update_user_info,data,param,res)
        break;

    case "updatepush_user_info":
        dbcon(users.updatepush_user_info,data,param,res)
        break;

    case "update_userarray_info":
        dbcon(users.update_userarray_info,data,param,res)
        break;



    case "add_user":
        dbcon(users.newuser,data,param,res)
        // ...
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
{
  
 console.log('》》'+data);

 try {
  return  JSON.parse(data);
  } 
  catch (e) 
  {
    console.log('error: '+data);
    res.send('传入数据出错');
  return 
  }

}
