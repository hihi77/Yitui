angular.module('starter.publishInvestigateServices',[])
    .factory('publishInvestigateServices',function(system,DataHand){
        var servicesData={};
        /*
         * 选择调查类型
         * */
        servicesData.investigateSelectType={};
        servicesData.investigateSelectType.getData=function(){
            return system.httpGet('./testData/activitySelectTypeData.json');
        }
        /*
        * 调查Index
        * */
        servicesData.deathData={
            "问卷份数":[
                '100',
                "200",
                "300",
                "400",
                "500"
            ],
            "查看权限":[
                "公开结果"
            ]
        };
        /*
         * 信息保存于读取
         */
        servicesData.infoTransform={//提交信息数据模板
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
        servicesData.saveInfo=function(data){
            //保存草稿到服务器 数据模板参考servicesData.infoTransform
        system.correspondingKey(servicesData.infoTransform,data);
        console.log(data)
        //draflag = '0' means a draf item,'1' means a published item
        data.draflag = '0';
        //DataHand is defined in ./public/servicee.js for $http
        return DataHand.Sdata("get","add_invest",data,{})
        }

        servicesData.getInfo=function(id){
            //获取已经保存在服务器发布的json数据 数据模板参考servicesData.infoTransform
        return DataHand.Sdata("get","get_invest",{},{})
        }
        servicesData.publishInfo=function(data){
            //所有http请求直接返回 例如return $http(); 数据模板参考servicesData.infoTransform
        system.correspondingKey(servicesData.infoTransform,data);
        data.draflag = '1';
        return DataHand.Sdata("get","add_invest",data,{}) 
        }
        return servicesData;
    });