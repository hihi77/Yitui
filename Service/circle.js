exports.add_circle = function(db,data,param,res) {
  //To be replaced with actual userInfo
var userInfo = {userId:data.userId};
data.circleId = new Date().getTime().toString();
data.members = {authority:[userInfo]};
var collection = db.collection('circles');
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


exports.update_circle_rRecord = function(db,data,param,res)
{
  data.id = new Date().getTime().toString();
  var collection = db.collection('circles');
  switch (data.type) {
    case "information":
      updateRecord({information:data});
      break;
    case "invest":
      updateRecord({invest:data});
      break;
    case "hire":
      updateRecord({hire:data});
      break;
    case "activity":
      updateRecord({activity:data});
      break;
    case "notice":
      updateRecord({notice:data});
      break;
   case "complaint":
      updateRecord({complaint:data});
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
    }
    res.send(result);
  });
    }
}

exports.get_circle_index= function(db,data,param,res) {
 var collection = db.collection('circles');
 var resultData = {};
 collection.find(param).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }else{
     resultData.myCircle = result;
     collection.find().toArray(function(err,result){
      if(err)
        {
          console.log('Error:'+ err);
          return;
        }
       resultData.hotCircle = result;
       res.send(resultData);
       db.close();
     })
    }
   })
//res.send('newuser');
}

exports.get_circle_item = function(db,data,param,res)
{
  var collection = db.collection('circles');
  data._id = 0;
  collection.find(param,data).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
    var results = {};
    for(var key in result[0]){
    results = result[0][key];
    break;
    }
    console.log(results)
    res.send(results);
    db.close();
  });

}

exports.get_circle_members = function(db,data,param,res)
{
  var collection = db.collection('circles');
  collection.find(param,{members:1,'describe.text':1}).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
    result[0].describe = result[0].describe.text;
    res.send(result[0]);
    db.close();
  });

}



exports.delete_circle = function(db,data,param,res){
  var collection = db.collection('circles');
  collection.remove(param,function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
    res.send(result[0]);
    db.close();
  });
}

exports.get_circle = function(db,data,param,res)
{
  var collection = db.collection('circles');
  var type = data.type;
  switch(type){
    case "myCircle":
      getCircle(param);
      break;
    case "hotCircle":
      getCircle({});
      break;
    defalt:
    res.send("Invalid")
  }
  function getCircle(param){
    collection.find(param).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
    res.send(result);

  });

  }
}