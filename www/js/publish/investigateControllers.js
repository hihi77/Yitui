angular.module('starter.publishInvestigateControllers', [])
    .controller('investigate', function ($scope, $rootScope, publishInvestigateServices, $state, system, $ionicPopup) {
        $scope.PHR = publishInvestigateServices.deathData['问卷份数'];
        $scope.authoritys = publishInvestigateServices.deathData['查看权限'];
        function initScope() {
            $scope.data = {
                "placeholder": "亲爱的朋友：您好！随着人们生活水平的提高，外出" +
                "旅游已经成为一种新的时尚和休闲方式。为了全面了" +
                "解人们旅游的方式、地点、经费等问题，我们组织了" +
                "这次调查活动。希望得到您的支持和帮助。本次调查" +
                "严格按照《统计法》的要求进行，不用填写姓名，所" +
                "有回答只用于统计分析，各种答案没有正确、错误之" +
                "分。请您在百忙之中抽出一点时间填写这份调查表。" +
                "您的回答将代表众多和您一样的朋友，并将对提高旅" +
                "游质量、服务水平提供帮助。我们将会对您的信息进" +
                "行必要保护！请在在题目后的括号里填写您的答案。" +
                "衷心感谢您的支持和协助！祝您生活愉快。"
            };//上传图片
            $rootScope.investigateEphemeralData = {};
            $rootScope.investigateEphemeralData['问题'] = [];
            $rootScope.investigateEphemeralData['问卷描述'] = $scope.data;
        }

        function getInfo() {
            var promise = publishInvestigateServices.getInfo();
            if (promise) {
                promise
                    .success(function (data) {
                        $rootScope.investigateEphemeralData = data instanceof  Object ? data : {};
                        $scope.data = $rootScope.investigateEphemeralData['问卷描述'];
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
                        initScope();
                    });
            } else {
                initScope();
            }
        }
        getInfo();
        $rootScope.investigateSaveInfo = function () {
            setTimeout(function () {
                system.bindNavTool({
                    rightText: "保存草稿",
                    toolClick: function () {
                        var promise = publishInvestigateServices.saveInfo($rootScope.investigateEphemeralData);
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
        $rootScope.investigateSaveInfo();
    })
    .controller('investigateSelectType', function ($scope, $rootScope, publishInvestigateServices, system) {
        $scope.title = '选择调查类型';
        $scope.selectTypeText = '选择类型';
        $scope.selectData = [];
        $scope.elementShow = {};
        var promise = publishInvestigateServices.investigateSelectType.getData();
        promise.success(function (data) {
            $scope.typeDatas = data;
        });
        var name='选择类型';
        system.bindNavTool({
            rightText: "保存",
            toolClick: function () {
                $rootScope.investigateEphemeralData[name]=$scope.selectData.join(',');
                $rootScope.backClick();
                $rootScope.investigateSaveInfo();
            }
        });
    })
    .controller('investigateSubject', function ($scope, $rootScope, publishInvestigateServices, $ionicHistory, $stateParams, $state, $ionicPopup, system) {
        $scope.sub = +$stateParams.sub;
        $scope.top = window.innerHeight - 180 + 27;
        var q = $rootScope.investigateEphemeralData['问题'];
        $scope.nowData = q[$scope.sub];
        if (!$scope.nowData) {
            $scope.nowData = {
                "type": "单选",
                "question": "",
                "option": []
            };
        } else {
            $scope.seekOut = true;
        }
        $scope.ck = function () {
            if (!$scope.nowData.question && $scope.nowData.type != '问答') {
                $ionicPopup.alert({
                    title: '你没有填写问题！',
                    template: '请重新输入'
                });
                return false;
            }
            if ($scope.nowData.option.length < 2 && $scope.nowData.type != '问答') {
                $ionicPopup.alert({
                    title: '你的选项小于两个！',
                    template: '请重新输入'
                });
                return false;
            }
            if ($scope.nowData.type == '问答' && !$scope.nowData.text) {
                $ionicPopup.alert({
                    title: '你没有填写任何文本！',
                    template: '请重新输入'
                });
                return false;
            }
            return true;
        }
        $scope.saveQuestion = function () {
            var template = '';
            var showLayer = false;
            console.log($rootScope.investigateEphemeralData);
            /*
            * 判断
            * */
            if(!$rootScope.investigateEphemeralData['选择类型']){
                template+="你没有选择调查类型！<br>";
                showLayer = true;
            }
            if(!$rootScope.investigateEphemeralData['标题']){
                template+="你没有输入标题！<br>";
                showLayer = true;
            }
            if(!$rootScope.investigateEphemeralData['截止日期']){
                template+="你没有输入截止日期！<br>";
                showLayer = true;
            }
            if(!$rootScope.investigateEphemeralData['问卷份数']){
                template+="你没有选择问卷份数！<br>";
                showLayer = true;
            }
            if(!$rootScope.investigateEphemeralData['问卷赏金']){
                template+="你没有填写问卷赏金！<br>";
                showLayer = true;
            }
            if(!$rootScope.investigateEphemeralData['问卷描述'].text){
                template+="你没有填写问卷描述！<br>";
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

            console.log($rootScope.investigateEphemeralData);
            var promise = publishInvestigateServices.publishInfo($rootScope.investigateEphemeralData);
            
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
            console.log($rootScope.investigateEphemeralData);
        }
        $scope.nextQuestion = function () {
            if (!$scope.ck()) {
                return false;
            }
            if (!$scope.seekOut)q.push($scope.nowData);
            $state.go('tab.investigate-subject', {sub: $scope.sub + 1});
        }
        $scope.addOption = function () {
            if ($scope.nowOptionText == '') {
                $ionicPopup.alert({
                    title: '您没有输入任何内容！',
                    template: '请重新输入'
                });
                $scope.nowOptionText = '';
                return false;
            }
            if ($scope.nowData.option.indexOf($scope.nowOptionText || "") != -1) {
                $ionicPopup.alert({
                    title: '已经有了此选项！',
                    template: '请重新输入'
                });
                $scope.nowOptionText = '';
                return false;
            }
            $scope.nowData.option.push($scope.nowOptionText);
            $scope.nowOptionText = '';
        }
        $scope.removeOption = function (text) {
            var a = $scope.nowData.option;
            a.splice(a.indexOf(text), 1);
        }
        system.bindNavTool({
            rightText: "保存",
            toolClick: function () {
                if (!$scope.ck()) {
                    return false;
                }
                if (!$scope.seekOut)q.push($scope.nowData);
                $state.go('tab.investigate');
                $rootScope.investigateSaveInfo();
            }
        });
    })