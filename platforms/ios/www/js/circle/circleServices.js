angular.module('starter.circleServices', [])
  .factory('circleServices',function(system,$http,DataHand,localStorageService){
    var userId = localStorageService.get('id');
    var serviceData={};
        serviceData.infoTransform={//提交信息数据模板
          "加入条件": "requirement",
          "圈子名称": "title",
          "圈子描述": "describe",
          "圈子海报": "photoUrl",      
          "选择类型": "type",
          "是否公开": "open"
        };

    serviceData.getCircleIndexData=function(){
      //获取圈子首页数据
      //return system.httpGet('./testData/circleIndexData.json');
      return DataHand.Sdata("get","get_circle_index",{},{userId:userId})
    }
    serviceData.searchCircle=function(name){
      //搜索圈子 每次按下都会执行
      return DataHand.Sdata("get","get_circle_index",{title:name},{userId:userId})
    }
    serviceData.saveCircleRough=function(data){
      //保存圈子草稿
      data.draflag = '0';
      data.userId = userId;
      return DataHand.Sdata("get","add_circle",data,{});
    }
    serviceData.publishCircleInfo=function(data){
      //发布圈子
      system.correspondingKey(serviceData.infoTransform,data);
      //draflag = '0' means a draf item,'1' means a published item
      data.draflag = '1';
      data.userId = userId;
      return DataHand.Sdata("get","add_circle",data,{});
    }
    serviceData.getNotice=function(id){
      //获取圈子通知
      //return system.httpGet('./testData/notice.json');
      return DataHand.Sdata("get","get_circle_item",{notice:1},{circleId:id});
    }
    serviceData.getCircleActivity=function(id){
      //获取圈子活动信息
      //return system.httpGet('./testData/partakeActivity.json');
      return DataHand.Sdata("get","get_circle_item",{activity:1},{circleId:id});
    }

    serviceData.getCircleMembers=function(id){

       return DataHand.Sdata("get","get_circle_members",{members:1,"describe.text":1},{circleId:id});
      //return system.httpGet('./testData/circleMembersPageData.json');
    }

    serviceData.getAllMember=function(id){
      return DataHand.Sdata("get","get_circle_item",{members:1},{circleId:id});
      //return system.httpGet('./testData/allMembes.json');
    }
    serviceData.subNotice=function(id,text){
      data.type = "notice";
      return DataHand.Sdata("get","update_circle_rRecord",data,{circleId:id});
    }
    return serviceData;
  });
