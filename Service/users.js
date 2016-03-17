exports.newuser = function(db,data,param,res) {

console.log(param);
data.userId = data.phone;
data.participate = {};
data.basicinfo = {nickname:""};
var collection = db.collection('users');
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


exports.update_user_partake = function(db,type,data,param)
{
  switch(type){
    case "activity":
    updateRecord({"participate.activity":data});
    break;
    case "hire":
    updateRecord({"participate.hire":data});
    break;
    case "investigation":
    updateRecord({"participate.invest":data});
    break;
    case "information":
    updateRecord({"participate.information":data});
    break;
    defalt:
    console.log('Invalid!');
  }

  function updateRecord(data){
    console.log(data)
    var collection = db.collection('users');
    collection.update(param,{$addToSet:data},function(err, result) {
      if(err)
      {
        console.log('Error:'+ err);
        return;
      }else console.log('success');
    });   
  }
}


exports.get_user = function(db,data,param,res)
{
  var collection = db.collection('users');
  collection.find(param).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }else if(result.length>0){
     result = result[0];
    }
    res.send(result);
    db.close();
  });

}

exports.get_participate_item = function(db,data,param,res)
{
  var type = data.type;
  switch(type){
    case "activity":
    getRecord({"participate.activity":1});
    break;
    case "information":
    getRecord({"participate.information":1});
    break;
    case "hire":
    getRecord({"participate.hire":1});
    break;
    case "invest":
    getRecord({"participate.invest":1});
    break;
    default:
    console.log("Invalid!");
  }

  function getRecord(par){
    var collection = db.collection('users');
    collection.find(param,par).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }else{
      switch(type){
      case "activity":
      result = result[0]?result[0].participate.activity:[];
      break;
      case "information":
      result = result[0]?result[0].participate.information:[];
      break;
      case "hire":
      result = result[0]?result[0].participate.hire:[];
      break;
      case "invest":
      result = result[0]?result[0].participate.invest:[];
      break;
      default:
      result = [];
       }
       res.send(result);
       db.close();
    }

    });
 }
}

exports.add_friend = function(db,data,param,res) {

var collection = db.collection('users');
collection.find({"$or":[{userId:data.id},{nickname:data.id}]}).toArray(function(err,result){
  if(err){
    console.log('Error:'+ err);
    return;
  }else if(result.length>0){
    collection.update(param,{$addToSet:{friends:data}});
    res.send({result:1})
  }else res.send({result:0})
})
//res.send('newuser');

}

exports.getfriend = function(db,data,param,res)
{
  var collection = db.collection('users');

  collection.find(param,{friends:1,_id:0}).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
     res.send(result[0].friends);
    db.close();
  });

}


exports.get_user_basic = function(db,data,param,res)
{

  var collection = db.collection('users');
  collection.find(param,{'basicinfo':1,_id:0}).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }else {
      if(result.length>0){
       res.send(result[0].basicinfo);
      }
    }
    db.close();
  });

}


exports.update_user_info = function(db,data,param,res)
{
  var collection = db.collection('users');

  collection.update(param,{$set:data},'',function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }else {
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
  });

}

exports.updatepush_user_info = function(db,data,param,res)
{
  var collection = db.collection('users');
  console.log(data)
  collection.update(param,{$push:data},'',function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }else console.log('success')
    res.send();
    db.close();
  });

}


exports.updatepulluser = function(db,data,param,res)
{
  var collection = db.collection('users');
  collection.update(param,{$pull:data},'',function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }else console.log('success')
    res.send();
    db.close();
  });

}


/*exports.update_userarray_info = function(db,data,param,res)
{
  var collection = db.collection('users');
  collection.update(param,{$set:data},function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }else {
      collection.update(param,{$push:data})

    }
    res.send();
    db.close();
  });

}*/
