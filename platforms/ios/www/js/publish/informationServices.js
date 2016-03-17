angular.module('starter.publishInformationServices',[])
    .factory('publishInformationServices',function(system,DataHand,localStorageService){
        var servicesData={};
        var userId = localStorageService.get('id');
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
            "选择类型":"type",
            "信息标题":"title",
            "信息详情":"des",
            "信息联系人":"contacts",
            "联系方式":"contactmethod",
            "信息截止时间":"endtime"
        };

        servicesData.template={//提交信息数据模板
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
        servicesData.saveInfo=function(data,source){
            //保存草稿到服务器 数据模板参考servicesData.infoTransform
        system.correspondingKey(servicesData.infoTransform,data);
        data.draflag = '0';
        data.userId = userId;
          if(source=="publish"){
            return DataHand.Sdata("get","add_info",data,{})
          }
          else if(source=="circle"){
            data.type = "information";
            return DataHand.Sdata("get","update_circle_rRecord",data,{})
          }

        }
        servicesData.getInfo=function(){
            //获取已经保存在服务器发布的json数据 数据模板参考servicesData.infoTransform
        //return DataHand.Sdata("get","get_u_info",{},{})
        }
        servicesData.publishInfo=function(data,source){
            //所有http请求直接返回 例如return $http(); 数据模板参考servicesData.infoTransform
        system.correspondingKey(servicesData.infoTransform,data);
        data.draflag = '1';
        data.userId = userId;
          if(source=="publish"){
            return DataHand.Sdata("get","add_info",data,{})
          }
          else if(source=="circle"){
            data.type = "information";
            return DataHand.Sdata("get","update_circle_rRecord",data,{})
          }
        }
        return servicesData;
    });