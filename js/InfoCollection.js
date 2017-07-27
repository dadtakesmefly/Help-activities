/**
 * Created by cnaisin06 on 2017/7/13.
 */

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}


$(function () {

        var userid=GetQueryString("userid");

        //var userid=aisinJs.getUserId();
        //alert(userid);
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    $.ajax({
        url:userInfoUrl,
        data:{"userId":userid},
        success: function (data) {
            console.log(data);
            $("#investigatorName").val(data.name);
            $("#investigatorTel").val(data.phone);
            console.log(data.sex);
            //动态设置option的选项
            $("#investigatorSex option[value='"+data.sex+"']").attr("selected","selected")

            $("#userId").val(userid);
            console.log(data.teamList.length);
            console.log(data.teamList[0].name);
            //动态创建option的选项
            for(var i=0;i<data.teamList.length;i++){
                var new_option = "<option value="+data.teamList[i].name+">"+data.teamList[i].name+"</option>";
                console.log(new_option);
                $("#teamName").append(new_option);
            }

        }
    })
    //第一页
    $(".two_form,.three_form").hide();


    //第二页
    $("#step_one").on("click", function () {

        var investigatorName = $("#investigatorName").val()
        console.log(investigatorName);

        var investigatorTel = $("#investigatorTel").val()
        console.log(investigatorTel);

        var investigatorSex = $("#investigatorSex").val()
        console.log(investigatorSex);

        var teamName = $("#teamName").val();
        console.log(teamName);

        var userId = $("#userId").val()
        console.log(userId);

        if ((investigatorName != "") && (investigatorTel != "") && (investigatorSex != "") && (teamName != "")) {

            $(".one_form,.three_form").hide();
            $(".two_form").show();
            $("html,body").animate({scrollTop:0}, 0);
        }
        else{
            layer.open({
                skin:"demo-class",
                title:"提示",
                content:"请将信息填写完整",
            })
        }
    })
    //第三页
    $("#step_two").on("click", function () {

        var childname = $("#childname").val()
        console.log(childname);

        var childpic = $("#childpic").val()
        console.log(childpic);

        var childSex = $("#childSex").val()
        console.log(childSex);

        var childAge = $("#childAge").val()
        console.log(childAge);

        var childBorn = $("#childBorn").val()
        console.log(childBorn);

        var area = $("#area").val()
        console.log(area);

        var childIDCard = $("#childIDCard").val()
        console.log(childIDCard);

        //var desc = $("#desc").val()
        //console.log(desc);

        $("#desc").on("blur", function () {
            isTextAreaNull()
        })
        //textarea的值
        var str=document.getElementById("desc").value.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "");

        if( (childname!="")&&(childpic!="")&&(childSex!="")&&(childAge!="")&&(childBorn!="")&&(area!="")&&(childIDCard!="")&&(str!="")) {

            $(".one_form,.two_form").hide();
            $(".three_form").show();
            $("html,body").animate({scrollTop:0}, 0);
        }
        else{
            layer.open({
                skin:"demo-class",
                title:"提示",
                content:"请将信息填写完整",
            })
        }
    })

    $("#sbm").on("click", function () {

        var guardianName = $("#guardianName").val()
        console.log(guardianName);

        var relation = $("#relation").val()
        console.log(relation);

        var guardianSex = $("#guardianSex").val()
        console.log(guardianSex);

        var guardianNation = $("#guardianNation").val()
        console.log(guardianNation);

        var adress = $("#adress").val()
        console.log(adress);

        var guardianTel = $("#guardianTel").val()
        console.log(guardianTel);

        var guardianIDCard = $("#guardianIDCard").val()
        console.log(guardianIDCard);

        console.log($("#myform").serialize());
        console.log(JSON.stringify($("#myform").serialize()));
        if( (guardianName!="")&&(relation!="")&&(guardianSex!="")&&(guardianNation!="")&&(adress!="")&&(guardianTel!="")&&(guardianIDCard!="")){

            $.ajax({
                url:submitUrl,
                contentType:"application/x-www-form-urlencoded",
                data:$("#myform").serialize(),
                success: function (data) {
                    console.log(data);
                    if (isAndroid) {
                        layer.open({
                            skin:"demo-class",
                            title:"提示",
                            content:"报送成功",
                            end: function(){window.location.href="./index.html"}
                        });
                    }
                    if (isIOS) {
                        layer.open({
                            skin:"demo-class",
                            title:"提示",
                            content:"资料报送成功，如果您需要继续提交请关闭本页面。重新打开本页面后再操作，谢谢！",
                            end: function(){window.location.href="./index.html"}
                        });
                    }


                },

            })

        }
        else{
            layer.open({
                skin:"demo-class",
                title:"提示",
                content:"请将信息填写完整",
            })
        }
    })

})

