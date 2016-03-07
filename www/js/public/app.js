/**
 * Created by lmin on 16/2/25.
 */
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
function dateControl($jQueryObject) {
    $(function(){
        var currYear = (new Date()).getFullYear();
        var opt={};
        opt.date = {preset : 'date'};
        opt.datetime = {preset : 'datetime'};
        opt.time = {preset : 'time'};
        opt.default = {
            theme: 'android-ics light', //皮肤样式
            display: 'modal', //显示方式
            mode: 'scroller', //日期选择模式
            dateFormat: 'yyyy-mm-dd',
            lang: 'zh',
            showNow: true,
            nowText: "今天",
            startYear: currYear - 50, //开始年份
            endYear: currYear + 10 //结束年份
        };
        $jQueryObject.mobiscroll($.extend(opt['date'], opt['default']));

        console.log($jQueryObject.length);
    });

}

var app=angular.module('starter', [
    'starter.Services',
    'ionic',
    //发布的才聘模块
    'starter.publishToHireControllers',
    'starter.publishToHireServices',
    'starter.publishToHireDirective',
    //发布的活动模块
    'starter.publishActivityControllers',
    'starter.publishActivityServices',
    'starter.publishActivityDirective',
    //发布的信息模块 information
    'starter.publishInformationControllers',
    'starter.publishInformationServices',
    'starter.publishInformationDirective',
    //发布的调查模块 investigate
    'starter.publishInvestigateControllers',
    'starter.publishInvestigateServices',
    'starter.publishInvestigateDirective',
]);
app.run(function($ionicPlatform,$rootScope,$ionicHistory) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

    });
})

    .config(function($stateProvider, $urlRouterProvider) {
        //发布->才聘路由
        $stateProvider
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            /*
            * 基础
            * */
            .state('tab.publish-saveInfoOk', {
                url: '/publish/saveInfoOk/:title',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/public/savePrompt.html',
                        controller:'saveInfoOk'
                    }
                }
            })
            //end

            .state('tab.publish-index', {
                url: '/publish/index',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/publish/index.html',
                        controller:function($scope){

                        }
                    }
                }
            })


            // setup an abstract state for the tabs directive
            .state('tab.toHire', {
                url: '/toHire',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/publish/toHire-index.html',
                        controller:"toHire"
                    }
                }
            })
            .state('tab.toHire-JobDescription', {
                url: '/toHire/JobDescription/:type',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/publish/toHire-JobDescription.html',
                        controller:'jobDescription'
                    }
                }
            })
            .state('tab.toHire-selectTmp', {
                url: '/toHire/selectTmp/:type',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/publish/toHire-selectTmp.html',
                        controller:'selectTmp'
                    }
                }
            })
            .state('tab.toHire-selectTrade', {
                url: '/toHire/selectTrade',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/publish/toHire-selectTrade.html',
                        controller:'selectTrade'
                    }
                }
            })
            .state('tab.toHire-technicalAbility', {
                url: '/toHire/technicalAbility',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/publish/toHire-technicalAbility.html',
                        controller:'technicalAbility'
                    }
                }
            })
            .state('tab.toHire-yearlySalary', {
                url: '/toHire/yearlySalary',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/publish/toHire-yearlySalary.html',
                        controller:'yearlySalary'
                    }
                }
            })
            .state('tab.toHire-jobCharacteristics', {
                url: '/toHire/jobCharacteristics',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/publish/toHire-jobCharacteristics.html',
                        controller:'jobCharacteristics'
                    }
                }
            })

        //发布->活动路由
        $stateProvider
            .state('tab.activity',{
                url:'/activity',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/publish/activity-index.html',
                        controller:'activity'
                    }
                }
            })
            .state('tab.activity-selectType',{
                url:'/activity/selectType',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/publish/activity-selectType.html',
                        controller:'activitySelectType'
                    }
                }
            })
            .state('tab.activity-additionalRegistration',{
                url:'/activity/additionalRegistration',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/publish/acticity-attachInfo.html',
                        controller:'activityAdditionalRegistration'
                    }
                }
            })
            .state('tab.activity-teachingSatisfaction',{
                url:'/activity/teachingSatisfaction',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/publish/acticity-teachingSatisfaction.html',
                        controller:'activityTeachingSatisfaction'
                    }
                }
            })
            .state('tab.activity-satisfaction',{
                url:'/activity/satisfaction',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/publish/activity-satisfaction.html',
                        controller:'activitySatisfaction'
                    }
                }
            })
            .state('tab.activity-saveInfoOk',{
                url:'/activity/saveInfoOk',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/public/savePrompt.html',
                        controller:'activitySaveInfoOk'
                    }
                }
            })

        //发布->信息路由
        $stateProvider
            .state('tab.information',{
                url:'/information',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/publish/information-index.html',
                        controller:'information'
                    }
                }
            })
            .state('tab.information-selectType',{
                url:'/information/selectType',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/publish/information-selectType.html',
                        controller:'informationSelectType'
                    }
                }
            })//

        //发布->调查
        $stateProvider
            .state('tab.investigate',{
                url:'/investigate',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/publish/investigate-index.html',
                        controller:'investigate'
                    }
                }
            })
            .state('tab.investigate-selectType',{
                url:'/investigate/selectType',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/publish/investigate-selectType.html',
                        controller:'investigateSelectType'
                    }
                }
            })//subject
            .state('tab.investigate-subject',{
                url:'/investigate/subject/:sub',
                views:{
                    "tab-publish":{
                        templateUrl: 'templates/publish/investigate-subject.html',
                        controller:'investigateSubject'
                    }
                }
            })
        $urlRouterProvider.otherwise('tab/publish/index');
    });
/*
* 默认服务
* */

app.factory('system',function($ionicLoading,$q,$http,$rootScope,$ionicHistory){
    var serve={};
    serve.httpGet=function(url,config){
        $ionicLoading.show();
        return $http.get(url,config).success(function(){
            //数据处理
            $ionicLoading.hide();
        }).error(function(){
            $ionicLoading.hide();
        });
    };
    serve.loadingHttp=function(httpParameter,loadingParameter){
        loadingParameter=loadingParameter||{};
        httpParameter=httpParameter||{};
        $ionicLoading.show({
            content: loadingParameter.loadText||'Loading',
            animation: loadingParameter.animateTpe||'fade-in',
            showBackdrop: loadingParameter.showBackdrop,
            maxWidth: loadingParameter.maxWidth||200,
            showDelay: loadingParameter.showDelay||0
        });
        return $http(httpParameter).success(function(){$ionicLoading.hide()}).error(function(){$ionicLoading.hide()});
    }
    serve.bindNavTool=function(parameter){
        parameter=parameter||{};
        $rootScope.navRightButtonText=parameter.rightText||'';
        $rootScope.toolClick=parameter.toolClick||function(){};
        $rootScope.backClick=function(){
            setTimeout(function(){
                $rootScope.navRightButtonText='';
            },50);
            $ionicHistory.goBack();
            if(parameter.backClick)parameter.backClick();
        };
    }
    serve.correspondingKey=function(obg,obj_){//键值转换 obj键值对应表 obj_需要转换的键值
        for(var key in obg){
            obj_[obg[key]]=obj_[key];
            obj_[key]=undefined;
        }

    }
    return serve;
});
