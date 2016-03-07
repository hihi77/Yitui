/**
 * Created by yeshuijuan on 16/3/3.
 */
exports.newactivity = function(db,data,param,res) {

  console.log(param);
  var collection = db.collection('activities');
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


exports.findactivity = function(db,data,param,res)
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


