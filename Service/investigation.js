/**
 * Created by yeshuijuan on 16/3/3.
 */
var user  = require('./users');
var async = require('async');
exports.newinvest = function(db,data,param,res) {
  var id = new Date().getTime().toString();
  //var id = new Date().getTime()+data.userId;
  data.id = id;
  data.startTime = new Date();
  data.userId = 'tina';
  var collection = db.collection('investigations');
  collection.insert(data ,function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
    res.send(result);
    db.close();
  });
  
//res.send('newuser');
}


exports.get_invest_detail = function(db,data,param,res)
{
  var collection = db.collection('investigations');
  collection.find(param).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
    res.send(result[0]);
    db.close();
  });

}


exports.get_invest_model = function(db,data,param,res)
{
  console.log(param)
  var collection = db.collection('investigations');
  collection.find(param,{source:1,startTime:1,moneyReward:1,endTime:1,alreadyPortion:1,maxPortion:1,questions:1}).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
    res.send(result[0]);
    db.close();
  });

}

exports.get_u_invest = function(db,data,param,res)
{
  var collection = db.collection('investigations');
  collection.find().toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
    res.send(result);
    db.close();
  });

}

exports.get_info_byType = function(db,data,param,res)
{
  var collection = db.collection('investigations');
  var types =["培训", "沙龙","游学","读书","会议"];
  var resultDataAll = [];
  var resultData = [];
  var iterator = function(item,callback){
    param.type = item;
    collection.find(param,{id:1,startTime:1,endTime:1,maxPortion:1,moneyReward:1}).toArray(function(err, result) {   
    callback(null,result);
  });
  }
  async.map(types,iterator,
  function(err,results){
      if(err)
      {console.log('Error:'+ err);
      return;}
      var len = results.length;
      
      for (var i=0; i<len; i++){
        var item = {type:types[i],data:results[i]};
        resultDataAll.push(item);
      }
      console.log(resultDataAll);
      res.send(resultDataAll);
      db.close();
  });
}

exports.submit_invest_rRecord = function(db,data,param,res)
{
  
  var rdata = data.data;
  var userInfo = {"userId":data.userId};
  rdata.userId = "tina";
  var collection = db.collection('investigations');
  switch (data.type) {
    case "investRecord":
      updateRecord({record:rdata});
      break;
    default:
      res.send('非法请求');
  }

  function updateRecord(rData){
    collection.update(param,{$addToSet:{rData}},function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }else{
        collection.find(param,{startTime:1,endTime:1,moneyReward:1,maxPortion:1,source:1}).toArray(function(err,result){
        user.update_user_partake(db,"investifation",result[0],{userId:data.userId});
      })
      
      res.send(result);
      db.close();
    }
  });
    }
}

