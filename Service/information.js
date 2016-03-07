/**
 * Created by yeshuijuan on 16/3/3.
 */
exports.newinfo = function(db,data,param,res) {
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


exports.findinfo = function(db,data,param,res)
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
