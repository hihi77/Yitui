angular.module('starter.publishInformationControllers', [])//information
    .controller('information', function ($state,$scope, $rootScope, publishInformationServices, system,$stateParams, $ionicPopup) {
        function getInfo() {
            var promise = publishInformationServices.getInfo();
            if (promise) {
                promise
                    .success(function (data) {
                        $rootScope.informationEphemeralData = data instanceof  Object ? data : {};
                        $scope.data=$rootScope.informationEphemeralData['信息详情'];
                    })
                    .error(function (data) {
                        $ionicPopup.show({
                            title: "草稿数据获取错误",
                            buttons: [
                                {
                                    text: "确认",
                                    type: "button-default",
                                },
                                {
                                    text: "重新获取",
                                    type: "button-positive",
                                    onTap: getInfo
                                }
                            ]
                        });
                        $rootScope.informationEphemeralData = {};
                        $scope.data = {};
                        $rootScope.informationEphemeralData['信息详情'] = $scope.data;
                    });
            } else {
                $rootScope.informationEphemeralData = {};
                $scope.data = {};
                $rootScope.informationEphemeralData['信息详情'] = $scope.data;
            }
        }

        //getInfo();
        $scope.data = $rootScope.informationEphemeralData = publishInformationServices.template;
        $rootScope.informationSaveInfo = function () {
            setTimeout(function () {
                system.bindNavTool({
                    rightText: "保存草稿",
                    toolClick: function () {
                        var promise = publishInformationServices.saveInfo($rootScope.informationEphemeralData,$stateParams.source);
                        if (promise) {
                            promise.success(function () {
                                $ionicPopup.show({
                                    title: "信息保存成功",
                                    buttons: [
                                        {
                                            text: "确认",
                                            type: "button-positive"
                                        }
                                    ]
                                });
                            }).error(function () {
                                $ionicPopup.show({
                                    title: "信息保存失败",
                                    buttons: [
                                        {
                                            text: "确认",
                                            type: "button-positive"
                                        }
                                    ]
                                });
                            });
                        } else {
                            $ionicPopup.show({
                                title: "信息保存未保存",
                                buttons: [
                                    {
                                        text: "确认",
                                        type: "button-positive"
                                    }
                                ]
                            });
                        }
                    }
                });
            }, 50)
        }
        $rootScope.informationSaveInfo();
        $scope.publishEvent = function () {
            var template = '';
            var showLayer = false;
            if (!$rootScope.informationEphemeralData['选择类型']) {
                template += "没有选择信息类型！<br>";
                showLayer = true;
            }
            if (!$rootScope.informationEphemeralData['信息标题']) {
                template += "没有填写信息标题！<br>";
                showLayer = true;
            }
            if (!$rootScope.informationEphemeralData['信息详情'].text) {
                template += "没有填写信息详情！<br>";
                showLayer = true;
            }
            if (!$rootScope.informationEphemeralData['信息联系人']) {
                template += "没有填写信息联系人！<br>";
                showLayer = true;
            }
            if (!$rootScope.informationEphemeralData['联系方式']) {
                template += "没有填写联系方式！<br>";
                showLayer = true;
            }
            if (!$rootScope.informationEphemeralData['信息截止时间']) {
                template += "没有选择信息截止时间！<br>";
                showLayer = true;
            }
            if (showLayer) {
                $ionicPopup.show({
                    title: "页面信息缺省",
                    template: template,
                    buttons: [
                        {
                            text: "确认",
                            type: "button-positive"
                        }
                    ]
                });
                return;
            }
          if($state.current.name=='chat-publish-information'){
            //聊天界面信息发布
          }else {
            var promise = publishInformationServices.publishInfo($rootScope.activityEphemeralData);
          }
            if (promise) {
                if (promise) {
                    promise.success(function () {
                        $ionicPopup.show({
                            title: "信息保存成功",
                            buttons: [
                                {
                                    text: "确认",
                                    type: "button-positive"
                                }
                            ]
                        });
                        $state.go('tab.publish-saveInfoOk', {title: "保存成功"});
                    }).error(function () {
                        $ionicPopup.show({
                            title: "信息保存失败",
                            buttons: [
                                {
                                    text: "确认",
                                    type: "button-positive"
                                }
                            ]
                        });
                    });
                } else {
                    $ionicPopup.show({
                        title: "信息保存未保存",
                        buttons: [
                            {
                                text: "确认",
                                type: "button-positive"
                            }
                        ]
                    });
                }
            }
            console.log($rootScope.informationEphemeralData);
        }
    })
    .
    controller('informationSelectType', function ($scope, $rootScope, $ionicHistory, publishInformationServices, system) {
        $scope.title = '选择类型';
        $scope.selectTypeText = '选择类型';
        $scope.selectData = [];
        $scope.elementShow = {};
        var promise = publishInformationServices.informationSelectType.getData();
        promise.success(function (data) {
            $scope.typeDatas = data;
        });
        var name = '选择类型';
        system.bindNavTool({
            rightText: "保存",
            toolClick: function () {
                $rootScope.informationEphemeralData[name] = $scope.selectData.join(',');
                $rootScope.backClick();
                $rootScope.informationSaveInfo();
            }
        });
    })
