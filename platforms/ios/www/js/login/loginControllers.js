
/* global angular, document, window */
/* global angular, document, window */
'use strict';

angular.module('starter.loginControllers', [])

.controller('LoginCtrl', function($scope,$state,userServices,localStorageService,WeChat){
 $scope.Checkin = function()

 {//
     userServices.findUser({password:$scope.user.password,phone:$scope.user.phone.toString()}).then(function(res)
    {
       console.log(res);
   if(res!="")
    {  
   localStorageService.update('id',res.userId);
   $scope.user=res;
    if(res.nickname>' ')

     $state.go('tab.user-index',{userId:res.userId});
     }

   else{
    alert('密码或手机号码错误','您输入的密码或手机号码有误，请检查。');
   }
    }

    );
 }

   $scope.WeChatSSO= function()
 {
  alert("sso")
function callback(wxres)

  { 
    alert(wxres.nickname);
    if(wxres.openid)
    {
     userServices.findUser({openId:wxres.nickname}).then(function(res){
      alert('ok')
      if(res.length>0)
      {  
       localStorageService.update('id',res[0].userId);
       $scope.user=res[0];
       if(res[0].nickname>' '){
          $state.go('tab-discover',{userId:res[0].userId});
       }
      }
      else{
         var d = new Date();
         $scope.user.userId=d.getTime() ;
         $scope.user.openid=wxres.openid;
         $scope.user.nickname=wxres.nickname;
         $scope.user.heardPhoneUrl=wxres.headimgurl;
         userServices.addUser($scope.user).then(function(res){
        if(res.result.ok>0)
           {
            localStorageService.update('id', $scope.user.userId);
            $state.go('tab-discover',{userid:$scope.user.userId.toString()});
           }
        else{
            ShowM.showAlert('创建用户失败','创建用户失败，请检查网路！'); 
          }
       });

      }
      })

      }

      }    
     WeChat.auth(callback);
  }

})


.controller('RegisterCtrl', function($scope,$sce, $timeout,$state, $stateParams,userServices,ShowM,rDataHand,localStorageService) {

$scope.user = {};
$scope.Tosubmit= function()
{
if($scope.user.password==$scope.obj.confirm)

{ 
    var d = new Date();
    $scope.user.userId = $scope.user.phone||$scope.user.openId;
    userServices.addUser($scope.user).then(function(res){
    if(res.result.ok>0)
       {localStorageService.update('id', $scope.user.userId);
       $state.go('tab.user-index',{userId:$scope.user.userId});
       }
    else
        ShowM.showAlert('创建用户失败','创建用户失败，请检查网路！'); 
   });

 //rDataHand.Sdata('GET','find_user',$scope.user,{phone:$scope.user.phone}).then(function(res){console.log(res);});

}
else
     ShowM.showAlert('密码错误','您两次输入的密码不一致！');

};

$scope.Rsend= function(type,phone)
{
    
    $scope.myURL ="";
    if(type==2 &&!$scope.obj.resend)
     return;
   
    if(!$scope.user.phone)
     $scope.user.phone=phone;
     $scope.obj.resend=false;
     $scope.Snumber="";
for(var i=0;i<6;i++) 
{ 
 $scope.Snumber+=Math.floor(Math.random()*10); 
} 


 // $scope.Snumber=888888;
 var src='http://106.ihuyi.cn/webservice/sms.php?method=Submit&account=cf_zhongwei&password=amec123456&mobile='+$scope.user.phone+
 '&content=您的验证码是：【'+$scope.Snumber+'】。请不要把验证码泄露给其他人。' ;
//alert(src);
  $scope.myURL = $sce.trustAsResourceUrl(src); 

    $scope.wait=60;  
     $scope.time=function () {  
        if ($scope.wait== 0) { 
            $scope.obj.resend=true;
           return;
        } else {  
          
          $scope.wait--;  
           $timeout(function() {
                 $scope.time()  ;

            },  
            1000)  
        }  
    }  
     $scope.time();
 } 
   

  $scope.CheckbyPhoneNuber= function(PhoneNuber)
    { 
   rDataHand.Sdata('GET','get_user',$scope.user,{phone:$scope.user.phone.toString()})
   .then(function(res)
    {
       console.log(res);
   if(res.length<1)
    {  
        $state.go('register_verify',{verify:$scope.user.phone});
       
     
     }

else
    ShowM.showConfirm('手机号已注册','您输入的手机号已经注册，是否需要找回密码?').then(function(res){if(res){$scope.ToGetPassword();}});

    }

    );

//
    };

    $scope.ToGetPassword= function()
    { 
        alert($scope.user.phone);
   // $state.go('app.register_verify',{verify:$scope.user.phone})
     
    };
    

$scope.DoVerify= function()
     { 
        if($scope.Snumber==$scope.obj.Vnumber&&$scope.Snumber>'0')
        { 
          $state.go('register_submit',{submit:$scope.user.phone});

        }
    else
     { 
//
      ShowM.showAlert('验证码错误','您输入的短信验证码有误，请检查。');
     }
      };

  if($stateParams.verify)
  { $scope.Snumber='';
    $scope.obj={Vnumber:'',confirm:'',resend:false};
  // $scope.resend = false ;
   $scope.Rsend(1,$stateParams.verify);
 
  }
 else if($stateParams.submit)
  {  $scope.obj={confirm:''};
     $scope.user.phone=$stateParams.submit;
   
  }
})
