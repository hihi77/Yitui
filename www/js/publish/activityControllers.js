angular.module('starter.publishActivityControllers',[])
    .controller('activity',function($state,$scope,$rootScope,publishActivityServices,system,$ionicPopup){
        function initScope(){
            $rootScope.activityEphemeralData={};
            $scope.data={};
            $rootScope.activityEphemeralData['活动详情']=$scope.data;
        }
        function getInfo(){
            var promise=publishActivityServices.getInfo();
            if(promise){
                promise
                    .success(function(data){
                        $rootScope.activityEphemeralData=data instanceof  Object?data:{};
                        $scope.data=$rootScope.activityEphemeralData['活动详情'];
                    })
                    .error(function(data){
                        $ionicPopup.show({
                            title:"草稿数据获取错误",
                            buttons:[
                                {
                                    text:"确认",
                                    type:"button-default",
                                    onTap:function(){
                                    }
                                },
                                {
                                    text:"重新获取",
                                    type:"button-positive",
                                    onTap:getInfo
                                }
                            ]
                        });
                        initScope();
                    });
            }else{
                initScope();
            }
        }
        getInfo();
        var promise=publishActivityServices.activityKind.getActivityKind();
        if(promise){
            promise.success(function(data){
                $scope.activityKind=data;
                $scope.nowSelectData=$scope.activityKind[0];
            });
        }else{
            $scope.activityKind=['1','2'];
            $scope.nowSelectData=$scope.activityKind[0];
        }
        $rootScope.activitySaveInfo=function(){
            setTimeout(function(){
                system.bindNavTool({
                    rightText:"保存草稿",
                    toolClick:function () {
                        var promise=publishActivityServices.saveInfo($rootScope.activityEphemeralData);
                        if(promise) {
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
                        }else{
                            $ionicPopup.show({
                                title:"信息保存未保存",
                                buttons:[
                                    {
                                        text:"确认",
                                        type:"button-positive"
                                    }
                                ]
                            });
                        }
                    }
                });
            },50)
        };

        $rootScope.activitySaveInfo();
        $scope.publishEvent=function(){
            //验证
            var template='';
            var showLayer=false;
            if(!$rootScope.activityEphemeralData['选择类型']){
                template+="活动类型未选择<br>";
                showLayer=true;
            }
            if(!$rootScope.activityEphemeralData['活动主题']){
                template+="活动主题未填写！<br>";
                showLayer=true;
            }
            if(!$rootScope.activityEphemeralData['报名截止时间']){
                template+="报名截止时间未选择！<br>";
                showLayer=true;
            }
            if(!$rootScope.activityEphemeralData['活动开始时间']){
                template+="活动开始时间未选择！<br>";
                showLayer=true;
            }
            if(!$rootScope.activityEphemeralData['活动结束时间']){
                template+="活动结束时间未选择！<br>";
                showLayer=true;
            }
            if(!($rootScope.activityEphemeralData['线上活动地址']||($rootScope.activityEphemeralData['线下活动'] instanceof Boolean))){
                template+="活动方式未选择！<br>";
                showLayer=true;
            }
            if(isNaN(+$rootScope.activityEphemeralData['活动人数上限'])){
                template+="活动人数上限输入有误或未输入！<br>";
                showLayer=true;
            }
            if(!isNaN(+$rootScope.activityEphemeralData['活动费用'])){
                template+="活动费用输入有误或未输入！<br>";
                showLayer=true;
            }
            if(!$rootScope.activityEphemeralData['活动性质']){
                template+="活动性质未选择！<br>";
                showLayer=true;
            }
            if(!($rootScope.activityEphemeralData['报名附加信息']&&$rootScope.activityEphemeralData['报名附加信息'].length>0)){
                template+="报名附加信息未选择！<br>";
                showLayer=true;
            }
            if(!($rootScope.activityEphemeralData['活动满意度评价']&&$rootScope.activityEphemeralData['活动满意度评价'].length>0)){
                template+="活动满意度评价未选择！<br>";
                showLayer=true;
            }
            if(!($rootScope.activityEphemeralData['授课满意度']&&$rootScope.activityEphemeralData['授课满意度'].length>0)){
                template+="授课满意度未选择！<br>";
                showLayer=true;
            }
            if(!$rootScope.activityEphemeralData['活动详情'].text){
                template+="活动详情未填写！<br>";
                showLayer=true;
            }

            if(showLayer){
                
                $ionicPopup.show({
                    title:"页面信息缺省",
                    template:template,
                    buttons:[
                        {
                            text:"确认",
                            type:"button-positive"
                        }
                    ]
                });
                return;
            }
            var promise = publishActivityServices.publishInfo($rootScope.activityEphemeralData);
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
                        $state.go('tab.publish-saveInfoOk',{title:"保存成功"});
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

            console.log($rootScope.activityEphemeralData);
        }

    })
    .controller('activitySelectType',function($scope,$rootScope,$ionicHistory,publishActivityServices,system){
        $scope.title='选择活动类型';
        $scope.selectTypeText='选择类型';
        $scope.selectData=[];
        $scope.elementShow={};
        var promise=publishActivityServices.activitySelectType.getData();
        promise.success(function(data){
            $scope.typeDatas=data;
        });
        var name='选择类型';
        system.bindNavTool({
            rightText:"保存",
            toolClick:function () {
                $rootScope.activityEphemeralData[name]=$scope.selectData.join(',');
                $rootScope.backClick();
                $rootScope.activitySaveInfo();
            }
        });
    })
    .controller('activityAdditionalRegistration',function($scope,$rootScope,system){
        $scope.title='报名附加信息';
        $scope.heardTitle='设置报名附加信息';
        if($rootScope.activityEphemeralData['报名附加信息']){
            $scope.lists=$rootScope.activityEphemeralData['报名附加信息'];
        }else{
            $scope.lists=[
                {
                    "icon":'ion-android-person',
                    "text":'姓名'
                },
                {
                    "icon":"ion-android-phone-portrait",
                    "text":"手机"
                },
                {
                    "icon":"ion-android-happy",
                    "text":"公司"
                },
                {
                    "icon":"ion-android-happy",
                    "text":"邮箱"
                }
            ];
        }
        var name='报名附加信息';
        system.bindNavTool({
            rightText:"保存",
            toolClick:function () {
                $rootScope.activityEphemeralData[name]=$scope.lists;
                $rootScope.backClick();
                $rootScope.activitySaveInfo();
            }
        });
    })
    .controller('activityTeachingSatisfaction',function($scope,$rootScope,system){
        $scope.title='授课满意度评价';
        $scope.heardTitle='授课老师满意度评价';
        if($rootScope.activityEphemeralData['授课满意度']){
            $scope.lists=$rootScope.activityEphemeralData['授课满意度'];
        }else{
            $scope.lists=[
                {
                    "icon":"ion-android-happy",
                    "text":"理论底蕴"
                },
                {
                    "icon":"ion-android-happy",
                    "text":"专业能力"
                },
                {
                    "icon":"ion-android-happy",
                    "text":"实操能力"
                },
                {
                    "icon":"ion-android-happy",
                    "text":"表达能力"
                },
                {
                    "icon":"ion-android-happy",
                    "text":"授课效果"
                }
            ];
        }
        var name='授课满意度';
        system.bindNavTool({
            rightText:"保存",
            toolClick:function () {
                $rootScope.activityEphemeralData[name]=$scope.lists;
                $rootScope.backClick();
                $rootScope.activitySaveInfo();
            }
        });
    })
    .controller('activitySatisfaction',function($scope,$rootScope,system){
        $scope.title='活动满意度评价';
        $scope.heardTitle='本次活动满意度评价';
        if($rootScope.activityEphemeralData['活动满意度评价']){
            $scope.lists=$rootScope.activityEphemeralData['活动满意度评价'];
        }else{
            $scope.lists=[
                {
                    "icon":"ion-android-happy",
                    "text":"时间安排"
                },
                {
                    "icon":"ion-android-happy",
                    "text":"地点安排"
                },
                {
                    "icon":"ion-android-happy",
                    "text":"主题安排"
                },
                {
                    "icon":"ion-android-happy",
                    "text":"活动内容"
                },
                {
                    "icon":"ion-android-happy",
                    "text":"活动组织"
                },
                {
                    "icon":"ion-android-happy",
                    "text":"活动效果"
                },
                {
                    "icon":"ion-android-happy",
                    "text":"总体评价"
                }
            ];
        }
        var name='活动满意度评价';
        system.bindNavTool({
            rightText:"保存",
            toolClick:function () {
                $rootScope.activityEphemeralData[name]=$scope.lists;
                $rootScope.backClick();
                $rootScope.activitySaveInfo();
            }
        });
    })
    .controller('activitySaveInfoOk',function($scope){

    })


    
