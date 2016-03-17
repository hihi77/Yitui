/**
 * Created by yeshuijuan on 16/3/3.
 */
var user  = require('./users');
var async = require('async');
exports.newinfo = function(db,data,param,res) {
  var id = new Date().getTime().toString();
  //var id = new Date().getTime()+data.userId;
  data.id = id;
  var collection = db.collection('informations');
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


exports.get_info_detail = function(db,data,param,res)
{
  var collection = db.collection('informations');
  collection.find(param).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
    result[0].clickALike = result[0].alikeRecord?result[0].alikeRecord.length:0;
    result[0].browse = result[0].browseRecord?result[0].browseRecord.length:0;
    result[0].comment = result[0].commentInfo?result[0].commentInfo.length:0;
    res.send(result[0]);
    db.close();
  });

}

exports.submit_info_rRecord = function(db,data,param,res)
{
  var userInfo = {userId:data.userId};
  var collection = db.collection('informations');
  switch (data.type) {
    case "alike":
      updateRecord({alikeRecord:userInfo},1);
      break;
    case "browse":
      updateRecord({browseRecord:userInfo});
      break;
    case "comment":
      updateRecord({commentInfo:userInfo});
      break;
    default:
      res.send('非法请求');
  }
  function updateRecord(rData){
    collection.update(param,{$push:rData},function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }else{

      collection.find(param,{}).toArray(function(err,result){
        var rr = result[0];
        rr.clickALike = rr.alikeRecord?rr.alikeRecord.length:0;
        rr.browse = rr.browseRecord?rr.browseRecord.length:0;
        rr.comment = rr.commentInfo?rr.commentInfo.length:0;
        user.update_user_partake(db,"information",result[0],{userId:data.userId});
      })
      
      res.send(result);
    }
  });
 }
}



exports.get_info_byType = function(db,data,param,res)
{
  var collection = db.collection('informations');
  var types =["培训", "沙龙","游学","读书","会议"];
  var resultDataAll = [];
  var resultData = [];
  var iterator = function(item,callback){
    param.type = item;
    collection.find(param,{id:1,title:1,type:1,phoneUrl:1,time:1,address:1,price:1}).toArray(function(err, result) {   
    callback(null,result);
  });
  }
  async.map(types,iterator,
  function(err,results){
      if(err)
      {
        console.log('Error:'+ err);
        return;
      }
      var len = results.length;
      for (var i=0; i<len; i++){
        var item = {type:types[i],data:results[i]};
        resultDataAll.push(item);
      }
      res.send(resultDataAll);
      db.close();
  });
}


exports.get_u_info = function(db,data,param,res)
{
  var collection = db.collection('informations');
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
