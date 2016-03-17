 angular.module('starter.loginServices', [])

.factory('loginServices', ['$q','rDataHand','ShowM',function($q,rDataHand) 
{
   
   return {
     findUser : function(param){
             var re = rDataHand.Sdata('get','get_user',{},param)
      .then(function(res){ 
        return res;
          //callback(res);
              }); 
       return re;
     },
      addUser : function(data){
             var re = rDataHand.Sdata('get','add_user',data,{})
      .then(function(res){ 
        return res;
          //callback(res);
              }); 
       return re;
     }

   }
    
  }])



.factory('WeChat', ['$http','$q',function($http,$q) {
  
  return {
    payment: function() {
     var params = {
    mch_id: '10000100', // merchant id
    prepay_id: 'wx201411101639507cbf6ffd8b0779950874', // prepay id
    nonce: '1add1a30ac87aa2db72f57a2375d8fec', // nonce
    timestamp: '1439531364', // timestamp
    sign: '0CB01533B8C1EF103065174F50BCA001', // signed string
};

Wechat.sendPaymentRequest(params, function () {
    alert("Success");
}, function (reason) {
    alert("Failed: " + reason);
});
    return null;},

 auth: function(callback) {
  
  alert(Wechat)
    Wechat.auth("snsapi_userinfo", function (response) {
        // you may use response.code to get the access token.
        alert(JSON.stringify(response));
    }, function (reason) {
        alert("Failed: " + reason);
    });
    return true;
},

sharelink: function(type,title,des,img,link) {

Wechat.share({
    message: {
         title: title,
        description: des,
        thumb: '',
        mediaTagName: "TEST-TAG-001",
        messageExt: "这是第三方带的测试字段",
        messageAction: "<action>dotalist</action>",
        media: {
            type: Wechat.Type.LINK,
            webpageUrl: link
        }
    },
    scene: type  // share to Timeline
}, function () {
    alert("Success");
}, function (reason) {
    alert("Failed: " + reason);
});

return null;
    }
  };
}])


.factory('ShowM', ['$q','$ionicPopup',function($q,$ionicPopup) 
{
  return {
    showAlert: function(title, text) {
 
    var alertPopup = $ionicPopup.alert({
       title: title,
       template:text
     });
     alertPopup.then(function(res) {
      
     });
        },
    showConfirm: function(title, text) {
    var confirmPopup = $ionicPopup.confirm({
       title: title,
       template: text
     });
     confirmPopup.then(function(res) {
       if(res) {
        return true;
       } else {
         return false;
       }
     });
    return   confirmPopup; },

 
  };
}])


.factory('localStorageService', [function() {
        return {
            get: function localStorageServiceGet(key, defaultValue) {
                var stored = localStorage.getItem(key);
                try {
                    stored = angular.fromJson(stored);
                } catch (error) {
                    stored = null;
                }
                if (defaultValue && stored === null) {
                    stored = defaultValue;
                }
                return stored;
            },
            update: function localStorageServiceUpdate(key, value) {
                if (value) {
                    localStorage.setItem(key, angular.toJson(value));
                }
            },
            clear: function localStorageServiceClear(key) {
                localStorage.removeItem(key);
            }
        };
    }])

