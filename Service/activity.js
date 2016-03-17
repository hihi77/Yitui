/**
 * Created by yeshuijuan on 16/3/3.
 */

var user  = require('./users');
var async = require('async');
exports.newactivity = function(db,data,param,res) {

  var collection = db.collection('activities');
  var id = new Date().getTime().toString();
  //var id = new Date().getTime()+data.userId;
  data.id = id;
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


exports.get_activity_detail = function(db,data,param,res)
{
  var collection = db.collection('activities');
  collection.find(param).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }else if(result){
    result[0].evaluationNumber = result[0].evaluationRecord?result[0].evaluationRecord.length:0;
    result[0].signUpSuccess = result[0].signUpRecord?result[0].signUpRecord.length:0;}
    console.log(result[0]);
    res.send(result[0]);
    db.close();
  });

}

exports.get_activity_area = function(db,data,param,res)
{
  var collection = db.collection('activities');
  var types =["培训", "沙龙","游学","读书","会议"];
  var resultDataAll = [];
  var resultData = [];
  var area = param.address;
  param.address = { $regex: area, $options: 'i' };
  var iterator = function(item,callback){
    param.type = item;
    collection.find(param,{id:1,title:1,type:1,phoneUrl:1,time:1,address:1,price:1,evaluationRecord:1}).toArray(function(err, result) {   
    callback(null,result);
  });
  }
  async.map(types,iterator,function(err,results){
      if(err)
      {
        console.log('Error:'+ err);
        return;
      }
      var len = results.length;
      for(var i=0;i<len;i++){
        results[i].evaluationNumber = results[i].evaluationRecord?results[i].evaluationRecord.length:0;
        results[i].applicants = results[i].signUpRecord?results[i].signUpRecord.length:0;
      }
      for (var i=0; i<len; i++){
        var item = {type:types[i],data:results[i]};
        resultDataAll.push(item);
      }
      console.log(resultDataAll);
      res.send(resultDataAll);
      db.close();
  });
}


exports.submit_activity_rRecord = function(db,data,param,res)
{
  var rdata = data.data;
  console.log('data.type:'+data.type)
  var collection = db.collection('activities');
  switch (data.type) {
    case "evaluation":
      updateRecord({evaluationRecord:rdata});
      break;
    case "signUp":
      updateRecord({signUpRecord:rdata});
      break;
    default:
      res.send('非法请求');
  }
  function updateRecord(rData){
    collection.update(param,{$addToSet:rData},function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }else{
        collection.find(param,{id:1,title:1,type:1,phoneUrl:1,time:1,address:1,price:1,evaluationRecord:1}).toArray(function(err,result){
        result[0].evaluationNumber = result[0].evaluationRecord?result[0].evaluationRecord.length:0;
        result[0].applicants = result[0].signUpRecord?result[0].signUpRecord.length:0;
        user.update_user_partake(db,"activity",result[0],{userId:data.userId});
      })    
    }
   res.send(result);
  });
    }
}


exports.get_activity_registAdditModel = function(db,data,param,res)
{
  var collection = db.collection('activities');
  collection.find(param,{registrationAdditional:1}).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }else if(result){
      var bt = result[0].registrationAdditional;
      var len = bt.length;
      var rResult = [];
      for (var i=0;i<len;i++){
        if(bt[i].checkBox==true){
          rResult.push(bt[i])
        }
      }
    }else rResult=[];
    res.send(rResult);
    db.close();
  });

}

exports.get_activity_evaluationModel = function(db,data,param,res)
{
  var collection = db.collection('activities');
  collection.find(param,{activitySatisfaction:1,courseSastisfaction:1}).toArray(function(err, result) {
    var rData = {};
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }else if(result){
      var rData = {};
      var bt = result[0].activitySatisfaction,
          at = result[0].courseSastisfaction;

      var len = bt?bt.length:0;
      var rResult = [],
          aResult = [];
      for (var i=0;i<len;i++){
        if(bt[i].checkBox==true){
          rResult.push(bt[i])
        }
      }
      rData.activity = rResult;
      len = at?at.length:0;
      for (var i=0;i<len;i++){
        if(at[i].checkBox==true){
          aResult.push(at[i])
        }
      }
      rData.courseSastisfaction = aResult;
      
    }
/*    rdata.activity = result[0]?result[0].activitySatisfaction:[];
    rdata.giveLessons = result[0]?result[0].courseSastisfaction:[];
*/
    res.send(rData);
    db.close();
  });

}

exports.get_u_activity = function(db,data,param,res)
{
  var collection = db.collection('activities');
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

