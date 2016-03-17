/**
 * Created by yeshuijuan on 16/3/3.
 */

var async = require('async');

exports.get_index_detail = function(db,data,param,res)
{
  var n = 3
  var collection = db.collection('hires');
  param = {draflag:'1'};
  var resultall = {};
  var len;
  collection.find(param).sort({_id:-1}).limit(n).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }else{
      resultall.toHireData = result;
      collection = db.collection("activities");
      collection.find(param).sort({_id:-1}).limit(n).toArray(function(err, result){
        if(err){
          console.log('error:'+err);
          return;
        }else{
          len = result.length;
          for(var i=0;i<len;i++){
            result[i].phoneUrl = result[i].eventDetails.images?result[i].eventDetails.images[0]:"";
            result[i].evaluationNumber = result[i].evaluationRecord?result[i].evaluationRecord.length:0;
            result[i].applicants = result[i].signUpRecord?result[i].signUpRecord.length:0;
            result[i].time = result[i].activityTime +'-'+result[i].endTime;
          }
          resultall.activityData = result;
          collection = db.collection("informations");
          collection.find(param).sort({_id:-1}).limit(n).toArray(function(err, result){
            if(err){
              console.log('error:'+err);
              return;
            }else{
              len = result.length;
              for(var i = 0; i<len; i++){
                    result[i].clickALike = result[i].alikeRecord?result[i].alikeRecord.length:0;
                    result[i].browse = result[i].browseRecord?result[i].browseRecord.length:0;
                    result[i].comment = result[i].commentInfo?result[i].commentInfo.length:0;
              }
              resultall.informationData = result;
              collection = db.collection("investigations");
              collection.find(param).sort({_id:-1}).limit(n).toArray(function(err,result){
                resultall.investigateData = result;
                console.log(resultall);
                res.send(resultall);
                db.close();
              })
            }
          })
        }
      })
    }

  });

}


/*exports.get_index_detailtest = function(db,data,param,res)
{
  var collections =["hires","activities","informations","investigations"];
  var resultDataAll = [];
  var resultData = [];
  var iterator = function(collection,callback){
    var collection = db.collection(collection);
    collection.find(param).toArray(function(err, result) {   
    callback(null,result);
  });
  }
  async.map(collections,iterator,
  function(err,results){
      if(err)
      {
        console.log('Error:'+ err);
        return;
      }    
      console.log(resultDataAll);
      res.send(resultDataAll);
      db.close();
  });
}*/


