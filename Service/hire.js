/**
 * Created by yeshuijuan on 16/3/3.
 */
 var user  = require('./users');
exports.newhire = function(db,data,param,res) {
  var collection = db.collection('hires');
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


exports.findhire = function(db,data,param,res)
{
  var collection = db.collection('hires');
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

exports.apply_hire = function(db,data,param,res)
{
  var collection = db.collection('hires');
  collection.update(param,{addToSet:{applicant:data}},function(err,result){
    if(err){
      console.log('err:'+err);
      return;
    }
    else{
      collection.find(param,{title:1,time:1,address:1,company:1}).toArray(function(err,result){
        user.update_user_partake(db,"hire",result[0],{userId:data.userId});
      })
    res.send(result);
    }
  })
}

exports.get_u_hire = function(db,data,param,res)
{
  var collection = db.collection('hires');
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


exports.get_hire_byParam = function(db,data,param,res)
{
  var collection = db.collection('hires');
  collection.find(param).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
    res.send(result);
    db.close();
  });

}



