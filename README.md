# Help-activities
该活动只能在app内才能报名，浏览器打开会尝试启动app，无app则会跳转到下载的应用市场

判断该页面是否在app内，需要调用app的原生js方法，如在app外，则调用不了
## 核心方法 try catch
     function tst()
       {
           try
           { 
               alllert("asdf");  //可能出错的代码写在try里面
               //var i = 1;
               //i = "sss";
           }
           catch(msg)
           {
               /*for(var p in msg){
                document.writeln(msg[p]);
                }*/
               //上面可以遍历错误
               if(msg instanceof EvalError){
                   //如果非法调用了eval()函数，则会抛出EvalError的异常。
                   alert("EvalError");
               }else if(msg instanceof ReferenceError){
                   //从字面的意思应该是调用了错误的引用，此例子是执行到了本步。
                   alert("ReferenceError");
               }else if(msg instanceof RangeError){
                   //数值超出了范围
                   alert("RangeError");
               }else if(msg instanceof SyntaxError){
                   //语法错误，错误发生在eval()，
                   alert("SyntaxError");
               }else if(msg instanceof TypeError){
                   //变量类型不是预期的
                   alert("TypeError");
               }else if(msg instanceof URIError){
                   //错误发生在encodeURI()或decodeURI()中
                   alert("URIError");
               }
           }
       }tst()
       
       
## 异常捕获之 window.onerror
              window.onerror = function(e) {
                if(e){
                    $(".mask").show();
                    $("#close").on("click", function () {
                        $(".mask").hide();
                    })
                    function openApp(){
                        //  var schemeUrl = 'app里即有的协议如：  apps custom url schemes ';
                        var data = {"type":"Normal","relatId":"","title":"","content":"","remark":""};
                        var schemeUrl = "cnaisin://?data="+JSON.stringify(data);
                        if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
                            var loadDateTime = new Date();
                            window.setTimeout(function() {
                                var timeOutDateTime = new Date();
                                if (timeOutDateTime - loadDateTime > 5000) {

                                    return

                                } else {  
                                    window.open("itms-apps://itunes.apple.com/app/id1190774356")
                                }
                            },25);
                            window.location.href = schemeUrl;
                        } else if (navigator.userAgent.match(/android/i)) {
                            var state = null;
                            try {
                                state = window.open(schemeUrl, '_self');
                            } catch(e) {}
                            if (state) {
                                window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.cnaisin.axgy"
                            } else {

                            }
                        }

                    }

                    $(".index_add").on("click", function () {
                        openApp();
                    })
                    //异常时候仍能加载数据（APP外部）
                    $(function () {
                        $.ajax({
                            url:rescueObjectUrl,
                            data:{"userId":''},
                            success: function (result) {
                                var html=template("list",result)
                                $("#section-iconbox-3").html(html);
                                    console.log(result.data.approvalStatus);

                                $.each(result.data, function (v,i) {
                                        console.log(v);
                                        console.log(i.approvalStatus);
                                    if( i.approvalStatus == "success"){
                                        $(".status").html("报送成功").css({
                                            "color":"green","border":"1px solid green"
                                        })
                                    }
                                    else{
                                        $(".status").html("条件不符").css({
                                            "color":"#E94F3B","border":"1px solid #E94F3B"
                                        })
                                    }
                                })

                            }
                        })
                    })
                }
            }
            //获取用户id
            window.onload= function () {
                //alert(aisinJs.getUserId());
                var userid=aisinJs.getUserId(); //app内才有的方法，app外就会报错，然后执行window.onerror里面的代码
                $("#getuserid").attr("value",userid);
                if(userid != ""){
                    document.getElementById("takein").href="./InfoCollection.html"+"?userid="+userid
                }
            }
            //没有获取到异常时候加载数据（APP内）
            $(function () {
                $.ajax({
                    url:rescueObjectUrl,
                    data:{"userId":aisinJs.getUserId()},
                    success: function (result) {
                        //console.log(result);
                        //console.log(result.data);
                        var html=template("list",result)
                        $("#section-iconbox-3").html(html);
                        //console.log(result.data.approvalStatus);
                        $.each(result.data, function (v,i) {
                            //console.log(v);
                            //console.log(i.approvalStatus);
                            if( i.approvalStatus == "success"){
                                $(".status").html("报送成功").css({
                                    "color":"#6D7883","border":"1px solid #6D7883"
                                })
                            }
                            else{
                                $(".status").html("条件不符").css({
                                    "color":"#E94F3B","border":"1px solid #E94F3B"
                                })
                            }
                        })

                    }
                })
            })

## 分步式提交表单
    css样式隐藏，显示当前页，隐藏其他


  
    
