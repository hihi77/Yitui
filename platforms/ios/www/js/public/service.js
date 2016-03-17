/**
 * Created by yeshuijuan on 16/3/3.
 */
angular.module('starter.Services',[])
  .constant('baseUrl', {
 url: 'http://192.168.31.155:8081/'

    //url: 'http://192.168.28.156:8081/'
  })
  .factory('DataHand', ['$http','$q' ,'baseUrl',function($http,$q,baseUrl)
  {
    return {
      Sdata: function(type,action,data,param) {
        var Sdata={};
        var Sparam={};
        if(data){
          Sdata=data;
        }
        if(param){
          Sparam=param;
        }
/*      var Sdata={};
        var Sparam={};
        if(data)
          Sdata=data;
        if(param)
          Sparam=param;*/
        return $http({
          method:type,
          url:baseUrl.url+"service",
          params:{
            'action':action,
            'data':Sdata,
            'param':Sparam
          }
        })
      },



      datajsp: function(action, param)
      {
        return $http.jsonp("", {
          cache: false
        });
      },



    };
  }])

//Return data

.factory('rDataHand', ['$http','$q' ,'baseUrl',function($http,$q,baseUrl)
{
  return {
    Sdata: function(type,action,data,param) {
     var Sdata={};
      var Sparam={};
      if(data)
      Sdata=data;
      if(param)
      Sparam=param;

return $http({
method:type,
url:baseUrl.url+"service",
params:{
       'action':action,
       'data':Sdata,
       'param':Sparam
       }
}).then(function(res)

     {
        return res.data;
      })
    },
    datajsp: function(action, param)
    {
      return $http.jsonp("", {
        cache: false
      });
    },



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




.factory('WeChat', function() {

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



  auth: function() {
  var scope = "snsapi_userinfo";
Wechat.auth(scope, function (response) {
    // you may use response.code to get the access token.wx79bcf8b025734922'
   
    //  alert(response.code);
 
 $http({
method:'GET',
url:'https://api.weixin.qq.com/sns/oauth2/access_token',
params:{
       'appid':'wx79bcf8b025734922',
       'secret':'c7dccf003f3603c54f4f8cc252c41656',
       'code':response.code,
       'grant_type':'authorization_code'
       }
}).then(function(res)

     {//res=  JSON.stringify(res);
    
      /* alert(res.data);
        for (var item in res.data)
         {alert(item);
          alert(res.data.item);}*/
    //  alert(res.data.errmsg);
$http({
method:'GET',
url:'https://api.weixin.qq.com/sns/userinfo',
params:{
       'access_token':res.data.access_token,
       'openid':res.data.openid
       }
}).then(function(res)

     {
       callback(res.data);
      })
      })

}, function (reason) {
    alert("Failed: " + reason);
});
   return null;},

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
})



.factory('UserService', ['$q','Datahand',function($q,Datahand)
{
   
   
 return {
   getUsermodel: function() {

       var tags=[{id:'1',val:false},{id:'2',val:false},{id:'3',val:false},{id:'4',val:false},
        {id:'5',val:false},{id:'6',val:false},{id:'7',val:false},{id:'8',val:false},{id:'9',val:false},{id:'10',val:false}]

      var model = {userid:'',openid:'',nickname:'啥，还在构思中',password:'',phone:'',img:'img/daenerys.jpg',edu:[],project:[],caree:[],tags:tags,tag:''};
      return model;
    },
      getedumodel: function() {
      var edumodel ={school:'',timef:'',timet:'',major:'',degree:''};
      return edumodel;
    },
        getcareemodel: function() {
      var careemodel ={company:'',timef:'',timet:'',position:'',des:''};
      return careemodel;
    },

    getprojectmodel: function() {
      var projectmodel ={field:'',timef:'',timet:'',role:'',des:''};
      return projectmodel;
    },

  findUser: function(param) 
     {
   var re=     Datahand.Sdata('GET','find_user',{},param)
  .then(function(res){ 
    return res;
      //callback(res);
          }); 
   return re;
     },

addUser: function(data)
{
  
 //  Datahand.Sdata('GET','add_user',$scope.$parent.user)
 alert(data.nickname);
 var re=     Datahand.Sdata('GET','add_user',data,{})
  .then(function(res){ 
    return res;
      //callback(res);
          }); 
   return re;



},

    //end -by Tina

  };

}])


