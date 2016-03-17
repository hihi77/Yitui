angular.module('starter.discoverServices',[])
  .factory('discoverServices',function(system,$http,$q,DataHand,localStorageService){
    var servicesData={};
    var userId = localStorageService.get('id');
    servicesData.getDiscoverIndexData=function(){
      //获取发现首页数据
      return DataHand.Sdata("get", "get_index_detail",{},{})
      //return system.httpGet('./testData/discoverIndexData.json');
    }
    //获取活动 相应地区的信息
    servicesData.getAreaActivity=function(area){
      //area 地区参数 比如上海
      /*
      数据格式
       [
       {
       "type":"类型一",
       "data":[
       {
       "title":"骑在路上",
       "phoneUrl":"http://h.hiphotos.baidu.com/image/h%3D200/sign=a28cdfce86cb39dbdec06056e01609a7/8ad4b31c8701a18bf89ea96b992f07082838fe99.jpg",
       "time":"02月15日(周一)16:00 ",
       "address":"上海市 徐汇区 越界创业中心",
       "price":"100",
       "applicants":"100"
       }
       ]
       }
       ]
      * */
      //for test 
      area = '徐汇区';
      return DataHand.Sdata("get","get_activity_area",{},{draflag:'1', address:area});
      //return system.httpGet('./testData/areaActivity.json');
    }

    servicesData.getInvestByType=function(param){
      if(param.area){
        
        return DataHand.Sdata("get","get_invest_byType",{},{draflag:'1'});
      }else if(param.id){
        
        return DataHand.Sdata("get","get_circle_item",{investigtion:1},{circleId:param.id});
      }
      
      
      //return system.httpGet('./testData/areaActivity.json');
    }
    servicesData.getItemActivityDetailed=function(id){
      //获取单个活动详情
      var  data={
        "activityTime":"02月15日(周一)16:00 - 02月16日14:00进行",//活动时间
        "activeAddress":true,//是不是线上活动
        "price":0,//金额 如果是0显示免费
        "signUpCount":20,//报名总数
        "signUpSuccess":3,//报名成功数
        "overallMerit":4.2,//综合评价
        "evaluationNumber":2,//评价人数
        "eventDetails":"如果你无法简洁的表达你的想法，那只说明你还不够了解它。<br>-- 阿尔伯特·爱因斯坦<br>如果你无法简洁的表达你的想法，那只说明你还不够了解它。<br>",//活动详情
        "signUpSuccessImages":[//报名成功人的头像
          "1","2","3"
        ]
      };
      console.log(id);
      return DataHand.Sdata("get","get_activity_detail",{},{id:id});
      //return system.httpGet('./testData/itemActivityDetailed.json');
    }
    servicesData.getActivityEvaluation=function(id){
      //获取活动评价
      //return system.httpGet('./testData/activityEvaluation.json');
      //return DataHand.Sdata("get","get_activity_evaluationModel",{},{id:id});
      return DataHand.Sdata("get","get_activity_evaluationModel",{},{id:id});
/*      var promise = DataHand.Sdata("get","get_activity_evaluationModel",{},{id:id});
      return promise.then(function(data){
        if(data){
          var rData = [];
          var datar = data.data["activity"];
          var len = datar.length;
          for (var i = 0; i < len; i++){
            alert(datar[i].checkBox)
            if(datar[i].checkBox==true){
               rData.push(datar[i]);
            }
          }
          data.data.activity = rData;
          return data;
        }
      }).then(function(data){
          var deferred = $q.defer();
          var rPromise = deferred.promise;
          deferred.resolve(data);
          return rPromise;
      })*/

    }
    servicesData.submitEvaluation=function(id,data){
      //提交活动评价
      //return $http({url:''});
      return DataHand.Sdata("get","submit_activity_rRecord",{data:data,type:"evaluation", userId:userId},{id:id})
    };
    servicesData.getRegistrationAdditional=function(id){
      //获取报名附加信息
      //return system.httpGet('./testData/registrationAdditional.json');//数据格式跟这个一样
      return DataHand.Sdata("get","get_activity_registrationAdditionalModel",{},{id:id})
    }
    servicesData.submitSignUp=function(id,data){
      //提交活动报名信息
      //return $http({url:''});
      var len = data.length;
      for(var i = 0; i < len; i++){
        delete data[i].$$hashKey;
      }
      console.log(data);
      return DataHand.Sdata("get","submit_activity_rRecord",{data:data,type:"signUp",userId:userId},{id:id});
    }
    servicesData.getToHireMore=function(param){
      //对应地区 例如上海-徐汇
      //for test 
      if(param.area){
        param.area = "徐汇区";
        return DataHand.Sdata("get","get_hire_byParam",{},{address:param.area});
      }else if(param.id){
        
        return DataHand.Sdata("get","get_circle_item",{hire:1},{circleId:param.id});
      }
      //return system.httpGet('./testData/partakeToHire.json');//数据格式跟这个一样
    }
    servicesData.getItemToHireDetailed=function(id){
      var data={
        "company":"xx",//招聘公司
        "address":"无地址",//公司地址
        "salary":"10--20w",//薪资
        "periodOfValidity":"xx-xx-xx xx:xx:xx",//有效期
        "postPublisher":{
          "heardPhotoUrl":"",
          "name":"马云",//姓名
          "position":"传世人",//职位
          "company":"阿里巴巴集团"//现在公司
        },
        "jobDescription":"无描述",//岗位描述
        "jobCharacteristics":[//岗位特点
          "特点1",
          "特点2"
        ],
        "jobRequirements":"无要求",//岗位要求
        "personalSkills":[//个人技能
          "技能1",
          "技能2"
        ],
        "jobNature":"全职",//岗位性质
        "companyMail":"xx@xx.com",//公司邮箱
        "recommendedAward":"100",//推荐奖励
        "recommendedSuccess":"100"//推荐成功奖励
      };
      return DataHand.Sdata("get","get_hire",{},{id:id});
    }

    servicesData.acceptAnOfferOfEmployment=function(id){
      //点击应聘
      return DataHand.Sdata("get", "apply_hire",{userId:userId},{id:id})
      //return $http({url:''})
    }
    servicesData.addFriends=function(data) {
      //才聘-发布人信息 添加好友
      // data.id 用户id text 附加信息
      return DataHand.Sdata("get","add_friends",data,{userId:userId})
    }
    servicesData.getIssuerUserIfo=function(id){
      //获取发布人信息 id不是用户id
      return system.httpGet('./testData/issuerUserIfo.json');
    }
    servicesData.getQuestionnaireSurvey=function(id){
      //获取问卷调查详情
      return DataHand.Sdata("get","get_invest_model",{},{id:id});
      //return system.httpGet('./testData/question.json');
    }
    servicesData.submittedQuestionnaire=function(id,data){
      //提交问卷
      data.userId = userId;
      return DataHand.Sdata("get","submit_invest_rRecord",{data:data,type:"investRecord"},{id:id})
    }
    servicesData.getInformationByType=function(param){
      //for test 
      if(param.area){
        
        return DataHand.Sdata("get","get_info_byType",{},{});
      }else if(param.id){
        
        return DataHand.Sdata("get","get_circle_item",{information:1},{circleId:param.id});
      }
      
      //return system.httpGet('./testData/areaInformation.json');
    }
    servicesData.getItemInformationDetailed=function(id){
      //获取单个信息详细数据
      //return system.httpGet('./testData/informationDetailed.json');
      return DataHand.Sdata("get","get_info_detail",{},{id:id});
    }
    servicesData.submitClickALike=function(id){
      //信息详细数据点赞
      //return $http({url:''})
      return DataHand.Sdata("get","submit_info_rRecord",{type:"alike",userId:userId},{id:id});
    }
    servicesData.submitComment=function(id){
      //信息详细数据评论
      //目前评论未做 你做假提交
      //return $http({url:''})
      //data.type = "comment";
      //data.userId = userId;
      return DataHand.Sdata("get","submit_info_rRecord",{type:"comment"},{id:id})
    }
    servicesData.submitBrowse = function(id){
      
      return DataHand.Sdata("get","submit_info_rRecord",{type:"browse",userId:userId},{id:id})
    }

    servicesData.discoverMap=function(scope,id){
      //进去了地图控制器
    }
    return servicesData;
  });
