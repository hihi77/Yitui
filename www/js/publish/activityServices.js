angular.module('starter.publishActivityServices',[])
.factory('publishActivityServices',function(system,DataHand){
        var servicesData={};
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
            "选择类型":"acttype",
            "活动主题":"actsubject",
            "报名截止时间":"regendtime",
            "活动开始时间":"actstartime",
            "活动结束时间":"sctendtime",
            "线上活动地址":"onlineaddress",
            "线下活动":"offlineaddress",
            "活动人数上限":"actulimit",
            "活动费用":"actfee",
            "活动性质":"actproperty",
            "报名附加信息":"attachinfo",
            "活动满意度评价":"satisevaluate",
            "推荐成功奖励":"sucrecaward",
            "授课满意度":"coursesatis",
            "活动详情":"actdetail"
        };
        /*
         * system.correspondingKey(obj,obj_);//对应注释在app.js
         * */
        servicesData.saveInfo=function(data){
            //保存草稿到服务器 数据模板参考servicesData.infoTransform
        system.correspondingKey(servicesData.infoTransform,data);
        //draflag = '0' means a draf item,'1' means a published item
        data.draflag = '0';
        //DataHand is defined in ./public/servicee.js for $http
        return DataHand.Sdata("get","add_activity",data,{})

        }
        servicesData.getInfo=function(){
            //获取已经保存在服务器发布的json数据 数据模板参考servicesData.infoTransform
        return DataHand.Sdata("get","get_activity",{},{})
        }
        servicesData.publishInfo=function(data){
            //所有http请求直接返回 例如return $http(); 数据模板参考servicesData.infoTransform
        system.correspondingKey(servicesData.infoTransform,data);
        data.draflag = '1';
        return DataHand.Sdata("get","add_activity",data,{}) 
        }

        return servicesData;
    });