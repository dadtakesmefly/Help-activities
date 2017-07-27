/**
 * Created by cnaisin06 on 2017/7/13.
 */
(function() {
    [].slice.call( document.querySelectorAll( '.tabs' ) ).forEach( function( el ) {
        new CBPFWTabs( el );
    });
})();

//js异常捕获
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
//                          window.location.href="itms-apps://itunes.apple.com/app/id1190774356"
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
//                        window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.cnaisin.axgy"
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
//                        console.log(result);
//                        console.log(result.data);
                    var html=template("list",result)
                    $("#section-iconbox-3").html(html);
//                        console.log(result.data.approvalStatus);

                    $.each(result.data, function (v,i) {
//                            console.log(v);
//                            console.log(i.approvalStatus);
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
    var userid=aisinJs.getUserId();
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




