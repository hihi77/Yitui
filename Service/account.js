exports.newuser = function(db,data,param,res) {

console.log(param);
 var collection = db.collection('users');
 //  data=JSON.parse(data);
 //
 //  console.log(data);
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


exports.finduser = function(db,data,param,res)
{
var collection = db.collection('users');
  param=JSON.parse(param);
   console.log(param);
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




//By Tina
exports.updateuser = function(db,data,param,res)
{
  var collection = db.collection('users');
 // param=JSON.parse(param);
 // data=JSON.parse(data);
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
    console.log(result)
     res.send(result);
     db.close();
  });
    }
  });

}

exports.updatepushuser = function(db,data,param,res)
{
  var collection = db.collection('users');
 // param=JSON.parse(param);
 // data=JSON.parse(data);
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
 // param=JSON.parse(param);
 // data=JSON.parse(data);
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


exports.updatearraypulluser = function(db,data,param,res)
{
  var collection = db.collection('users');
 // param=JSON.parse(param);
 // data=JSON.parse(data);
  collection.update(param,{$pull:data[0]},'',function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }else {
      collection.update(param,{$push:data[1]})

    }
    res.send();
    db.close();
  });

}
