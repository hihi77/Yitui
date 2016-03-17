/**
 * Created by lmin on 16/2/25.
 */
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
window.href=function(path){
  window.location.href=window.location.href.replace(/#.*/,'')+path;
  console.log(window.location.href)
}
function dateControl($jQueryObject) {
  $(function () {
    var currYear = (new Date()).getFullYear();
    var opt = {};
    opt.date = {preset: 'date'};
    opt.datetime = {preset: 'datetime'};
    opt.time = {preset: 'time'};
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

var app = angular.module('starter', [
  'ionic',
  'starter.Services',
  'starter.loginControllers',
  'starter.loginServices',
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
  //我的 user
  'starter.userControllers',
  'starter.userServices',
  //发现 discover
  "starter.discoverControllers",
  "starter.discoverServices",
  //圈子模块 circle
  "starter.circleControllers",
  "starter.circleServices"
]);
app.run(function ($ionicPlatform, $rootScope, $ionicHistory,system,$ionicNavBarDelegate) {
    $ionicPlatform.ready(function () {
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
    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams){
        $rootScope.prevNavText=$rootScope.navRightButtonText;
        system.bindNavTool();
        $rootScope.showNavBar=true;
      })
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    //发布->才聘路由
    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      /*
       * 登陆模块开始
       * */
      /*
       * 基础
       * */

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

     .state('register_new', {
          url: '/register_new',
          templateUrl: 'templates/account/register_new.html',
          controller: 'RegisterCtrl'
              
      })

      .state('register_verify', {
              url: '/register_verify/:verify',
              templateUrl: 'templates/account/register_verify.html',
              controller: 'RegisterCtrl'

          })

      .state('register_submit', {
              url: '/register_submit/:submit',
                      templateUrl: 'templates/account/register_submit.html',
                      controller: 'RegisterCtrl'

          })


      /*
       * 发布模块开始
       * */
      /*
       * 基础
       * */
      .state('tab.publish-saveInfoOk', {
        url: '/publish/saveInfoOk/:title',
        views: {
          "tab-publish": {
            templateUrl: 'templates/public/savePrompt.html',
            controller: 'saveInfoOk'
          }
        }
      })
      //end

      .state('tab.publish-index', {
        url: '/publish/index',
        views: {
          "tab-publish": {
            templateUrl: 'templates/publish/index.html',
            controller: function ($scope) {

            }
          }
        }
      })
      // setup an abstract state for the tabs directive
      .state('tab.toHire', {
        url: '/toHire-:source',
        views: {
          "tab-publish": {
            templateUrl: 'templates/publish/toHire-index.html',
            controller: "toHire"
          }
        }
      })
      .state('tab.toHire-JobDescription', {
        url: '/toHire/JobDescription/:type',
        views: {
          "tab-publish": {
            templateUrl: 'templates/publish/toHire-JobDescription.html',
            controller: 'jobDescription'
          }
        }
      })
      .state('tab.toHire-selectTmp', {
        url: '/toHire/selectTmp/:type',
        views: {
          "tab-publish": {
            templateUrl: 'templates/public/selectTmp.html',
            controller: 'selectTmp'
          }
        }
      })
      .state('tab.toHire-selectTrade', {
        url: '/toHire/selectTrade',
        views: {
          "tab-publish": {
            templateUrl: 'templates/publish/toHire-selectTrade.html',
            controller: 'selectTrade'
          }
        }
      })
      .state('tab.toHire-technicalAbility', {
        url: '/toHire/technicalAbility',
        views: {
          "tab-publish": {
            templateUrl: 'templates/publish/toHire-technicalAbility.html',
            controller: 'technicalAbility'
          }
        }
      })
      .state('tab.toHire-yearlySalary', {
        url: '/toHire/yearlySalary',
        views: {
          "tab-publish": {
            templateUrl: 'templates/publish/toHire-yearlySalary.html',
            controller: 'yearlySalary'
          }
        }
      })
      .state('tab.toHire-jobCharacteristics', {
        url: '/toHire/jobCharacteristics',
        views: {
          "tab-publish": {
            templateUrl: 'templates/publish/toHire-jobCharacteristics.html',
            controller: 'jobCharacteristics'
          }
        }
      })

    //发布->活动路由
    $stateProvider
      .state('tab.activity', {
        url: '/activity-:source',
        views: {
          "tab-publish": {
            templateUrl: 'templates/publish/activity-index.html',
            controller: 'activity'
          }
        }
      })
      .state('tab.activity-selectType', {
        url: '/activity/selectType',
        views: {
          "tab-publish": {
            templateUrl: 'templates/public/selectType.html',
            controller: 'activitySelectType'
          }
        }
      })
      .state('tab.activity-additionalRegistration', {
        url: '/activity/additionalRegistration',
        views: {
          "tab-publish": {
            templateUrl: 'templates/public/attachInfo.html',
            controller: 'activityAdditionalRegistration'
          }
        }
      })
      .state('tab.activity-teachingSatisfaction', {
        url: '/activity/teachingSatisfaction',
        views: {
          "tab-publish": {
            templateUrl: 'templates/public/attachInfo.html',
            controller: 'activityTeachingSatisfaction'
          }
        }
      })
      .state('tab.activity-satisfaction', {
        url: '/activity/satisfaction',
        views: {
          "tab-publish": {
            templateUrl: 'templates/public/attachInfo.html',
            controller: 'activitySatisfaction'
          }
        }
      })
      .state('tab.activity-saveInfoOk', {
        url: '/activity/saveInfoOk',
        views: {
          "tab-publish": {
            templateUrl: 'templates/public/savePrompt.html',
            controller: 'activitySaveInfoOk'
          }
        }
      })

    //发布->信息路由
    $stateProvider
      .state('tab.information', {
        url: '/information-:source',
        views: {
          "tab-publish": {
            templateUrl: 'templates/publish/information-index.html',
            controller: 'information'
          }
        }
      })
      .state('tab.information-selectType', {
        url: '/information/selectType',
        views: {
          "tab-publish": {
            templateUrl: 'templates/public/selectType.html',
            controller: 'informationSelectType'
          }
        }
      })//

    //发布->调查
    $stateProvider
      .state('tab.investigate', {
        url: '/investigate-:source',
        views: {
          "tab-publish": {
            templateUrl: 'templates/publish/investigate-index.html',
            controller: 'investigate'
          }
        }
      })
      .state('tab.investigate-selectType', {
        url: '/investigate/selectType',
        views: {
          "tab-publish": {
            templateUrl: 'templates/public/selectType.html',
            controller: 'investigateSelectType'
          }
        }
      })//subject
      .state('tab.investigate-subject', {
        url: '/investigate/subject/:sub',
        views: {
          "tab-publish": {
            templateUrl: 'templates/publish/investigate-subject.html',
            controller: 'investigateSubject'
          }
        }
      });
    /*
     * 发布模块结束
     * */

    /*
     * 用户模块开始
     * */
    $stateProvider
      .state('tab.user-index', {
        url: '/user/index',
        views: {
          "tab-user": {
            templateUrl: 'templates/user/user-index.html',
            controller: 'user'
          }
        }
      })
      .state('tab.user-info', {
        url: '/user/info',
        views: {
          "tab-user": {
            templateUrl: 'templates/user/user-info.html',
            controller: 'userInfo'
          }
        }
      })
      .state('tab.user-selectArea', {
        url: '/user/user-selectArea',
        views: {
          "tab-user": {
            templateUrl: 'templates/public/selectTmp.html',
            controller: 'userSelectArea'
          }
        }
      })
      .state('tab.user-beGoodAt', {
        url: '/user/user-beGoodAt',
        views: {
          "tab-user": {
            templateUrl: 'templates/public/selectType.html',
            controller: 'userBeGoodAtSelectType'
          }
        }
      })
      .state('tab.user-interest', {
        url: '/user/user-interest',
        views: {
          "tab-user": {
            templateUrl: 'templates/public/selectType.html',
            controller: 'userInterestSelectType'
          }
        }
      })
      .state('tab.user-trade', {
        url: '/user/user-trade',
        views: {
          "tab-user": {
            templateUrl: 'templates/public/selectType.html',
            controller: 'userTradeSelectType'
          }
        }
      })
      .state('tab.user-occupation', {
        url: '/user/user-occupation',
        views: {
          "tab-user": {
            templateUrl: 'templates/public/selectType.html',
            controller: 'userOccupationSelectType'
          }
        }
      })
      .state('tab.user-language', {
        url: '/user/user-language',
        views: {
          "tab-user": {
            templateUrl: 'templates/public/selectType.html',
            controller: 'userLanguageSelectType'
          }
        }
      })
      .state('tab.user-projectExperience', {
        url: '/user/user-projectExperience/:sub',
        views: {
          "tab-user": {
            templateUrl: 'templates/user/user-projectExperience.html',
            controller: 'userProjectExperience'
          }
        }
      })
      .state('tab.user-workExperience', {
        url: '/user/user-workExperience/:sub',
        views: {
          "tab-user": {
            templateUrl: 'templates/user/user-workExperience.html',
            controller: 'userWorkExperience'
          }
        }
      })
      .state('tab.user-educationalBackground', {
        url: '/user/user-educationalBackground/:sub',
        views: {
          "tab-user": {
            templateUrl: 'templates/user/user-educationalBackground.html',
            controller: 'userEducationalBackground'
          }
        }
      })
      .state('tab.user-addressList', {
        url: '/user/user-addressList',
        views: {
          "tab-user": {
            templateUrl: 'templates/user/user-addressList.html',
            controller: 'userAddressList'
          }
        }
      })
      .state('tab.user-partake', {
        url: '/user/user-partake',
        views: {
          "tab-user": {
            templateUrl: 'templates/public/categoryTab.html',
            controller: 'userPartake'
          }
        }
      })
      .state('tab.user-publish', {
        url: '/user/user-publish',
        views: {
          "tab-user": {
            templateUrl: 'templates/public/categoryTab.html',
            controller: 'userPublish'
          }
        }
      })
      .state('tab.user-circle', {
        url: '/user/user-circle',
        views: {
          "tab-user": {
            templateUrl: 'templates/public/circle.html',
            controller: 'userCircle'
          }
        }
      })
      .state('tab.user-coupleBack', {
        url: '/user/user-coupleBack',
        views: {
          "tab-user": {
            templateUrl: 'templates/user/user-coupleBack.html',
            controller: 'userCoupleBack'
          }
        }
      })
    //发现
    $stateProvider
      .state('tab.discover-index',{
        url: '/discover/index',
        views: {
          "tab-discover": {
            templateUrl: 'templates/discover/discover-index.html',
            controller: 'discover'
          }
        }
      })//''
      .state('tab.discover-activity',{
        url: '/discover-activity',
        views: {
          "tab-discover": {
            templateUrl: 'templates/public/categoryTab.html',
            controller: 'discoverActivity'
          }
        }
      })
      .state('tab.discover-selectArea', {
        url: '/discover/discover-selectArea',
        views: {
          "tab-discover": {
            templateUrl: 'templates/public/selectTmp.html',
            controller: 'discoverSelectArea'
          }
        }
      })//discover-signUp-detailed
      .state('tab.discover-signUp-detailed', {
        url: '/discover/discover-signUp-detailed/:id',
        views: {
          "tab-discover": {
            templateUrl: 'templates/discover/discover-signUp-detailed.html',
            controller: 'discoverSignUpDetailed'
          }
        }
      })
      .state('tab.discover-signUp-input', {
        url: '/discover/discover-signUp-input/:id',
        views: {
          "tab-discover": {
            templateUrl: 'templates/discover/discover-signUp-input.html',
            controller: 'discoverSignUpInput'
          }
        }
      })
      .state('tab.discover-signUp-activityEvaluation', {
        url: '/discover/discover-activityEvaluation/:id',
        views: {
          "tab-discover": {
            templateUrl: 'templates/discover/discover-activityEvaluation.html',
            controller: 'discoverActivityEvaluation'
          }
        }
      })
      .state('tab.discover-toHire-more', {
        url: '/discover/discover-toHire-more',
        views: {
          "tab-discover": {
            templateUrl: 'templates/discover/discover-toHire-more.html',
            controller: 'discoverToHireMore'
          }
        }
      })
      .state('tab.discover-toHire-detailed', {
        url: '/discover/discover-toHire-detailed/:id',
        views: {
          "tab-discover": {
            templateUrl: 'templates/discover/discover-toHire-detailed.html',
            controller: 'discoverToHireDetailed'
          }
        }
      })
      .state('tab.discover-user-userIfo', {
        url: '/discover/discover-toHire-userIfo/:id',
        views: {
          "tab-discover": {
            templateUrl: 'templates/discover/discover-userInfo.html',
            controller: 'discoverUserIfo'
          }
        }
      })
      .state('tab.discover-questionnaire',{
        url: '/discover-questionnaire',
        views: {
          "tab-discover": {
            templateUrl: 'templates/public/categoryTab.html',
            controller: 'discoverQuestionnaire'
          }
        }
      })
      .state('tab.discover-questionnaireSurvey',{
        url: '/discover-questionnaireSurvey/:id',
        views: {
          "tab-discover": {
            templateUrl: 'templates/discover/discover-questionnaireSurvey.html',
            controller: 'discoverQuestionnaireSurvey'
          }
        }
      })
      .state('tab.discover-question',{
        url: '/discover-question/:sub',
        views: {
          "tab-discover": {
            templateUrl: 'templates/discover/discover-question.html',
            controller: 'discoverQuestion'
          }
        }
      })//information
      .state('tab.discover-information-more',{
        url: '/discover-information-more',
        views: {
          "tab-discover": {
            templateUrl: 'templates/public/categoryTab.html',
            controller: 'discoverInformation'
          }
        }
      })
      .state('tab.discover-information-detailed',{
        url: '/discover-information-detailed/:id',
        views: {
          "tab-discover": {
            templateUrl: 'templates/discover/discover-information-detailed.html',
            controller: 'discoverInformationDetailed'
          }
        }
      })
      .state('tab.discover-map',{
        url: '/discover-map/:id',
        views: {
          "tab-discover": {
            templateUrl: 'templates/discover/discover-map.html',
            controller: 'discoverMap'
          }
        }
      })
    //圈子路由
    $stateProvider
      .state('tab.circle-index',{
        url: '/circle/index',
        views: {
          "tab-circle": {
            templateUrl: 'templates/circle/circle-index.html',
            controller: 'circle'
          }
        }
      })
      .state('tab.circle-myCircle',{
        url: '/circle-myCircle',
        views: {
          "tab-circle": {
            templateUrl: 'templates/public/circle.html',
            controller: 'myCircle'
          }
        }
      })
      .state('tab.circle-hotCircle',{
        url: '/circle-hotCircle',
        views: {
          "tab-circle": {
            templateUrl: 'templates/public/circle.html',
            controller: 'hotCircle'
          }
        }
      })
      .state('tab.circle-addCircle',{
        url: '/circle-addCircle',
        views: {
          "tab-circle": {
            templateUrl: 'templates/circle/circle-addCircle.html',
            controller: 'addCircle'
          }
        }
      })
      .state('tab.circle-selectType', {
        url: '/circle-selectType',
        views: {
          "tab-circle": {
            templateUrl: 'templates/public/selectType.html',
            controller: 'circleSelectType'
          }
        }
      })
      .state('tab.circle-termsForEntry', {
        url: '/circle-termsForEntry',
        views: {
          "tab-circle": {
            templateUrl: 'templates/public/attachInfo.html',
            controller: 'circleTermsForEntry'
          }
        }
      })
      /*聊天界面*/
      .state('circle-enterTheCircle', {
        url: '/circle-enterTheCircle/:id',
        templateUrl: 'templates/circle/circle-enterTheCircle.html',
        controller: 'circleEnterTheCircle'
      })
      .state('circle-circleMembers', {
        url: '/circle-circleMembers/:id',
        templateUrl: 'templates/circle/circle-circleMembers.html',
        controller: 'circleCircleMembers'
      })
      .state('circle-member', {
        url: '/circle-member',
        templateUrl: 'templates/circle/circle-member.html',
        controller: 'circleMember'
      })
      .state('circle-userInfo', {
        url: '/circle-userInfo/:userId',
        templateUrl: 'templates/circle/circle-userInfo.html',
        controller: 'discoverUserIfo'
      })//circle-selectContacts
      .state('circle-selectContacts', {
        url: '/circle-selectContacts',
        templateUrl: 'templates/circle/circle-selectContacts.html',
        controller: 'circleSelectContacts'
      })
      .state('circle-notice', {
        url: '/circle-notice',
        templateUrl: 'templates/circle/circle-notice.html',
        controller: 'circleNotice'
      })//circle-report
      .state('circle-report', {
        url: '/circle-report',
        templateUrl: 'templates/circle/circle-circleReport.html',
        controller: 'circleReport'
      })
      .state('tab.circle-noticePage', {
        url: '/circle-noticePage/:id',
        views:{
          "tab-circle":{
            templateUrl: 'templates/circle/circle-noticePage.html',
            controller: 'circleNoticePage'
          }
        }
      })

      /*
      * 继承于发现
      * */
      .state('tab.circle-activity',{
        url: '/circle-activity/:id',
        views: {
          "tab-circle": {
            templateUrl: 'templates/circle/circle-activity.html',
            controller: 'circleActivity'
          }
        }
      })
      .state('tab.circle-selectArea', {
        url: '/circle/circle-selectArea',
        views: {
          "tab-circle": {
            templateUrl: 'templates/public/selectTmp.html',
            controller: 'discoverSelectArea'
          }
        }
      })//discover-signUp-detailed
      .state('tab.circle-signUp-detailed', {
        url: '/circle/circle-signUp-detailed/:id',
        views: {
          "tab-circle": {
            templateUrl: 'templates/discover/discover-signUp-detailed.html',
            controller: 'discoverSignUpDetailed'
          }
        }
      })
      .state('tab.circle-signUp-input', {
        url: '/circle/circle-signUp-input/:id',
        views: {
          "tab-circle": {
            templateUrl: 'templates/discover/discover-signUp-input.html',
            controller: 'discoverSignUpInput'
          }
        }
      })
      .state('tab.circle-signUp-activityEvaluation', {
        url: '/circle/circle-activityEvaluation/:id',
        views: {
          "tab-circle": {
            templateUrl: 'templates/discover/discover-activityEvaluation.html',
            controller: 'discoverActivityEvaluation'
          }
        }
      })
      .state('tab.circle-toHire', {
        url: '/circle/circle-toHire/:id',
        views: {
          "tab-circle": {
            templateUrl: 'templates/circle/circle-toHire.html',
            controller: 'discoverToHireMore'
          }
        }
      })
      .state('tab.circle-toHire-detailed', {
        url: '/circle/circle-toHire-detailed/:id',
        views: {
          "tab-circle": {
            templateUrl: 'templates/discover/discover-toHire-detailed.html',
            controller: 'discoverToHireDetailed'
          }
        }
      })
      .state('tab.circle-user-userIfo', {
        url: '/circle/circle-toHire-userIfo/:id',
        views: {
          "tab-circle": {
            templateUrl: 'templates/discover/discover-userInfo.html',
            controller: 'discoverUserIfo'
          }
        }
      })
      .state('tab.circle-questionnaire',{
        url: '/circle-questionnaire/:id',
        views: {
          "tab-circle": {
            templateUrl: 'templates/circle/circle-investigate.html',
            controller: 'discoverQuestionnaire'
          }
        }
      })
      .state('tab.circle-questionnaireSurvey',{
        url: '/circle-questionnaireSurvey/:id',
        views: {
          "tab-circle": {
            templateUrl: 'templates/discover/discover-questionnaireSurvey.html',
            controller: 'discoverQuestionnaireSurvey'
          }
        }
      })
      .state('tab.circle-question',{
        url: '/circle-question/:sub',
        views: {
          "tab-circle": {
            templateUrl: 'templates/discover/discover-question.html',
            controller: 'discoverQuestion'
          }
        }
      })//information
      .state('tab.circle-information',{
        url: '/circle-information/:id',
        views: {
          "tab-circle": {
            templateUrl: 'templates/circle/circle-information.html',
            controller: 'discoverInformation'
          }
        }
      })
      .state('tab.circle-information-detailed',{
        url: '/circle-information-detailed/:id',
        views: {
          "tab-circle": {
            templateUrl: 'templates/discover/discover-information-detailed.html',
            controller: 'discoverInformationDetailed'
          }
        }
      })
      .state('tab.circle-map',{
        url: '/circle-map/:id',
        views: {
          "tab-circle": {
            templateUrl: 'templates/discover/discover-map.html',
            controller: 'discoverMap'
          }
        }
      })

      //end

      //发布
      .state('chat-publish-activity', {
        url: '/chat-publish-activity',
        templateUrl: 'templates/publish/activity-index.html',
        controller: 'activity'
      })
      .state('chat-publish-toHire', {
        url: '/chat-publish-toHire',
        templateUrl: 'templates/publish/toHire-index.html',
        controller: 'toHire'
      })
      .state('chat-publish-investigate', {
        url: '/chat-publish-investigate',
        templateUrl: 'templates/publish/investigate-index.html',
        controller: 'investigate'
      })
      .state('chat-publish-information', {
        url: '/chat-publish-information',
        templateUrl: 'templates/publish/information-index.html',
        controller: 'information'
      })
      //end

    /*聊天界面*/
    $urlRouterProvider.otherwise('tab/circle/index');
  });
/*
 * 默认服务
 * */



app.factory('system', function ($ionicLoading, $q, $http, $rootScope, $ionicHistory) {
  var serve = {};
  serve.httpGet = function (url, config) {
    $ionicLoading.show();
    return $http.get(url, config).success(function () {
      //数据处理
      $ionicLoading.hide();
    }).error(function () {
      $ionicLoading.hide();
    });
  };
  serve.loadingHttp = function (httpParameter, loadingParameter) {
    loadingParameter = loadingParameter || {};
    httpParameter = httpParameter || {};
    $ionicLoading.show({
      content: loadingParameter.loadText || 'Loading',
      animation: loadingParameter.animateTpe || 'fade-in',
      showBackdrop: loadingParameter.showBackdrop,
      maxWidth: loadingParameter.maxWidth || 200,
      showDelay: loadingParameter.showDelay || 0
    });
    return $http(httpParameter).success(function () {
      $ionicLoading.hide()
    }).error(function () {
      $ionicLoading.hide()
    });
  }
  serve.bindNavTool = function (parameter) {

    parameter = parameter || {};
    $rootScope.navRightIonicClass=parameter.navRightIonicClass||'';
    $rootScope.navRightButtonText = parameter.rightText || '';
    $rootScope.toolClick = parameter.toolClick || function () {
      };
    $rootScope.showNav=parameter.showNav;
    $rootScope.backClick = function () {
      setTimeout(function () {
        console.log(parameter)
        if(parameter.noReset){
          parameter.noReset=false;
          serve.bindNavTool(parameter);
          return;
        };
        $rootScope.navRightButtonText = '';
        $rootScope.navRightIonicClass='';
      }, 50);
      if(!parameter.backClick){
        $ionicHistory.goBack();
      }
      if (parameter.backClick&&!parameter.backClick()){
        $ionicHistory.goBack();
      }
    };
  }
  serve.correspondingKey = function (obg, obj_) {//键值转换 obj键值对应表 obj_需要转换的键值
    for (var key in obg) {
      obj_[obg[key]] = obj_[key];
      obj_[key] = undefined;
    }
  }
  return serve;
});
/*
 * 默认控制器
 * */
app.controller('overstory', function ($scope, $timeout, $state, localStorageService,userServices) {
    //Check wheather a valid user
    $scope.checkUserAuthority = function (){

     var id  = localStorageService.get('id');
     if(id)
      { 
         //$state.go('tab.discover');
      }else {
        $state.go('login');
      }
    }

    $scope.publishButtonEvent = function () {
      $scope.publishLayerShow = true;
      $timeout(function () {
        $scope.publishLayerEs = true;
      }, 50)
    };
    $scope.publishLayerHideEvent = function () {
      $scope.publishLayerEs = false;
      $timeout(function () {
        $scope.publishLayerShow = false;
      }, 400)
    }
  })
  .controller('selectType',function($scope){
    /**
     *
     * 初始化判断
     */
    if(!$scope.title)console.log('父级未指定title');
    if(!$scope.selectTypeText)$scope.$parent.selectTypeText = '父级未指定selectTypeText';
    if(!$scope.selectData)$scope.$parent.selectData = [];
    if(!$scope.elementShow)$scope.$parent.elementShow = {};
    if(!$scope.typeDatas)console.log('父级没有typeDatas数据');
    if(!$scope.maxSurplus)$scope.$parent.maxSurplus=3;
    $scope.surplus = 0;
    //end
    $scope.removeNoe=function(noe){
      $scope.selectData.splice($scope.selectData.indexOf(noe),1);
      $scope.elementShow[noe]=false;
    }
    $scope.addNoe=function(noe){
      $scope.elementShow[noe]=!$scope.elementShow[noe];
      if($scope.maxSurplus==1&&$scope.selectData.length){
        $scope.removeNoe($scope.selectData[0]);
      }
      if ($scope.surplus >= $scope.maxSurplus && $scope.selectData.indexOf(noe) == -1)return;
      if($scope.elementShow[noe]){
        $scope.selectData.push(noe);
      }else{
        $scope.removeNoe(noe);
      }
      $scope.surplus=$scope.selectData.length;
    }
  })
  .controller('selectArea', function ($scope) {
    if(!$scope.config){
      console.log('$scope.config不存在');
      return;
    }
    if(!$scope.maxSurplus)$scope.$parent.maxSurplus=3;
    var promise = $scope.config.getData();//$scope.citys
    promise.then(function (result) {//处理结果数据
      $scope.citys = result.data;
    }, function (data) {
      console.log('请求失败！' + data);
    });
    //$scope.selectData = [];
    $scope.surplus = 0;
    $scope.countyShow = {};
    $scope.selectData.indexOf = function (noe) {
      for (var i = 0; i < this.length; i++) {
        if (this[i].county == noe || this[i].city == noe) {
          return i;
        }
      }
      return -1;
    }
    $scope.removeNoe = function (city, county) {
      var i = $scope.selectData.indexOf(county);
      $scope.selectData.splice(i, 1);
      $scope.countyShow[city + county] = false;
      $scope.surplus = $scope.selectData.length;
    }
    $scope.cityClick = function (index, key) {
      $scope.cityIndex = index;
      $scope.nowKey = key;
      $scope.countys = $scope.citys[$scope.nowKey];
    };
    $scope.countyClick = function (index, county) {
      if($scope.maxSurplus==1&&$scope.selectData.length){
        $scope.removeNoe($scope.selectData[0].city, $scope.selectData[0].county);
      }
      //这里的显示隐藏做法略为复杂 下次直接用jQuery做
      $scope.countyIndex = index;
      if ($scope.surplus >= $scope.maxSurplus && $scope.selectData.indexOf(county) == -1)return;
      $scope.countyShow[$scope.nowKey + county] = !$scope.countyShow[$scope.nowKey + county];
      if ($scope.countyShow[$scope.nowKey + county]) {
        $scope.selectData.push({
          county: county,
          city: $scope.nowKey
        });
      } else {
        $scope.removeNoe($scope.nowKey, county);
      }
      $scope.surplus = $scope.selectData.length;
    }
  })
  .controller('categoryTab',function($scope){
    if(!$scope.heardTabs){
      console.log('父级不存在heardTabs数据');
      return false;
    }
    if(!$scope.title){
      console.log('父级不存在title属性!');
    }
    $scope.tabClick=function(tab,index){
      $scope.heardTabs.map(function(noe){
        noe.hover='';
      })
      tab.hover='hover';
      $scope.$parent.$parent.nowTab=tab;
      if($scope.nowData)$scope.nowData.length=0;
      if(tab.click)tab.click();
    }

    if($scope.heardTabs.length)$scope.tabClick($scope.heardTabs[0]);
  })
  .controller('searchController',function($scope,$timeout){
    $scope.searchKeyDown = function () {
      $timeout(function(){
        $scope.circles.map(function (noe) {
          if (!(new RegExp($scope.searchText, 'ig')).test(noe.title)) {
            noe.hide = true;
          } else {
            noe.hide = false;
          }
          if (!$scope.searchText) {
            noe.hide = false;
          }
        });
      },20);
    }
    var promise = $scope.promise;//userServices.getCircle()
    promise.then(function (result) {
      $scope.circles = result.data;
    }, function () {

    });
  })
  .controller('attachInfo',function($scope){
    if(!$scope.lists)console.log('父级$scope.lists不存在!');
    $scope.noeType={
      "icon":"ion-android-happy",
      "text":""
    };
    $scope.removeFn=function(type){
      if(type&&type.remove){
        type.removeDom=true;
      }
    };
    $scope.addFn=function(){
      $scope.lists.push({
        "icon":"ion-android-happy",
        "text":$scope.noeType.text,
        "remove":true,
        "checkBox":true
      });
      $scope.noeType.text='';
      $scope.addItemShow=false;
    };
  })
  .directive('search',function(){
    return {
      restrict:"A",
      templateUrl:'./templates/public/search.html',
      replace:true,
      controller:function($scope,$element,$attrs,$timeout){
        $scope.searchKeyDown = function () {
          if($scope.servicesSearch){
            $scope.servicesSearch($scope.searchText);
          }
          $timeout(function(){
            $scope.searchData.map(function (noe) {
              if(!(noe instanceof  Object)){
                return false;
              }
              if (!(new RegExp($scope.searchText, 'ig')).test(noe[$scope.searchMarking||'searchText'])) {
                noe.hide = true;
              } else {
                noe.hide = false;
              }
              if (!$scope.searchText) {
                noe.hide = false;
              }
            });
          },20);
        }
        if(!$scope.searchData){
          console.log('$scope.searchData不存在');
          //$scope.searchData=[];
        }
      }
    }
  })
