jQuery(document).ready(function ($) {
    $(document).foundation();

    

    UIAutoSizing();

    WXJSInit();
    UIInit();
    buttonEventInit();

    ServiceHelper.sendReportOnReady(null, null);
    RaffleManager.init();
    QuestionManager.init();

    /********************* Init Function *********************/

    function UIAutoSizing() {

        var w =window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var h =window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        // alert(w + ':' + h);

        if(h >= 603) {
            // iPhone 6
            $('#type-page-container').css('padding-top', '8%');
            // $('#type-page-advice').css('font-size', '2em');

            $('#share-page-container').css('padding-top', '12%');
            // $('#share-page-advice').css('font-size', '2em');
        } else {
            // iPhone 5
            $('#question-page-container').css('padding-top', '10%');
        }
    }

    function WXJSInit() {
        ServiceHelper.getWXJSInfo(null, initWXJS, null);
    }

    function UIInit() {
        $('#home-page-container').show();

        // test page
        // showTypePage();
        // showContactPage();
        // showRaffleThingPage();
        // showRaffleFinishedPage();
        // showRaffleNothingPage();
        // showAlreadyRaffledPage();
        // showSharePage();
    }

    // page navigation event
    function buttonEventInit() {

        $('#home-button').click(function() {
            showQuestionPage();
        });

        $('.answer-li').click(function() {
            var self = $(this);

            QuestionManager.answerButtonEvent(self.attr('data-role'));
            
            if (QuestionManager.currentQuestionIndex == -999) {
                showTypePage();
            }
        });

        $('#type-page-button').click(function() {
            // raffle page
            console.log('send raffle request');
            RaffleManager.sendRaffleRequest(showAlreadyRaffledPage, showRaffleNothingPage, showRaffleThingPage, showRaffleFinishedPage);
        });

        $('#alreadyraffled-button').click(function() {
            showContactPage();
        });

        $('#rafflefinished-button').click(function() {
            showContactPage();
        });

        $('#rafflenothing-page-button').click(function() {
            showSharePage();
            // showContactPage();
        });

        $('#rafflething-page-button').click(function() {
            var phoneNum = $('#rafflething-page-input').val();

            if(verifyPhoneNumber(phoneNum)) {
                RaffleManager.userPhoneNumber = phoneNum;
                RaffleManager.sendResult();
                showSharePage();
            } else {
                // wait for correct input
            } 
        });

        $('#share-button').click(function() {
            // show share tip
            showShareTipPage();
        });

        $('#contact-button').click(function() {
            showContactPage();
        });

        $('#share-button-2').click(function() {
            // show share tip
            showShareTipPage();
        });

        $('#contact-button-2').click(function() {
            showContactPage();
        });

        $('#sharetip-page-container').click(function() {
            hideShareTipPage();
        });
    }

    /********************* UI Page Function *********************/

    function showQuestionPage() {
        console.log('questions page');

        // questions page
        $('#home-page-container').hide();

        $('body').css('background-image','url(src/bg-blur.jpg)');

        //change bg to blur
        // $('#blur-bg').show();

        // show questions part
        QuestionManager.showQuestionAtIndex(0);
        $('#question-page-container').show();
    }

    function showTypePage() {
        // type page
        console.log('type page');
        
        updateTypePageUI();
        $('#question-page-container').hide();
        $('#type-page-container').show();
        drawRadar($("#radar-canvas").get(0).getContext('2d'));
        // for(var i = 0; i < 5; i++) {
        //     console.log(QuestionManager.typeScoreList[i]);
        // }
    }

    function showAlreadyRaffledPage() {
        // already raffled
        console.log('already raffle page');
        $('#type-page-container').hide();
        $('#alreadyraffled-page-container').show();
    }

    function showRaffleNothingPage() {
        // raffle nothing
        console.log('raffle nothing page');
        $('.ajk-page').hide();
        // $('#blur-bg').show();
        $('#rafflenothing-page-container').show();

        var tempString = '我是' + QuestionManager.getCharacterType() + '，适居指数' + QuestionManager.totalScore + '。你也来测测你的购房十年吧！';
        // set for share content
        settingShareInfo2('安居客－购房十年', tempString);
    }


    function showRaffleThingPage() {
        // raffle thing
        console.log('raffle thing page');

        var resultValue = RaffleManager.raffleResultValue;
        //$('#rafflething-page-result-container div h1').text(resultValue);
        $('#rafflething-page-result-container div img').attr('src', 'src/' + resultValue + '.png');
        $('#rafflething-page-text-1').text('恭喜您获得 ' + resultValue + ' 元话费');

        $('.ajk-page').hide();
        // $('#blur-bg').show();
        $('#rafflething-page-container').show();
    }

    function showRaffleFinishedPage() {
        // raffle finished
        console.log('raffle finished page');

        $('.ajk-page').hide();
        // $('#blur-bg').show();
        $('#rafflefinished-page-container').show();
    }

    function showSharePage() {
        console.log('raffle share page');


        updateSharePageUI();
        $('.ajk-page').hide();
        // $('#blur-bg').show();
        $('#share-page-container').show();

        // drawRadar($("#share-radar-canvas").get(0).getContext('2d'));
    }

    function showContactPage() {
        console.log('raffle contact page');
        
        $('.ajk-page').hide();
        // $('#blur-bg').show();
        $('#contact-page-container').show();
    }

    function showShareTipPage() {
        $('#sharetip-page-container').show();
    }

    function hideShareTipPage() {
        $('#sharetip-page-container').hide();
    }

    /********************* Utility Function *********************/

    function verifyPhoneNumber(value) {
        if(value == "" || value == undefined) {
            alert("手机号码不能为空");
            return false;
        } else {
            // check all number
            if(isNaN(value)) {
                alert("输入错误，只能输入手机号码哦");
                return false;
            } else {
                return true;
            }
        }
    }

    function updateTypePageUI() {
        $('#type-page-score').html('您的适居指数为 ' + QuestionManager.totalScore);
        $('#type-page-character').html(QuestionManager.getCharacterType());
        $('#type-page-advice').html(QuestionManager.getScoreAdvice());
    }
    
    function updateSharePageUI() {

        if(RaffleManager.raffleResultValue <= 0) {
            $('#share-page-title').text('很遗憾，您未中奖');
        } else {
            // $('#share-page-title').text('恭喜您获得 ' + RaffleManager.raffleResultValue + ' 元话费');
        }

        // $('#share-page-score').html('您的适居指数为 ' + QuestionManager.totalScore);
        // $('#share-page-character').html(QuestionManager.getCharacterType());
        // $('#share-page-advice').html(QuestionManager.getScoreAdvice());

        var ts = '，抽到' +  RaffleManager.raffleResultValue + '元话费';
        if(RaffleManager.raffleResultValue <= 0) {
            ts = '';
        }

        var tempString = '我是' + QuestionManager.getCharacterType() + '，适居指数' + QuestionManager.totalScore + ts + '。你也来测测你的购房十年吧！';
        // set for share content
        settingShareInfo2('安居客－购房十年', tempString);
        // document.title = tempString;
    }

    function drawRadar(ctx) {


        var data = {
            labels : ['住房指数', '环境指数', '生存指数', '健康指数', '压力指数'],
            datasets : [
                {
                    fillColor : "rgba(255,255,255,0.5)",
                    strokeColor : "rgba(255,255,255,0)",
                    pointColor : "rgba(255,255,255,0)",
                    pointStrokeColor : "rgba(255,255,255,0)",
                    // data : [2,2,1,4,3]
                    data : QuestionManager.typeScoreList
                },
                {
                    // this dataset just for ui setting
                    fillColor : "rgba(255,255,255,0)",
                    strokeColor : "rgba(255,255,255,0)",
                    pointColor : "rgba(255,255,255,1)",
                    pointStrokeColor : "rgba(255,255,255,1)",
                    data : [4,4,4,4,4]
                    // data : QuestionManager.typeScoreList
                }
            ]
        };

        // var ctx1 = $("#radar-canvas").get(0).getContext('2d');
        // var ctx2 = $("#share-radar-canvas").get(0).getContext('2d');
        var option = {
            scaleLineColor : "rgba(255,255,255,1)",
            angleLineColor : "rgba(255,255,255,1)",
            scaleFontColor: "rgba(0,0,0,0)",
            scaleOverride: true,
            scaleSteps: 1,
            scaleStepWidth: 4,
            scaleStartValue: 0,
            responsive: true,
            maintainAspectRatio: true,
            animation: false,
            showTooltips: false,
        }

        var radarChart1 = new Chart(ctx).Radar(data, option);
    }

    /********************* WXJS Function *********************/

    function initWXJS(data) {

        wx.config({
            debug: false,
            appId: data['appId'],
            timestamp: data['timestamp'],
            nonceStr: data['nonceStr'],
            signature: data['signature'],
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
            ]
        });
        
        wx.ready(function(){
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            console.log('ready');
            
            settingShareInfo1();
            
        });
        
        wx.error(function(res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            console.log(res);
        });
    }

    function settingShareInfo1() {
        wx.onMenuShareTimeline({
            title: '安居客－购房十年',
            link: 'http://www.miugodigital.com/apps/anjukeweb2',
            imgUrl: 'http://www.miugodigital.com/apps/anjukeweb2/src/icon.jpg',

            success: function () { 
                // 
            },
            cancel: function () { 
                //
            }
        });

        wx.onMenuShareAppMessage({
            title: '安居客－购房十年',
            desc: '亮出你的指数，赢取话费吧！',
            link: 'http://www.miugodigital.com/apps/anjukeweb2',
            imgUrl: 'http://www.miugodigital.com/apps/anjukeweb2/src/icon.jpg',

            trigger: function (res) {
                //alert('用户点击发送给朋友');
                console.log(res);
            },

            success: function (res) {
                //alert('已分享');
            },

            cancel: function (res) {
                //alert('已取消');
            },

            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });
    }

    function settingShareInfo2(title, desc) {
        wx.onMenuShareTimeline({
            title: desc,
            link: 'http://www.miugodigital.com/apps/anjukeweb2',
            imgUrl: 'http://www.miugodigital.com/apps/anjukeweb2/src/icon.jpg',

            success: function () { 
                // 
            },
            cancel: function () { 
                //
            }
        });

        wx.onMenuShareAppMessage({
            title: title,
            desc: desc,
            link: 'http://www.miugodigital.com/apps/anjukeweb2',
            imgUrl: 'http://www.miugodigital.com/apps/anjukeweb2/src/icon.jpg',

            trigger: function (res) {
                //alert('用户点击发送给朋友');
                console.log(res);
            },

            success: function (res) {
                //alert('已分享');
            },

            cancel: function (res) {
                //alert('已取消');
            },

            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });
    }
});