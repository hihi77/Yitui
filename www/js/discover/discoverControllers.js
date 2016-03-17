angular.module('starter.discoverControllers', [])
  .controller('discover', function ($scope, $rootScope,discoverServices, $ionicPopup, $ionicSlideBoxDelegate) {
    //$scope.$broadcast('scroll.refreshComplete');

    $rootScope.pageMarking='discover';
    $scope.doRefresh = function () {
      var promise = discoverServices.getDiscoverIndexData();
      $scope.discoverData = false;
      promise.then(function (result) {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.discoverData = result.data;
        $ionicSlideBoxDelegate.update();
        console.log($scope.discoverData)
      }, function () {
        $scope.$broadcast('scroll.refreshComplete');
      });
    }
    $scope.doRefresh();
  })
  .controller('discoverActivity', function ($scope, $ionicPopup, system, $state, discoverServices) {
    var services = discoverServices;
    $scope.url = 'tab.discover-activity';
    services.parev_$scope = $scope;
    $scope.tabClick = function (tab, index) {
      $scope.heardTabs.map(function (noe) {
        noe.hover = '';
      })
      tab.hover = 'hover';
      $scope.$parent.$parent.nowTab = tab;
      if ($scope.nowData)$scope.nowData.length = 0;
      if (tab.click)tab.click();
    }
    $scope.title = '活动';
    $scope.heardTabs = [];
    $scope.nowData = [];
    $scope.getData = function (area) {
      console.log('获取' + area);
      var promise = services.getAreaActivity(area);
      promise.then(function (result) {
        $scope.heardTabs = [];
        result.data.map(function (noe, index) {
          $scope.heardTabs.push({
            "type": noe.type,
            tmpUrl: "./templates/discover/discover-cateforyTab-activity-tmp.html",
            click: function () {
              $scope.nowData = JSON.parse(JSON.stringify(noe.data));
            }
          });
        });
        $scope.tabClick($scope.heardTabs[0], 0);
      }, alertShow);
    }
    function alertShow() {
      $ionicPopup.show({
        title: '信息拉取失败',
        buttons: [
          {
            text: '重新拉取',
            onTap: function (e) {
              $scope.nowTab.click();
            }

          },
          {
            text: '取消',
            type: 'button-positive'
          },
        ]
      });
    }

    var initArea = '上海-徐汇区';//需要定位
    $scope.getData(initArea);
    system.bindNavTool({
      rightText: "上海",//默认地址
      navRightIonicClass: "ion-android-arrow-dropdown",
      toolClick: function () {
        $state.go('tab.discover-selectArea');
      }
    });
  })
  .controller('discoverSelectArea', function ($scope, publishToHireServices, $rootScope, system, $timeout, $state, discoverServices, $ionicPopup) {
    $scope.config = publishToHireServices.selectTmpServices.config['area'];
    $scope.selectData = [];
    $scope.maxSurplus = 1;
    system.bindNavTool({
      rightText: "保存",//默认地址
      toolClick: function () {
        if (!$scope.selectData.length) {
          $ionicPopup.alert({
            title: "请选择"
          });
          return false;
        }
        var area = $scope.selectData[0].city + "-" + $scope.selectData[0].county;
        //这个地方刷新数据
        discoverServices.parev_$scope.getData(area);
        $timeout(function () {
          system.bindNavTool({
            rightText: area,//默认地址
            navRightIonicClass: "ion-android-arrow-dropdown",
            toolClick: function () {
              $state.go(discoverServices.parev_$scope.url);
            }
          });
        }, 100);
        $rootScope.backClick();
      }
    });
  })
  .controller('discoverSignUpDetailed', function ($rootScope, $scope, system, $stateParams, $timeout, $state, discoverServices) {
    //ion-share
    $scope.id = $stateParams.id;
    var prevNavText = $rootScope.prevNavText;
    system.bindNavTool({
      navRightIonicClass: "ion-android-share-alt size-24",
      toolClick: function () {
        //活动的分享
      },
      backClick: function () {
        $timeout(function () {
          if (!prevNavText)return;
          system.bindNavTool({
            rightText: prevNavText,//默认地址
            navRightIonicClass: "ion-android-arrow-dropdown",
            toolClick: function () {
              $state.go('tab.discover-selectArea');
            }
          });
        }, 200);
      }
    });
    var promise = discoverServices.getItemActivityDetailed($scope.id);
    promise.then(function (result) {
      $scope.signUpDetailed = result.data;
    }, function () {

    });
  })
  .controller('discoverSignUpInput', function ($scope, $rootScope, system, $stateParams, $ionicPopup, discoverServices) {
    //报名信息
    discoverServices.getRegistrationAdditional($stateParams.id).then(function (result) {
      $scope.registrationAdditional = result.data;
    }, function () {
    });
    $scope.submitSignUp = function () {
      var tmp = '';
      $scope.registrationAdditional.map(function (noe) {
        if (!noe.value) {
          tmp += noe.text + "信息未填写<br>"
        }
      })
      if (tmp) {
        $ionicPopup.alert({
          "title": "信息未填写",
          template: tmp,
          "okText": "确认"
        })
        return false;
      }
      discoverServices.submitSignUp($stateParams.id, $scope.registrationAdditional).then(function () {
        $ionicPopup.alert({
          "title": "提交成功",
          "okText": "确认"
        })
        $rootScope.backClick();
      }, function () {
        $ionicPopup.alert({
          "title": "提交失败",
          "okText": "确认"
        })
      })
    }
  })
  .controller('discoverActivityEvaluation', function ($scope, discoverServices, $stateParams, $rootScope, $ionicPopup) {
    //活动评价
    $scope.giveLessonsIndex = 0;
    $scope.activityIndex = 0;
    var promise = discoverServices.getActivityEvaluation($stateParams.id);
    promise.then(function (result) {
      $scope.evaluationData = result.data;
    }, function () {
    });
    $scope.submitEvaluation = function () {
      discoverServices.submitEvaluation($stateParams.id,$scope.evaluationData).then(function () {
        $ionicPopup.alert({
          title: "提交成功",
          okText: "确认"
        })
        $rootScope.backClick();
      }, function () {
        $ionicPopup.alert({
          title: "提交失败",
          okText: "确认"
        })
      });
    }
  })
  .controller('discoverToHireMore', function ($state, $scope, system, discoverServices,$stateParams) {
    //更多才聘
    discoverServices.parev_$scope = $scope;
    $scope.url = 'tab.discover-toHire-more';
    $scope.getData = function (area) {
      discoverServices.getToHireMore(($stateParams.id==undefined||!$stateParams.id)?{area:area}:{id:$stateParams.id}).then(function (result) {
        $scope.toHires = result.data;
        $scope.searchData=result.data;
      });
      //
    }
    var initArea = '上海-徐汇区';//需要定位
    $scope.getData(initArea);
    system.bindNavTool({
      rightText: initArea,//默认地址
      navRightIonicClass: "ion-android-arrow-dropdown",
      toolClick: function () {
        $state.go('tab.discover-selectArea');
      }
    });
  })
  .controller('discoverToHireDetailed', function ($state, $scope, $stateParams, system, $ionicPopup, discoverServices) {
    //才聘详情
    discoverServices.getItemToHireDetailed($stateParams.id).then(function (result) {
      $scope.toHireDetailed = result.data;
    })
    $scope.acceptAnOfferOfEmployment = function () {
      discoverServices.acceptAnOfferOfEmployment().then(function () {
        $ionicPopup.alert({
          "title": "应聘成功",
          "okText": "确认"
        })
      }, function () {
        $ionicPopup.alert({
          "title": "提交失败",
          "okText": "确认"
        })
      });
    }
    system.bindNavTool({
      navRightIonicClass: "ion-share size-24",
      toolClick: function () {

      }
    });
  })
  .controller('discoverUserIfo', function ($scope, $ionicPopup, system, $state, $stateParams, discoverServices) {
    discoverServices.getIssuerUserIfo($stateParams.id).then(function (result) {
      $scope.userInfo = result.data;
      $scope.info={
        id:$scope.userInfo.userId
      }
    }, function () {
      $ionicPopup.alert({
        "title": "信息获取失败",
        "okText": "确认"
      })
    });
    $scope.addFriends=function(){
      $ionicPopup.show({
        title: '添加好友', // String. 弹窗的标题。
        scope: $scope,
        template: "<div class='promptText' style='display: block'><p style='border:1px solid #bfbfbf;border-radius: 5px;box-sizing:border-box;height: 24px;line-height: 24px;padding:0 5px;'>{{info.id}}</p><p style='border:1px solid #bfbfbf;border-radius: 5px;box-sizing: border-box;height: 48px;margin-top: 10px;padding: 5px;'><textarea ng-model='info.extraMessage' maxlength='20'  placeholder='请输入不超过20字的附加信息'  class='init'></textarea></p></div>",
        buttons: [
          {
            text: '添加好友',
            type: 'button-positive',
            onTap: function (e) {
              //请求发送后这个消息应该在系统消息上显示吧?
              var promise = discoverServices.addFriends($scope.info);
              if (promise) {
                promise.then(function (result) {
                  if (+result.data) {
                    $ionicPopup.alert({
                      title: '请求发送成功', // String. 弹窗的标题。
                      okText: '确认', // String (默认: 'OK')。OK按钮的文字。
                    });
                  } else {
                    $ionicPopup.alert({
                      title: '没有找到该用户', // String. 弹窗的标题。
                      subTitle: "请重新添加",
                      okText: '确认' // String (默认: 'OK')。OK按钮的文字。
                    });
                  }
                }, function () {
                  $ionicPopup.alert({
                    title: '请求发送失败', // String. 弹窗的标题。
                    okText: '确认' // String (默认: 'OK')。OK按钮的文字。
                  });
                });
              }
              $scope.info = {};
            }
          },
          {
            text: '取消',
            type: 'button-default',
            onTap: function (e) {
              $scope.info = {};
            }
          }
        ]
      });
    }
    system.bindNavTool({
      backClick: function () {
        setTimeout(function () {
          system.bindNavTool({
            navRightIonicClass: "ion-share size-24",
            toolClick: function () {

            }
          });
        }, 100)
      }
    });
  })
  .controller('discoverQuestionnaire', function ($scope,$stateParams,$rootScope, $ionicPopup, system, $state, discoverServices) {
    if($stateParams.id!==undefined){
      $rootScope.showNavBar=false;
    }
    var services = discoverServices;
    $scope.url = 'tab.discover-questionnaire';
    services.parev_$scope = $scope;
    $scope.tabClick = function (tab, index) {
      $scope.heardTabs.map(function (noe) {
        noe.hover = '';
      })
      tab.hover = 'hover';
      $scope.$parent.$parent.nowTab = tab;
      if ($scope.nowData)$scope.nowData.length = 0;
      if (tab.click)tab.click();
    }
    $scope.title = '发现';
    $scope.heardTabs = [];
    $scope.nowData = [];
    $scope.getData = function (area) {
      console.log('获取' + area);
      var promise = services.getInvestByType(($stateParams.id==undefined||!$stateParams.id)?{area:area}:{id:$stateParams.id});
      promise.then(function (result) {
        $scope.heardTabs = [];
        result.data.map(function (noe, index) {
          $scope.heardTabs.push({
            "type": noe.type,
            tmpUrl: "./templates/discover/discover-cateforyTab-investigate-tmp.html",
            click: function () {
              $scope.nowData = JSON.parse(JSON.stringify(noe.data));
            }
          });
        });
        $scope.tabClick($scope.heardTabs[0], 0);
      }, alertShow);
    }
    function alertShow() {
      $ionicPopup.show({
        title: '信息拉取失败',
        buttons: [
          {
            text: '重新拉取',
            onTap: function (e) {
              $scope.nowTab.click();
            }

          },
          {
            text: '取消',
            type: 'button-positive'
          },
        ]
      });
    }

    var initArea = '上海-徐汇区';//需要定位
    $scope.getData(initArea);
    system.bindNavTool({
      rightText: initArea,//默认地址
      navRightIonicClass: "ion-android-arrow-dropdown",
      toolClick: function () {
        $state.go('tab.discover-selectArea');
      }
    });
  })
  .controller('discoverQuestionnaireSurvey', function ($scope, $stateParams, discoverServices) {
    $scope.top = window.innerHeight - 90 - 46;
    discoverServices.getQuestionnaireSurvey($stateParams.id).then(function (result) {
      discoverServices.discoverQuestionnaireSurveyData = result.data;
      discoverServices.discoverQuestionnaireSurveyData.id=$stateParams.id;
      $scope.data = discoverServices.discoverQuestionnaireSurveyData;
    }, function () {
    });
  })
  .controller('discoverQuestion', function ($scope, discoverServices,$rootScope,$ionicPopup,system,$ionicNavBarDelegate,$state, $stateParams) {
    $scope.top = window.innerHeight - 90 - 32;
    $scope.sub = +$stateParams.sub;
    $scope.question = discoverServices.discoverQuestionnaireSurveyData.questions[$scope.sub];
    $scope.num=discoverServices.discoverQuestionnaireSurveyData.questions.length-1;
    var option=[];
    console.log($scope.question)
    if($scope.question.option instanceof  Array&&typeof $scope.question.option[0]=='string'){
      $scope.question.option.map(function(noe){
        option.push({
          'text':noe
        });
      });
      $scope.question.option=option;
      option[0].pitchOn=true;
    }
    if ($scope.question.type == '单选') {
      $scope.noClass = 'ion-ios-circle-filled';
      $scope.offClass = "ion-ios-circle-outline";
    }
    if ($scope.question.type == '多选') {
      $scope.noClass = 'ion-android-checkbox-outline-blank';
      $scope.offClass = "ion-android-checkbox-outline";
    }
    $scope.listClick = function (option_,index) {
      console.log($scope.question)
      if ($scope.question.type == '单选') {
        option.map(function(noe){
          noe.pitchOn=false;
        });
        option_.pitchOn=true;
      }
      if($scope.question.type == '多选'){
        option_.pitchOn=!option_.pitchOn;
      }
    }
    system.bindNavTool({
      backClick: function () {
        $state.go('tab.discover-questionnaireSurvey',{id:discoverServices.discoverQuestionnaireSurveyData.id});
        return true;
      }
    });
    $scope.submittedQuestionnaire=function() {
      console.log('提交');
      discoverServices.submittedQuestionnaire(discoverServices.discoverQuestionnaireSurveyData.id,option).then(function () {
        $ionicPopup.alert({
          "title": "提交成功",
          "okText": "确认"
        });
        $rootScope.backClick();
      }, function () {
        $ionicPopup.alert({
          "title": "提交失败",
          "okText": "确认"
        })
      })
    }
  })
  .controller('discoverInformation', function ($scope,$rootScope,$stateParams, $ionicPopup, system, $state, discoverServices) {
    if($stateParams.id!==undefined){
        $rootScope.showNavBar=false;
    }
    var services = discoverServices;
    $scope.url = 'tab.discover-activity';
    services.parev_$scope = $scope;
    $scope.tabClick = function (tab, index) {
      $scope.heardTabs.map(function (noe) {
        noe.hover = '';
      })
      tab.hover = 'hover';
      $scope.$parent.$parent.nowTab = tab;
      if ($scope.nowData)$scope.nowData.length = 0;
      if (tab.click)tab.click();
    }
    $scope.title = '信息';
    $scope.heardTabs = [];
    $scope.nowData = [];
    $scope.getData = function (area) {
      console.log('获取' + area);
      var promise = services.getInformationByType(($stateParams.id==undefined||!$stateParams.id)?{area:area}:{id:$stateParams.id});
      promise.then(function (result) {
        $scope.heardTabs = [];
        result.data.map(function (noe, index) {
          $scope.heardTabs.push({
            "type": noe.type,
            tmpUrl: "./templates/discover/discover-cateforyTab-information-tmp.html",
            click: function () {
              $scope.nowData = JSON.parse(JSON.stringify(noe.data));
            }
          });
        });
        $scope.tabClick($scope.heardTabs[0], 0);
      }, alertShow);
    }
    function alertShow() {
      $ionicPopup.show({
        title: '信息拉取失败',
        buttons: [
          {
            text: '重新拉取',
            onTap: function (e) {
              $scope.nowTab.click();
            }

          },
          {
            text: '取消',
            type: 'button-positive'
          },
        ]
      });
    }

    var initArea = '上海-徐汇区';//需要定位
    $scope.getData(initArea);
    system.bindNavTool({
      rightText: "上海",//默认地址
      navRightIonicClass: "ion-android-arrow-dropdown",
      toolClick: function () {
        $state.go('tab.discover-selectArea');
      }
    });
  })
  .controller('discoverInformationDetailed', function ($scope, $ionicPopup, system, $state,$stateParams, discoverServices,$ionicScrollDelegate) {
    discoverServices.getItemInformationDetailed($stateParams.id).then(function(result){
      $scope.data=result.data;
    },function(){})
    var inputComment=document.getElementById('inputComment');
    $scope.emojis=[];
    $scope.commentText='';
    $scope.commentShow=false;
    $scope.clickALike=function(){
      //点赞
      discoverServices.submitClickALike($stateParams.id).then(function(){
        $ionicPopup.alert({
          "title":"点赞成功",
          "okText":"确认"
        })
      });
    }
    $scope.$on('$ionicView.beforeEnter',function(){
      discoverServices.submitBrowse($stateParams.id);
    })

    $scope.comment=function(){
      //调出评价
      $scope.commentShow=!$scope.commentShow;
    }
    inputComment.onkeydown=function(event){
      if(event.keyCode==13){
        $scope.submitComment();
      }
    }
    RongIMLib.RongIMEmoji.emojis.map(function(noe,index){
      if((index+1)%20==0||!index){
        $scope.emojis[$scope.emojis.length]=[];
      }
      $scope.emojis[$scope.emojis.length-1].push(noe.outerText);
    });
    $scope.clickEmojis=function(noe){
      $scope.commentText+=noe;
    }
    $scope.submitComment=function(){
      discoverServices.submitComment($stateParams.id).then(function(){
        $ionicPopup.alert({
          "title":"评论成功",
          "okText":"确认"
        })
        if(!window.userInfo)window.userInfo={};
        $scope.data.commentInfo.push({
          text:$scope.commentText,
          name:window.userInfo.name,
          heardPhoto:window.userInfo.heardPhotoUrl,
          date:(new Date()).toLocaleString()
        });
      },function(){
        $ionicPopup.alert({
          "title":"评论失败",
          "okText":"确认"
        })
      });
    }
  })
  .controller('discoverMap', function ($scope, discoverServices, $stateParams) {
    $scope.id = $stateParams.id;
    discoverServices.discoverMap($scope, $scope.id);
  })
