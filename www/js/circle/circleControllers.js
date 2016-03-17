angular.module('starter.circleControllers', [])
  .controller("circle", function ($scope, $rootScope, $ionicModal,circleServices) {
    circleServices.getCircleIndexData().then(function(result){
      $scope.circleData=result.data;
    });
    $scope.searchData=[];
    $scope.servicesSearch=function(text){
      circleServices.searchCircle(text).then(function(result){

      });
    }

  })
  .controller('myCircle', function ($scope, userServices) {
    $scope.circles = [];
    $scope.title = '我的圈子';
    userServices.getCircle("myCircle").then(function(result){
      $scope.searchData=result.data;
      $scope.circles=result.data;
      $scope.searchMarking='title';
    })
  })

  .controller('hotCircle', function ($scope, userServices) {
    $scope.circles = [];
    $scope.title = '热门圈子';
    userServices.getCircle("hotCircle").then(function(result){
      $scope.searchData=result.data;
      $scope.circles=result.data;
      $scope.searchMarking='title';
    })

  })
  .controller('addCircle', function ($scope, system, $rootScope,circleServices,$ionicPopup) {
    $scope.data = {};
    $rootScope.circleEphemeralData = {};
    $rootScope.circleEphemeralData['圈子描述'] = {};
    $rootScope.circleEphemeralData['圈子海报']=$scope.data;
    $scope.publishCircle=function(){
      var tmp='';
      if(!$rootScope.circleEphemeralData['选择类型']){
        tmp+='没有选择类型<br>';
      }
      if(!$rootScope.circleEphemeralData['圈子名称']){
        tmp+='没有填写圈子名称<br>';
      }
      if(!$rootScope.circleEphemeralData['圈子海报'].images.length){
        tmp+='没有圈子海报<br>';
      }
      if(!$rootScope.circleEphemeralData['圈子描述'].text){
        tmp+='没有填写圈子描述<br>';
      }
      if(0){
        $ionicPopup.alert({
          "title":"信息不完整",
          "template":tmp,
          "okText":"确认"
        })
        return false;
      }
      circleServices.publishCircleInfo($rootScope.circleEphemeralData).then(function(){
        $ionicPopup.alert({
          "title":"发布成功",
          "okText":"确认"
        })
      });
      console.log($rootScope.circleEphemeralData);
    }
    $rootScope.circleSaveInfo = function () {
      system.bindNavTool({
        rightText: "保存草稿",
        toolClick: function () {
          circleServices.saveCircleRough($rootScope.circleEphemeralData).then(function(result){
            $ionicPopup.alert({
              "title":"草稿保存成功",
              "okText":"确认"
            })
          });
        }
      })
    }
  })
  .controller('circleSelectType', function ($scope, publishActivityServices, $rootScope, system) {
    $scope.title = '选择圈子类型';
    $scope.selectTypeText = '选择类型';
    $scope.selectData = [];
    $scope.elementShow = {};
    var promise = publishActivityServices.activitySelectType.getData();//测试服务
    promise.success(function (data) {
      $scope.typeDatas = data;
    });
    var name = '选择类型';
    system.bindNavTool({
      rightText: "保存",
      toolClick: function () {
        $rootScope.circleEphemeralData[name] = $scope.selectData.join(',');
        $rootScope.backClick();
        $rootScope.circleSaveInfo();
      }
    });
  })
  .controller('circleTermsForEntry', function ($scope, system, $rootScope) {
    $scope.title = '加入条件';
    $scope.heardTitle = '加入条件设置';
    if ($rootScope.circleEphemeralData['加入条件']) {
      $scope.lists = $rootScope.circleEphemeralData['加入条件'];
    } else {
      $scope.lists = [
        {
          "icon": "ion-person",
          "text": "姓名"
        },
        {
          "icon": "ion-iphone",
          "text": "手机"
        },
        {
          "icon": "ion-android-happy",
          "text": "公司"
        },
        {
          "icon": "ion-android-happy",
          "text": "邮箱"
        }
      ];
    }
    var name = '加入条件';
    system.bindNavTool({
      rightText: "保存",
      toolClick: function () {
        $rootScope.circleEphemeralData[name] = $scope.lists;
        $rootScope.backClick();
        $rootScope.circleSaveInfo();
      }
    });
  })
  .controller('circleEnterTheCircle', function ($rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicNavBarDelegate, system) {
    window.$ionicNavBarDelegate = $ionicNavBarDelegate;
    $rootScope.pageMarking = 'circle';
    $scope.id = $stateParams.id;
    $rootScope.showNavBar=false;
    $scope.toolClick = function () {
      $state.go('circle-circleMembers', {
        id: $stateParams.id
      })
    }
    $scope.backClick=function(){
      $state.go('tab.circle-index');
    }

  })
  .controller('circleCircleMembers', function ($scope,$rootScope,circleServices,$stateParams) {
    $rootScope.showNavBar=false;
    circleServices.getCircleMembers($stateParams.id).then(function(result){
      $scope.membersData=result.data;
    })
  })

  .controller('circleMember', function ($scope, $state,circleServices, $stateParams, $ionicHistory, $rootScope, system) {
    $rootScope.showNavBar=false;
    $scope.show={
      "part":1
    };
    circleServices.getAllMember($stateParams.id).then(function(result){
      $scope.allUser=result.data;
    })
  })

  .controller('circleUserInfo', function ($rootScope) {
    $rootScope.showNavBar=false;

  })
  .controller('circleSelectContacts', function ($rootScope) {
    $rootScope.showNavBar=false;


  })
  .controller('circleNotice', function ($scope,$stateParams,circleServices,$rootScope,$ionicPopup) {
    $rootScope.showNavBar=false;
    $scope.submit=function(){
      circleServices.subNotice($stateParams.id,$scope.notice).then(function(){
        $ionicPopup.alert({
          "title":"成功",
          "okText":"确认"
        })
        console.log($scope.notice)
      })

    }


  })
  .controller('circleReport', function ($rootScope,$scope,circleServices,$stateParams,$ionicPopup) {
    $rootScope.showNavBar=false;
    $scope.submit=function(){
      circleServices.submitReport($stateParams.id,$scope.phone,$scope.text).then(function(){
        $ionicPopup.alert({
          "title":"成功",
          "okText":"确认"
        })
      });
    }


  })
  .controller('circleNoticePage', function ($scope,$rootScope,circleServices,$stateParams) {
    $rootScope.showNavBar=false;
    $scope.notice=[];
    circleServices.getNotice($stateParams.id).then(function(result){
      $scope.notice=result.data;
    })

  })
  .controller('circleActivity', function ($scope, $rootScope,circleServices) {
    $rootScope.showNavBar=false;
    circleServices.getCircleActivity().then(function(result){
      $scope.nowData=result.activity;
    })
  })
