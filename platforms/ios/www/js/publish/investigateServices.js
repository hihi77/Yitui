angular.module('starter.publishInvestigateServices',[])
    .factory('publishInvestigateServices',function(system,DataHand,localStorageService){
        var servicesData={};
        var userId = localStorageService.get('id');
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
        "选择类型":"type",
        "标题":"title",
        "截止日期":"endTime",
        "问卷份数":"maxPortion",
        "问卷赏金":"moneyReward",
        "报告查看权限":"viewauthority",
        "问卷描述":"questdes",
        "问题":"questions"
      };
        /*
         * system.correspondingKey(obj,obj_);//对应注释在app.js
         * */
        servicesData.saveInfo=function(data,source){
            //保存草稿到服务器 数据模板参考servicesData.infoTransform
        system.correspondingKey(servicesData.infoTransform,data);
        data.draflag = '0';
        data.userId = userId;
          if(source=="public"){
            return DataHand.Sdata("get","add_invest",data,{})
          }
          else if(source=="circle"){
            data.type = "invest";
            return DataHand.Sdata("get","update_circle_rRecord",data,{})
          }
        }

        servicesData.getInfo=function(){
            //获取已经保存在服务器发布的json数据 数据模板参考servicesData.infoTransform
        //return DataHand.Sdata("get","get_invest",{},{})
        }
        servicesData.publishInfo=function(data,source){
            //所有http请求直接返回 例如return $http(); 数据模板参考servicesData.infoTransform
        system.correspondingKey(servicesData.infoTransform,data);
        data.draflag = '1';
        data.userId = userId;
        if(source=="public"){
            return DataHand.Sdata("get","add_invest",data,{})
          }
          else if(source=="circle"){
            data.type = "invest";
            return DataHand.Sdata("get","update_circle_rRecord",data,{})
          }
        }
        return servicesData;
    });
