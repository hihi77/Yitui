angular.module('starter.userServices', [])
  .factory('userServices', function (system,$http,$window,DataHand,rDataHand,localStorageService) {
    var services = {};
    var userId = localStorageService.get('id');
    console.log(userId);
    /*
    * 登陆后获取用户基本信息
    * */

  services.findUser = function(param) 
     {
       var re = rDataHand.Sdata('get','get_user',{},param)
      .then(function(res){ 
        return res;
          //callback(res);
              }); 
       return re;
     }

  services.addUser = function(data) 
     {
       var re = rDataHand.Sdata('get','add_user',data,{})
      .then(function(res){ 
        return res;
          //callback(res);
              }); 
       return re;
     }

    services.getUserBaseInfo=function(){
      return DataHand.Sdata("get","get_user_basic",{},{userId:userId});
    }

    /*
    * 获取全部用户信息
    * */
    services.getAllUserInfo=function(){
      //return system.httpGet('./testData/userAllInfo.json');
      return DataHand.Sdata("get","get_user",{},{})
    }
    /*
    * 通讯录
    * */
    services.deleteFriend=function(userId){
      return $http({url:''});
    }
    /*
    *当前行业
    * */
    services.getTrade=function(){
      //由于数据格式一样 我为了节约时间就用同样的json了
      return system.httpGet('./testData/activitySelectTypeData.json');;
    }

    /*
    * 当前职能
    * */
    services.getOccupation=function(){
      return system.httpGet('./testData/activitySelectTypeData.json');
    }
    /*
    * 擅长技能
    * */
    services.getBeGoodAt=function(){
      return system.httpGet('./testData/activitySelectTypeData.json');
    }
    /*
    * 兴趣爱好
    * */
    services.getInterest=function(){
      return system.httpGet('./testData/activitySelectTypeData.json');
    }

    /*
    * 语言能力
    * */
    services.getLanguage=function(){
      return system.httpGet('./testData/activitySelectTypeData.json');
    }

    /*
    * 更新用户隐私配置 每次点击执行
    * */
    services.upUserConfig=function(config){
      //{位置隐身可见: false, 基本信息可见: false, 个人简历可见: false}
      console.log(config)
    }

    /*
    * 更新用户信息
    * key对应getAllUserInfo左边
    * value对应getAllUserInfo右边的值
    * */
    services.updateUserInfo=function(key,value,sub){
        var data = {};
      //sub 属性仅在 workExperience userProjectExperience userEducationalBackground
      if(sub=='new'){
        //新增一个经验
        data[key]= value;
        return DataHand.Sdata("get","updatepush_user_info",data,{userId:userId});
      }

      else if(sub==""||sub==undefined) {
        //更新属性
        data[key] = value;
        return DataHand.Sdata("get","update_user_info",data,{userId:userId});
      }else { 
        delete value.$$hashKey;
        //更新一个经验
        key = key+'.'+sub;
        data[key] = value;
        return DataHand.Sdata("get","update_userarray_info",data,{userId:userId})
      }
      console.log(key,value,'window.userInfo_数据更新...');
    }
    /*
    * 添加好友
    * */
    services.addFriends=function(data){
      /*
      * {
      * "id":"",//查找凭证
      * "extraMessage":""//附加信息
      * }
      * 你需要返回我状态 如果返回我0 则说明没有查找到 如果返回我1我给用户的反馈是请求已发送
      * */
      return DataHand.Sdata("get","add_friend",data,{userId:userId})
    }
    services.getFriends=function(){
      /*
      * {
       "W"://代表这组数据的字母排序
         [
           {
           "heardPhotoUrl": "",//头像
           "nickname": "序列",//昵称
           "userId": ""//用户唯一id
           }
         ]
       }
       ]
      * */
      //return system.httpGet('./testData/userFriends.json');
      return DataHand.Sdata("get", "get_friend",{},{userId:userId})
    }
    /*
    * 我参与的
    * */
    services.partake={
      getActivity:function(){
        //活动
        return DataHand.Sdata("get","get_participate_item",{type:"activity"},{userId:userId});
      },
      getToHire:function(){
        //才聘
        /*
        *
        * [
         {
         "title":"数据分析",//标题
         "time":"2016-1-2",//时间
         "address":"北京-海淀区",//地区
         "company":"阿里巴巴",//公司名称
         "salary":"10-20万"//薪资待遇
         }
         ]
        * */
        return DataHand.Sdata("get","get_participate_item",{type:"hire"},{userId:userId});
      },
      getInvestigate:function(){

        return DataHand.Sdata("get","get_participate_item",{type:"invest"},{userId:userId});
      },
      getInformation:function(){
        //信息
        return DataHand.Sdata("get","get_participate_item",{type:"information"},{userId:userId});
      }
    };
    /*
    * 我发布的
    * */
    services.publish={
      getActivity:function(){
        //活动
        /*
         *
         *
         *<--数据格式-->
         [
         {
         "title":"骑在路上",//标题
         "phoneUrl":"http://h.hiphotos.baidu.com/image/h%3D200/sign=a28cdfce86cb39dbdec06056e01609a7/8ad4b31c8701a18bf89ea96b992f07082838fe99.jpg",//头像地址
         "time":"02月15日(周一)16:00 ",//活动时间
         "address":"上海市 徐汇区 越界创业中心",//活动地址
         "price":"100",//活动价格
         "applicants":"100",//报名人数
         "status":false//状态 true 进行中 false 已经结束
         }
         ]
         *
         * */
        return DataHand.Sdata("get","get_u_activity",{},{userId:userId});
      },
      getToHire:function(){
        //才聘
        /*
         *
         * [
         {
         "title":"数据分析",//标题
         "time":"2016-1-2",//时间
         "address":"北京-海淀区",//地区
         "company":"阿里巴巴",//公司名称
         "salary":"10-20万"//薪资待遇
         }
         ]
         * */
        return DataHand.Sdata("get","get_u_hire",{},{userId:userId});
      },
      getInvestigate:function(){
        //调查
        /*
         *
         *
         * [
         {
         "source":"捷豹汽车",//调查来源
         "startTime":"2016-02-18 14:23",//发布时间
         "moneyReward":"2.00",//悬赏
         "endTime":"2016-02-22 00:00",//截止时间
         "alreadyPortion":"79",//已经答卷分数
         "maxPortion":"300"//全部份数
         }
         ]

         * */
        return DataHand.Sdata("get","get_u_invest",{},{userId:userId});
      },
      getInformation:function(){
        //信息
        //return system.httpGet('./testData/partakeInformation.json');
        return DataHand.Sdata("get","get_u_info",{},{userId:userId});
      }
    };


    services.getCircle = function(type){

      return DataHand.Sdata("get","get_circle",{type:type},{userId:userId})
    }
    /*
    * 用户反馈提交
    * */
    services.userCoupleBackSubmit=function(data){
      console.log(data)
      /*
      * {
      *   phone:"",//手机号码
      *   text:""//文本信息
      * }
      * */
      data.userId = userId;
      DataHand.Sdata("get","new_inform",data,{})
    }
    return services;
  })
