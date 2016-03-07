angular.module('starter.publishInformationServices',[])
    .factory('publishInformationServices',function(system,DataHand){
        var servicesData={};
        /*
         * 选择信息类型
         * */
        servicesData.informationSelectType={};
        servicesData.informationSelectType.getData=function(){
            return system.httpGet('./testData/activitySelectTypeData.json');
        }
        /*
         * 信息保存于读取
         */
        servicesData.infoTransform={//提交信息数据模板
            "选择类型":"",
            "信息标题":"",
            "信息详情":"",
            "信息联系人":"",
            "联系方式":"",
            "信息截止时间":""
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
        return DataHand.Sdata("get","add_info",data,{})

        }
        servicesData.getInfo=function(){
            //获取已经保存在服务器发布的json数据 数据模板参考servicesData.infoTransform
        return DataHand.Sdata("get","get_info",{},{})
        }
        servicesData.publishInfo=function(data){
            //所有http请求直接返回 例如return $http(); 数据模板参考servicesData.infoTransform
        system.correspondingKey(servicesData.infoTransform,data);
        data.draflag = '1';
        return DataHand.Sdata("get","add_info",data,{}) 
        }
        return servicesData;
    });