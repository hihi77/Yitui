var app = angular.module('starter.publishToHireServices', []);
app

    .factory('publishToHireServices', function ($http,$q,$ionicLoading,system,DataHand,localStorageService) {
        var servicesData={};
        var userId = localStorageService.get('id');
        var quote;
        /**
         * 选择地区 选择职能
         * **/
        servicesData.selectTmpServices={};
        servicesData.get=system.httpGet;
        quote=servicesData.selectTmpServices;
        quote.config={
            "area": {
                "title": "地区",
                "getData": function(){
                    var promise=servicesData.get('./data/area.json',{'cache':true});
                    var deferred=$q.defer();
                    promise.then(function(result){
                        var exeDate={};
                        result.data.map(function(noe){
                            if(noe.name!='请选择'){
                                exeDate[noe.name]=[];
                                if(noe.sub instanceof  Array){
                                    noe.sub.map(function(subNoe){
                                        if(subNoe.name!='请选择'&&subNoe.name!='其他'){
                                            exeDate[noe.name].push(subNoe.name);
                                        }
                                    });
                                }
                            }
                        });
                        deferred.resolve({
                          data:exeDate
                        });
                    },function(data){
                        deferred.reject(data);
                    });
                    return deferred.promise;
                }
            },
            "duty": {
                "title": "职能",
                "getData": function(){
                    return servicesData.get('./testData/duty.json',{'cache':true});
                }
            }
        };
        /**
         * 选择行业
         * **/
        servicesData.selectTradeServices={};
        servicesData.selectTradeServices.getData=function(){
            return servicesData.get('./testData/trade.json',{'cache':true});
        };


        /*
        * 选择年薪
        * */
        servicesData.yearlySalary={};
        servicesData.yearlySalary.getData=function(){
            return servicesData.get('./data/yearlySalary.json',{'cache':true});
        };

        /*
        * 岗位性质
        * */
        servicesData.jobCharacteristics={};
        servicesData.jobCharacteristics.getData=function(){
            return servicesData.get('./testData/jobCharacteristics.json',{'cache':true});
        };
        /*
         * 岗位描述
         * 岗位要求
         * 岗位性质
         * */
        servicesData.jobDescription={};
        servicesData.jobDescription.config={
            "describe": {
                "title": "岗位描述",

            },
            "demand": {
                "title": "岗位要求",

            },
            "property":{
                "title": "岗位性质",
            }
        };
        servicesData.infoTransform={//提交信息数据模板
            "公司名称":"company",
            "地区":"address",
            "行业":"industry",
            "职能":"responsibility",
            "年薪":"salary",
            "岗位描述":"jobDescription",
            "岗位要求":"jobRequirements",
            "岗位特点":"jobCharacteristics",
            "岗位性质":"jobNature",
            "公司邮箱":"companyMail",
            "公司地址":"companyAddress",
            "推荐奖励":"recommendedAward",
            "推荐成功奖励":"recommendedSuccess",
            "选择日期":"time"
        };
        servicesData.template={//提交信息数据模板
            "公司名称":"",
            "地区":"",
            "行业":"",
            "职能":"",
            "年薪":"",
            "岗位描述":"",
            "岗位要求":"",
            "岗位特点":"",
            "岗位性质":"",
            "公司邮箱":"",
            "公司地址":"",
            "推荐奖励":"",
            "推荐成功奖励":"",
            "选择时间":""
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
            return DataHand.Sdata("get","add_hire",data,{})
          }
          else if(source=="circle"){
            data.type = "hire";
            return DataHand.Sdata("get","update_circle_rRecord",data,{})
          }
        }

        servicesData.getInfo=function(){
            //获取已经保存在服务器发布的json数据 数据模板参考servicesData.infoTransform
        return DataHand.Sdata("get","get_hire",{},{})
        }
        servicesData.publishInfo=function(data,source){
            //所有http请求直接返回 例如return $http(); 数据模板参考servicesData.infoTransform
        system.correspondingKey(servicesData.infoTransform,data);
        data.draflag = '1';
        data.userId = userId;
        if(source=="publish"){
            return DataHand.Sdata("get","add_hire",data,{})
          }
          else if(source=="circle"){
            data.type = "hire";
            return DataHand.Sdata("get","update_circle_rRecord",data,{})
          }
        }
        return servicesData;
    });
