angular.module('starter.publishActivityDirective',[])
    .directive('uploadPhotoControl',function(){
        var data;
            var html='<div class="upload-photo-control">'+
                '<div class="noeImage">'+
                '<p class="imageBox"><img src="./img/othere/addIcon.jpg"></p>'+
                '<input type="file" class="init" id="addImage">'+
                '</div>'+
                '</div>';
        function previewImage(file,callBack)
        {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(evt){
                callBack(evt.target.result);
            }
        }
        return {
            restrict:"A",
            template:html,
            replace:true,
            scope:true,
            controller:function($scope, $element, $attrs, $transclude,$ionicPopup,$rootScope){
                data=$scope.data||{};
                data.images=[];
                var addImageDom=document.getElementById('addImage');
                console.log(addImageDom)
                var addImage=angular.element(addImageDom);
                $scope.removeFn=function(that){
                    var src=that.find('img')[0].src;
                    var confirmPopup = $ionicPopup.confirm({
                        title: '确认删除这张图片吗？',
                        template: '<p class="center">你将删除这张图片!</p><br><p class="center"><img src="'+src+'"  style="width:64px"></p>'
                    });
                    confirmPopup.then(function(res) {
                        if(res) {
                            var name=that.attr('name');
                            var index=-1;
                            data.images.map(function(noe,i){
                                if(noe.name==name){
                                    index=i;
                                }
                            });
                            if(index!=-1){
                                data.images.splice(index,1);
                                that.remove();
                            }
                        } else {

                        }
                    });
                };
                $scope.addImageFn=function (file,$element){
                    var noe={
                        name:file.name,
                        file:file
                    };
                    previewImage(file,function(src){
                        noe.html='<div class="noeImage" ng-click="removeFn(this)" name="'+file.name+'">'+
                            '<p class="imageBox"><img src="'+src+'"></p>'+
                            '<i class="ion-android-close close"></i>'+
                            '</div>';
                        var noeImage=angular.element(noe.html);
                        noe.src=src;
                        data.images.push(noe);
                        $element.prepend(noeImage);
                        noeImage.on('click',function(){
                            $scope.removeFn(angular.element(this));
                        });
                        console.log('更新了')
                    });
                }
                $scope.change=function(){
                    var that=this;
                    if(!(that.files&&that.files.length)){
                        return false;
                    }
                    var file=that.files[0];
                    if(!(/(\.jpg$|\.png$|\.jpeg$)/).test(file.name)){
                        $ionicPopup.alert({
                            title: '您选择的不是图片！',
                            template: '<p class="center">请重新选择！</p>'
                        });
                        addImage.val('');
                        return false;
                    }
                    that.files=[];
                    addImage.val('');
                    $scope.addImageFn(file,$element);
                };
                addImage.on('change',$scope.change);
            }

        }
    })
    .directive('attachInfo',function(){
        return {
            restrict:"A",
            templateUrl:'./templates/public/attachInfo-directive.html',
            replace:false,
            scope:true,
            controller:function($scope){
                $scope.noeType={
                    "icon":"ion-android-happy",
                    "text":""
                };
                $scope.removeFn=function(type){
                    if(type&&type.remove){
                        type.removeDom=true;
                    }
                };
                $scope.addFn=function(){
                    $scope.lists.push({
                        "icon":"ion-android-happy",
                        "text":$scope.noeType.text,
                        "remove":true,
                        "checkBox":true
                    });
                    $scope.noeType.text='';
                    $scope.addItemShow=false;
                };
            }
        }
    })

