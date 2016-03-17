angular.module('starter.userControllers', [])
  .controller('user', function ($scope, system, userServices,localStorageService,$state, $ionicPopup) {
    //Check wheather is a registrated user
    system.bindNavTool();
    $scope.myConcealToggle = function (config) {
      userServices.upUserConfig(config);
    }
    var promise = userServices.getUserBaseInfo();
    promise.then(function (result) {
      $scope.userInfo = result.data;
    });
    $scope.doLogOut= function ()
    {
      localStorageService.clear('id');
      $scope.user={};
      $state.go('login');
    };
  })
  .controller('userInfo', function ($scope, userServices, system, $ionicPopup) {
    //用户信息
    system.bindNavTool();
    $scope.yerds = [];
    for (var i = 1800; i < (new Date()).getFullYear(); i++) {
      $scope.yerds.push(i);
    }
    var promise = userServices.getAllUserInfo();
    promise.then(function (result) {
      window.userInfo_ = result.data;
      //进行一次拷贝
      $scope.userInfo = JSON.parse(JSON.stringify(window.userInfo_));
    });
    userServices.updateFunction = function (key, value) {
      var promise = userServices.updateUserInfo(key, value);
      if (promise) {
        promise.success(function () {
          $ionicPopup.show({
            title: '信息更新成功!', // String. 弹窗的标题。
            buttons: [
              {
                text: '确认',
                onTap: function (e) {

                }
              }
            ]
          });
        }).error(function () {
          $ionicPopup.show({
            title: '信息更新失败!', // String. 弹窗的标题。
            buttons: [
              {
                text: '再次尝试',
                type: 'button-positive',
                onTap: function (e) {
                  userServices.updateFunction(key, value);
                }
              },
              {
                text: '确认',
                onTap: function (e) {

                }
              }
            ]
          });
        });
      } else {
        $ionicPopup.show({
          title: '信息更新失败!', // String. 弹窗的标题。
          buttons: [
            {
              text: '再次尝试',
              type: 'button-positive',
              onTap: function (e) {
                userServices.updateFunction(key, value);
              }
            },
            {
              text: '确认',
              onTap: function (e) {

              }
            }
          ]
        });
      }
    };
    $scope.update = userServices.updateFunction;
    userServices.dataExchange = $scope;//数据交互
  })
  .controller('userSelectArea', function ($scope, publishToHireServices, userServices, system, $rootScope) {
    //用户-选择地区
    $scope.selectData = [];
    $scope.config = publishToHireServices.selectTmpServices.config['area'];
    $scope.maxSurplus = 1;
    system.bindNavTool(
      {
        "rightText": "保存",
        "toolClick": function () {
          userServices.dataExchange.userInfo.area = $scope.selectData[0].city + " - " + $scope.selectData[0].county;
          userServices.updateFunction('area', userServices.dataExchange.userInfo.area);
          $rootScope.backClick();
        }
      }
    );

  })
  .controller('userTradeSelectType', function ($scope, system, userServices, $rootScope) {
    //当前行业
    $scope.title = "当前行业";
    $scope.selectTypeText = "选择行业";
    $scope.selectData = [];
    $scope.typeDatas = [];
    var promise = userServices.getTrade();
    promise.then(function (result) {
      $scope.typeDatas = result.data;
    })
    system.bindNavTool(
      {
        "rightText": "保存",
        "toolClick": function () {
          userServices.dataExchange.userInfo.currentTrade = $scope.selectData.join(',');
          userServices.updateFunction('currentTrade', userServices.dataExchange.userInfo.currentTrade);
          $rootScope.backClick();
        }
      }
    );
  })
  .controller('userOccupationSelectType', function ($scope, system, userServices, $rootScope) {
    //当前职能
    $scope.title = "当前职能";
    $scope.selectTypeText = "选择职能";
    $scope.selectData = [];
    $scope.typeDatas = [];
    var promise = userServices.getOccupation();
    promise.then(function (result) {
      $scope.typeDatas = result.data;
    })
    system.bindNavTool(
      {
        "rightText": "保存",
        "toolClick": function () {
          userServices.dataExchange.userInfo.currentFunction = $scope.selectData.join(',');
          userServices.updateFunction('currentFunction', userServices.dataExchange.userInfo.currentFunction);
          $rootScope.backClick();
        }
      }
    );
  })
  .controller('userBeGoodAtSelectType', function ($scope, system, userServices, $rootScope) {
    //擅长技能 goodSkill
    $scope.title = "擅长技能";
    $scope.selectTypeText = "选择技能";
    $scope.selectData = [];
    $scope.typeDatas = [];
    var promise = userServices.getBeGoodAt();
    promise.then(function (result) {
      $scope.typeDatas = result.data;
    })
    system.bindNavTool(
      {
        "rightText": "保存",
        "toolClick": function () {
          userServices.dataExchange.userInfo.goodSkill = $scope.selectData.join(',');
          userServices.updateFunction('goodSkill', userServices.dataExchange.userInfo.goodSkill);
          $rootScope.backClick();
        }
      }
    );
  })
  .controller('userInterestSelectType', function ($scope, system, userServices, $rootScope) {
    //兴趣爱好
    $scope.title = "兴趣爱好";
    $scope.selectTypeText = "选择兴趣";
    $scope.selectData = [];
    $scope.typeDatas = [];
    var promise = userServices.getInterest();
    promise.then(function (result) {
      $scope.typeDatas = result.data;
    })
    system.bindNavTool(
      {
        "rightText": "保存",
        "toolClick": function () {
          userServices.dataExchange.userInfo.hobbiesAndInterests = $scope.selectData.join(',');
          userServices.updateFunction('hobbiesAndInterests', userServices.dataExchange.userInfo.hobbiesAndInterests);
          $rootScope.backClick();
        }
      }
    );
  })
  .controller('userLanguageSelectType', function ($scope, system, userServices, $rootScope) {
    //语言能力
    $scope.title = "语言能力";
    $scope.selectTypeText = "选择语言";
    $scope.selectData = [];
    $scope.typeDatas = [];
    var promise = userServices.getLanguage();
    promise.then(function (result) {
      $scope.typeDatas = result.data;
    })
    system.bindNavTool(
      {
        "rightText": "保存",
        "toolClick": function () {
          userServices.dataExchange.userInfo.linguisticCapacit = $scope.selectData.join(',');
          userServices.updateFunction('linguisticCapacit', userServices.dataExchange.userInfo.linguisticCapacit);
          $rootScope.backClick();
        }
      }
    );
  })
  .controller('userWorkExperience', function ($scope, userServices,$stateParams, system, $rootScope) {
    //工作经历
    var sub=$stateParams.sub;
    var data;
    if(sub=='new'){
      //新创建
      data={};
    }else {
      data = userServices.dataExchange.userInfo.workExperience[sub];
    }
    $scope.workExperience = JSON.parse(JSON.stringify(data));//拷贝一份
    system.bindNavTool(
      {
        "rightText": "保存",
        "toolClick": function () {
          if(sub=='new'){
            userServices.dataExchange.userInfo.workExperience.push( $scope.workExperience );
          }else {
            userServices.dataExchange.userInfo.workExperience[sub] = $scope.workExperience;
          }
          userServices.updateFunction('workExperience', $scope.workExperience,sub);
          $rootScope.backClick();
        }
      }
    );
  })
  .controller('userProjectExperience', function ($scope, userServices,$stateParams, system, $rootScope) {
    //项目经验
    var sub=$stateParams.sub;
    var data;
    if(sub=='new'){
      //新创建
      data={};
    }else {
      data = userServices.dataExchange.userInfo.projectExperience[sub];
    }
    $scope.projectExperience = JSON.parse(JSON.stringify(data));//拷贝一份
    system.bindNavTool(
      {
        "rightText": "保存",
        "toolClick": function () {
          if(sub=='new'){
            userServices.dataExchange.userInfo.projectExperience.push($scope.projectExperience);
          }else {
            userServices.dataExchange.userInfo.projectExperience[sub] = $scope.projectExperience;
          }
          userServices.updateFunction('projectExperience', $scope.projectExperience,sub);
          $rootScope.backClick();
        }
      }
    );
  })
  .controller('userEducationalBackground', function ($scope, userServices,$stateParams, system, $rootScope) {
    //教育背景
    var sub=$stateParams.sub;
    var data;
    if(sub=='new'){
      //新创建
      data={};
    }else {
      data = userServices.dataExchange.userInfo.educationalBackground[sub];
    }
    $scope.educationalBackground = JSON.parse(JSON.stringify(data));//拷贝一份
    system.bindNavTool(
      {
        "rightText": "保存",
        "toolClick": function () {
          if(sub=='new'){
            userServices.dataExchange.userInfo.educationalBackground.push($scope.educationalBackground);
          }else {
            userServices.dataExchange.userInfo.educationalBackground[sub] = $scope.educationalBackground;
          }
          userServices.updateFunction('educationalBackground', $scope.educationalBackground,sub);
          $rootScope.backClick();
        }
      }
    );
  })
  .controller('userAddressList', function ($scope, userServices, system, $ionicPopup, $rootScope,$timeout) {
    //通讯录
    $scope.info = {};
    $scope.userFriends = {};
    system.bindNavTool({
      navRightIonicClass: "icon ion-person-add",
      toolClick: function () {
        $ionicPopup.show({
          title: '添加好友', // String. 弹窗的标题。
          scope: $scope,
          template: "<div class='promptText' style='display: block'><p style='border:1px solid #bfbfbf;border-radius: 5px;box-sizing:border-box;height: 24px;line-height: 24px;padding:0 5px;'><input class='init' ng-model='info.id' placeholder='请输入账号和昵称' style='height: 24px'></p><p style='border:1px solid #bfbfbf;border-radius: 5px;box-sizing: border-box;height: 48px;margin-top: 10px;padding: 5px;'><textarea ng-model='info.extraMessage' maxlength='20'  placeholder='请输入不超过20字的附加信息'  class='init'></textarea></p></div>",
          buttons: [
            {
              text: '添加好友',
              type: 'button-positive',
              onTap: function (e) {
                //请求发送后这个消息应该在系统消息上显示吧?
                var promise = userServices.addFriends($scope.info);
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
    });
    var promise = userServices.getFriends();
    promise.then(function (result) {
      $scope.userFriends = result.data;
    }, function () {
    });
    $scope.searchKeyDown = function () {
      $timeout(function(){
        var list;
        for (var key in $scope.userFriends) {
          list = $scope.userFriends[key];
          list.map(function (noe) {
            var r = (new RegExp($scope.searchText, 'ig'));
            if (!(r.test(noe.nickname) || r.test(noe.userId))) {
              noe.hide = true;
            } else {
              noe.hide = false;
            }
            if (!$scope.searchText) {
              noe.hide = false;
            }
          });
        }
      },20);
    }
    $scope.deleteFriend = function (user) {
      var promise = userServices.deleteFriend(user.userId);
      promise.then(function () {
        $ionicPopup.alert({
          "title": "删除成功",
          okText: "确认"
        });
        var list;
        for (var key in $scope.userFriends) {
          list = $scope.userFriends[key];
          list.splice(list.indexOf(user), 1);
        }
      }, function () {
        $ionicPopup.alert({
          "title": "删除失败",
          okText: "确认"
        });
      });
    }
  })
  .controller('userPartake', function ($scope, userServices, $ionicPopup) {
    //我参与的
    var services = userServices.partake;
    $scope.title = '我参与的';
    $scope.nowData = [];
    function alertShow() {
      $ionicPopup.show({
        title: '信息拉取失败',
        buttons: [
          {
            text: '重新拉取',
            type: 'button-positive',
            onTap: function (e) {
              $scope.nowTab.click();
            }
          },
          {
            text: '取消',
          },
        ]
      });
    }

    $scope.heardTabs = [
      {
        'type': '活动',
        tmpUrl: "./templates/user/user-cateforyTab-activity-tmp.html",
        click: function () {
          var promise = services.getActivity();
          promise.then(function (result) {
            $scope.nowData = result.data;
          }, alertShow)
        }
      },
      {
        'type': '才聘',
        tmpUrl: "./templates/user/user-cateforyTab-toHire-tmp.html",
        click: function () {
          var promise = services.getToHire();
          promise.then(function (result) {
            $scope.nowData = result.data;
          }, alertShow)
        }
      },
      {
        'type': '调查',
        tmpUrl: "./templates/user/user-cateforyTab-investigate-tmp.html",
        click: function () {
          var promise = services.getInvestigate();
          promise.then(function (result) {
            $scope.nowData = result.data;
          }, alertShow)
        }
      },
      {
        'type': '信息',
        tmpUrl: "./templates/user/user-cateforyTab-information-tmp.html",
        click: function () {
          var promise = services.getInformation();
          promise.then(function (result) {
            $scope.nowData = result.data;
          }, alertShow)
        }
      }
    ];
  })
  .controller('userPublish', function ($scope, userServices, $ionicPopup) {
    //我参与的
    var services = userServices.publish;
    $scope.title = '我发布的';
    $scope.nowData = [];
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

    $scope.heardTabs = [
      {
        'type': '活动',
        tmpUrl: "./templates/discover/discover-cateforyTab-activity-tmp.html",
        click: function () {
          //var promise = services.getActivity();
          //promise.then(function (result) {
          //  $scope.nowData = result.data;
          //}, alertShow)
        }
      }
    ];
  })
  .controller('userCircle', function ($scope, userServices,$timeout) {
    $scope.circles = [];
    $scope.promise=userServices.getCircle("myCircle");
    $scope.title='我的圈子';
    $scope.promise.then(function(result){
      $scope.circles=result.data;
      $scope.searchData=result.data;

    });
  })
  .controller('userCoupleBack', function ($rootScope, $scope, userServices, system, $ionicPopup) {
    system.bindNavTool({
      "rightText": "保存",
      toolClick: function () {
        if(isNaN(+$scope.phone)&&$scope.phone.length!=11){
          $ionicPopup.alert({
            title:"手机号码格式错误!"
          });
          return false;
        }
        userServices.userCoupleBackSubmit({
          phone: $scope.phone,
          text: $scope.text
        });
        $rootScope.backClick();
      }
    });
  })
