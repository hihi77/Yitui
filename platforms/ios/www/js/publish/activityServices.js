angular.module('starter.publishActivityServices',[])
.factory('publishActivityServices',function(system,DataHand,localStorageService){
        var servicesData={};
        var userId = localStorageService.get('id');
        /*
        * 选择活动类型
        * */
        servicesData.activitySelectType={};
        servicesData.activitySelectType.getData=function(){
            return system.httpGet('./testData/activitySelectTypeData.json');
        }
        /*
        * 活动性质
        * */
        servicesData.activityKind={};
        servicesData.activityKind.getActivityKind=function(){//获取活动性质
            //return system.httpGet('./testData/activitySelectTypeData.json');
        };
        /*
         * 信息保存于读取
         */
        servicesData.infoTransform={//提交信息数据模板
            "选择类型":"type",
            "活动主题":"title",
            "报名截止时间":"applayendTime",
            "活动开始时间":"activityTime",
            "活动结束时间":"endtime",
            "线下活动地址":"address",
            "线上活动":"activeAddress",
            "活动人数上限":"signUpCount",
            "活动费用":"price",
            "活动性质":"eventProperty",
            "报名附加信息":"registrationAdditional",
            "活动满意度评价":"activitySatisfaction",
            "推荐成功奖励":"recommendedSuccess",
            "授课满意度":"courseSatisfaction",
            "活动详情":"eventDetails"
        };

        servicesData.template={//提交信息数据模板
            "选择类型":"",
            "活动主题":"",
            "报名截止时间":"",
            "活动开始时间":"",
            "活动结束时间":"",
            "线上活动地址":"",
            "线下活动":"",
            "活动人数上限":"",
            "活动费用":"",
            "活动性质":"",
            "报名附加信息":"",
            "活动满意度评价":"",
            "推荐成功奖励":"",
            "授课满意度":"",
            "活动详情":""
        };
        /*
         * system.correspondingKey(obj,obj_);//对应注释在app.js
         * */
        servicesData.saveInfo=function(data,source,id){
            console.log(source);
          system.correspondingKey(servicesData.infoTransform,data);
          data.draflag = '0';
          data.userId=userId;
            //保存草稿到服务器 数据模板参考servicesData.infoTransform
            if(source=="publish"){
            //DataHand is defined in ./public/servicee.js for $http
            return DataHand.Sdata("get","add_activity",data,{})
            }
            else if(source=="circle"){
            data.type = "activity";
            return DataHand.Sdata("get","update_circle_rRecord",data,{circleId:id})
            }

        }
        servicesData.getInfo=function(){
            //获取已经保存在服务器发布的json数据 数据模板参考servicesData.infoTransform
        return DataHand.Sdata("get","get_activity",{},{})

        }
        servicesData.publishInfo=function(data,source,id){
            //所有http请求直接返回 例如return $http(); 数据模板参考servicesData.infoTransform
        system.correspondingKey(servicesData.infoTransform,data);
        data.draflag = '1';
        data.userId = userId;
           if(source=="publish"){
            return DataHand.Sdata("get","add_activity",data,{})
            }
            else if(source=="circle"){
            data.type = "activity";
            //DataHand is defined in ./public/servicee.js for $http
            return DataHand.Sdata("get","update_circle_rRecord",data,{circleId:id})
            }
        
        }
        return servicesData;
    });