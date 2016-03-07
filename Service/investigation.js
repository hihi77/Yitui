/**
 * Created by yeshuijuan on 16/3/3.
 */
exports.newinvest = function(db,data,param,res) {
  var collection = db.collection('investigation');
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


exports.findinvest = function(db,data,param,res)
{
  var collection = db.collection('investigation');
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