//第一页
var investigatorName=document.getElementById("investigatorName")
var reginvestigatorName=/^[\u4e00-\u9fa5]{2,}$/;
check(investigatorName,reginvestigatorName);
var investigatorTel=document.getElementById("investigatorTel");
var reginvestigatorTel=/^0?(13|14|15|18)[0-9]{9}$/
check(investigatorTel,reginvestigatorTel);


//第二页
var childname=document.getElementById("childname")
var regchildname=/^[\u4e00-\u9fa5]{2,}$/;
check(childname,regchildname);
//    var desc=document.getElementById("desc");
//    var regdesc=/[\dA-Za-z\u4E00-\u9FA5]+/
//    check(desc,regdesc);

//第三页
var guardianName=document.getElementById("guardianName")
var regguardianName=/^[\u4e00-\u9fa5]{2,}$/;
check(guardianName,regguardianName);

var relation=document.getElementById("relation")
var regRelation=/^[\u4e00-\u9fa5]{2,}$/;
check(relation,regRelation);

var guardianNation=document.getElementById("guardianNation");
var regNation=/^[\u4e00-\u9fa5]{1,}$/;
check(guardianNation,regNation);

var adress=document.getElementById("adress");
var regAdress=/^(?=.*?[\u4E00-\u9FA5])[\d\u4E00-\u9FA5]+/
check(adress,regAdress);

var guardianTel=document.getElementById("guardianTel");
var regguardianTel=/^0?(13|14|15|18)[0-9]{9}$/
check(guardianTel,regguardianTel);

function check(inp, reg) {
    inp.onblur = function () {
        if (reg.test(this.value)) {
        } else {
            layer.open({
                skin:"demo-class",
                title:"提示",
                content:"输入错误",
            })
        }
    };
}

function IdentityCodeValid(code) {
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = "";
    var pass= true;

    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
        tip = "输入错误";
        pass = false;
    }

    else if(!city[code.substr(0,2)]){
        tip = "输入错误";
        pass = false;
    }
    else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
//                    tip = "输入错误";
                pass =false;
            }
        }
    }
    if(!pass){
        layer.open({
            skin:"demo-class",
            title:"提示",
            content:"输入错误",
        })
    }
    else{

    }
    return pass;
}
$("#childIDCard").on("blur", function () {
    var c=$("#childIDCard").val();
    console.log(c);
    IdentityCodeValid(c);
})

$("#guardianIDCard").on("blur", function () {
    var c=$("#guardianIDCard").val();
    console.log(c);
    IdentityCodeValid(c);
})

$("#single").on("click", function () {
    layer.open({
        type: 2,
        title: '上传患者照片',
        shadeClose: true,
        shade: false,
        maxmin: false, //开启最大化最小化按钮
        area: ['100%', '100%'],
        content: './upload.html'
    });
});

//判断textarea输入框不为空
function isTextAreaNull(){
    var str=document.getElementById("desc").value.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "");
    if(str==""){
        layer.open({
            skin:"demo-class",
            title:"提示",
            content:"输入错误",
        })
    }else{

    }
}