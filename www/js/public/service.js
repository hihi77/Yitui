/**
 * Created by yeshuijuan on 16/3/3.
 */
angular.module('starter.Services',[])
  .constant('baseUrl', {
 url: 'http://localhost:8081/'
//
    //url: 'http://app.amecnsh.com:8081/'
  })
  .factory('DataHand', ['$http','$q' ,'baseUrl',function($http,$q,baseUrl)
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
