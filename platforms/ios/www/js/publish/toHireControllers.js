var app = angular.module('starter.publishToHireControllers', []);
app
    .controller('toHire', function ($scope, $state, $rootScope,publishToHireServices,$stateParams,system,$ionicPopup) {
        function getInfo(){
            var promise=publishToHireServices.getInfo();
            if(promise){
                promise
                    .success(function(data){
                        $rootScope.ephemeralData=data instanceof  Object?data:{};
                    })
                    .error(function(data){
                        $ionicPopup.show({
                            title:"草稿数据获取错误",
                            buttons:[
                                {
                                    text:"确认",
                                    type:"button-default",
                                    onTap:function(){
                                        $rootScope.ephemeralData={};
                                    }
                                },
                                {
                                    text:"重新获取",
                                    type:"button-positive",
                                    onTap:getInfo
                                }
                            ]
                        });
                        $rootScope.ephemeralData={};
                    });
            }else{
                $rootScope.ephemeralData={};
            }
        }
        //getInfo();
        $rootScope.ephemeralData = publishToHireServices.template;
        console.log('toHire');
        $rootScope.toHireSaveInfo=function(){
            setTimeout(function() {
                system.bindNavTool({
                    rightText: "保存草稿",
                    toolClick: function () {
                        var promise = publishToHireServices.saveInfo($rootScope.ephemeralData,$stateParams.source);
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
            },50)
        }
        $rootScope.toHireSaveInfo();
        $scope.publishEvent=function(){
            var template='';
            var showLayer=false;
            if(!$rootScope.ephemeralData['公司名称']){
                template+="公司名称未输入<br>";
                showLayer=true;
            }
            if(!$rootScope.ephemeralData['地区']){
                template+="地区未选择<br>";
                showLayer=true;
            }
            if(!$rootScope.ephemeralData['行业']){
                template+="行业未选择<br>";
                showLayer=true;
            }
            if(!$rootScope.ephemeralData['职能']){
                template+="职能未选择<br>";
                showLayer=true;
            }
            if(!$rootScope.ephemeralData['年薪']){
                template+="年薪未选择<br>";
                showLayer=true;
            }
            if(!$rootScope.ephemeralData['岗位描述']){
                template+="岗位描述无内容<br>";
                showLayer=true;
            }
            if(!$rootScope.ephemeralData['岗位要求']){
                template+="岗位要求无内容<br>";
                showLayer=true;
            }
            if(!$rootScope.ephemeralData['岗位特点']){
                template+="岗位特点未选择<br>";
                showLayer=true;
            }
            if(!$rootScope.ephemeralData['岗位性质']){
                template+="岗位性质无内容<br>";
                showLayer=true;
            }
            function isEmail(str){
                var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                return reg.test(str);
            }
            if(!isEmail($rootScope.ephemeralData['公司邮箱'])){
                template+="公司邮箱格式错误<br>";
                showLayer=true;
            }
            if(!($rootScope.ephemeralData['公司地址'])){
                template+="公司地址未输入<br>";
                showLayer=true;
            }
            if(isNaN(+$rootScope.ephemeralData['推荐奖励'])){
                template+="推荐奖励未填写<br>";
                showLayer=true;
            }
            if(isNaN(+$rootScope.ephemeralData['推荐成功奖励'])){
                template+="推荐成功奖励未填写<br>";
                showLayer=true;
            }
            if(!$rootScope.ephemeralData['选择日期']){
                template+="日期未选择<br>";
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
            if($state.current.name=='chat-publish-toHire'){
              //聊天界面才聘发布
            }else {
              var promise = publishToHireServices.publishInfo($rootScope.activityEphemeralData);
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
            console.log($rootScope.ephemeralData);
        }
    })
    .controller('jobDescription', function ($scope,$state, $rootScope,$stateParams,$ionicHistory,publishToHireServices,system) {
        console.log('jobDescription');
        var type=$state.$current.name+'-'+$stateParams.type;
        $scope.type=type;
        $scope.config=publishToHireServices.jobDescription.config[$stateParams.type];
        var textDom=document.getElementById('text');
        var textarea = angular.element(textDom);
        textDom.onkeydown=function(event){
            var val=textarea.val();
            $scope.maxTextLength = 500 - val.length;
            if($scope.maxTextLength<=0&&event.keyCode!=8){
                return false;
            }else{
                return true;
            }
        };
        $scope.keydownEvent = function () {
        }
        var name=$scope.config.title;
        system.bindNavTool({
            rightText:"保存",
            toolClick:function () {
                $rootScope.ephemeralData[name]=textarea.val();
                $rootScope.backClick();
                $rootScope.toHireSaveInfo();
            }
        });

    })

    .controller('saveInfoOk',  function ($state, $scope, $rootScope, $ionicHistory,$stateParams) {
        $scope.title=$stateParams.title;
        console.log($stateParams.title);
        $scope.back = function () {
            $ionicHistory.goBack();
        }
    })

    .controller('selectTmp',function($stateParams,$scope,$rootScope,$state,$ionicHistory,publishToHireServices,system){
        console.log('selectTmp');
        $scope.selectData=[];
        var type=$state.$current.name+'-'+$stateParams.type;
        var selectTmpServices=publishToHireServices.selectTmpServices;
        $scope.type=type;
        $scope.config=selectTmpServices.config[$stateParams.type];
        var name=$scope.config.title;
        system.bindNavTool({
            rightText:"保存",
            toolClick:function () {
                $rootScope.ephemeralData[name]='';
                $scope.selectData.map(function(noe,index){
                    if(index==$scope.selectData.length-1)
                        $rootScope.ephemeralData[name]+=noe.city+'-'+noe.county;
                    else
                        $rootScope.ephemeralData[name]+=noe.city+'-'+noe.county+',';
                });
                $rootScope.backClick();
                $rootScope.toHireSaveInfo();
            }
        });
    })
    .controller('selectTrade',  function ($state, $scope, $rootScope,publishToHireServices,$ionicHistory,system) {
        console.log('selectTrade');
        var type=$state.$current.name;
        $scope.type=type;
        var promise=publishToHireServices.selectTradeServices.getData();
        promise.then(function(result){
            $scope.trades=result.data;
        },function(data){
        });
        $scope.elementShow={};
        $scope.surplus=0;
        $scope.selectData=[];
        $scope.removeTrade=function(trade){
            $scope.selectData.splice( $scope.selectData.indexOf(trade),1);
            $scope.elementShow[trade]=false;
            $scope.surplus--;
        }
        $scope.tradeClick=function(trade){
            $scope.elementShow[trade]=!$scope.elementShow[trade];
            if($scope.elementShow[trade]){
                $scope.selectData.push(trade);
            }else{
                $scope.removeTrade(trade);

            }

            $scope.surplus=$scope.selectData.length;
        }
        var name='行业';
        system.bindNavTool({
            rightText:"保存",
            toolClick:function () {
                $rootScope.ephemeralData[name]=$scope.selectData.join(',');
                $rootScope.backClick();
                $rootScope.toHireSaveInfo();
            }
        });
    })
    .controller('technicalAbility',function ($state, $scope, $rootScope,$ionicHistory) {
        console.log('technicalAbility');
        $rootScope.navRightButtonText='保存';
        $scope.surplus=0;
        $scope.selectData=[];
        $scope.technicalAbilitys=[];
        $scope.elementShow={};
        for(var i=0;i<20;i++){
            $scope.technicalAbilitys.push('战略组织'+i);
        }
        $scope.removeNoe=function(noe){
            $scope.selectData.splice( $scope.selectData.indexOf(noe),1);
            $scope.elementShow[noe]=false;
            $scope.surplus--;
        }
        $scope.clickNoe=function(type){
            if($scope.surplus>=5&&$scope.selectData.indexOf(type)==-1)return;
            $scope.elementShow[type]=!$scope.elementShow[type];
            if($scope.elementShow[type]){
                $scope.selectData.push(type);
            }else{
                $scope.removeNoe(type);

            }
            $scope.surplus=$scope.selectData.length;
        }
        $rootScope.navButtonEvent = function () {
            $rootScope.ephemeralData[type]={
                text:$scope.selectData.toString()
            };
            $ionicHistory.goBack();
        };
    })
    .controller('yearlySalary',  function ($state, $scope, $rootScope,$ionicHistory,publishToHireServices,system) {
        console.log('yearlySalary');
        $rootScope.navRightButtonText = '保存';
        var type=$state.$current.name;
        $scope.type=type;
        var promise=publishToHireServices.yearlySalary.getData();
        promise.then(function(result){
            $scope.yearlySalarys=result.data;
        },function(){});
        $scope.clickNoe = function (index) {
            $scope.noeIndex=index;
        }
        var name='年薪';
        system.bindNavTool({
            rightText:"保存",
            toolClick:function () {
                $rootScope.ephemeralData[name]=$scope.yearlySalarys[$scope.noeIndex];
                $rootScope.backClick();
                $rootScope.toHireSaveInfo();
            }
        });

    })

    .controller('jobCharacteristics', function ($state, $scope, $rootScope,$ionicHistory,publishToHireServices,system) {
        console.log('jobCharacteristics');
        $rootScope.navRightButtonText='保存';
        var type=$state.$current.name;
        $scope.surplus=0;
        $scope.selectData=[];
        $scope.technicalAbilitys=[];
        $scope.elementShow={};
        var promise=publishToHireServices.jobCharacteristics.getData();
        promise.then(function(result){
            $scope.technicalAbilitys=result.data;
        },function(){});
        $scope.removeNoe=function(noe){
            $scope.selectData.splice( $scope.selectData.indexOf(noe),1);
            $scope.elementShow[noe]=false;
            $scope.surplus--;
        }
        $scope.clickNoe=function(type){
            if($scope.surplus>=5&&$scope.selectData.indexOf(type)==-1)return;
            $scope.elementShow[type]=!$scope.elementShow[type];
            if($scope.elementShow[type]){
                $scope.selectData.push(type);
            }else{
                $scope.removeNoe(type);

            }
            $scope.surplus=$scope.selectData.length;
        }
        var name='岗位特点';
        system.bindNavTool({
            rightText:"保存",
            toolClick:function () {
                $rootScope.ephemeralData[name]=$scope.selectData.join(',');
                $rootScope.backClick();
                $rootScope.toHireSaveInfo();
            }
        });
    })

