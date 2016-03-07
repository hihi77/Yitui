/**
 * Created by yeshuijuan on 16/3/3.
 */
exports.newhire = function(db,data,param,res) {
  var collection = db.collection('hires');
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
  collection.findOne(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
    res.send(result);
    db.close();
  });

}


