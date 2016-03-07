/**
 * Created by yeshuijuan on 16/2/22.
 */
var Rongcloud = require( './Rongcloud.js' );
var rongcloudSDK = require( 'rongcloud-sdk' );
Rongcloud.IMInit();



exports.gettoken= function (db,data,param,res) {
  var collection = db.collection('users');
  var param=JSON.parse(param);
   console.log(param)
   collection.find({ 'userid': '1453268712530' }).toArray(function(err, result) {
     console.log(result)
   if(err)
   {
   console.log('Error:'+ err);
   return;
   }
   else if(!result[0].token){
     rongcloudSDK.user.getToken( param.userid, 'Lance', 'http://files.domain.com/avatar.jpg', function( err, resultText ) {
       if( err ) {
         // Handle the error
       }
       else {
         var result = JSON.parse( resultText );
         if( result.code === 200 ) {
           console.log(result.token)
           var tokendata = {token:result.token};
           collection.update(param,{$set:tokendata},'',function(err, result) {
             if(err)
             {
               console.log('Error:'+ err);
               return;
             }
             res.send(result);
             db.close();
           });
         }
       }
     });
   }
   });
}


