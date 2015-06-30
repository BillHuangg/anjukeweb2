jQuery(document).ready(function ($) {
    $(document).foundation();

    WXJSInit();
    UIInit();
    buttonEventInit();

    ServiceHelper.sendReportOnReady(null, null);
    RaffleManager.init();
    QuestionManager.init();

    /********************* Init Function *********************/

    function WXJSInit() {
        ServiceHelper.getWXJSInfo(null, initWXJS, null);
    }

    function initWXJS(data) {

        console.log(data);

        wx.config({
            debug: true,
            appId: data['appId'],
            timestamp: data['timestamp'],
            nonceStr: data['nonceStr'],
            signature: data['signature'],
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
            ]
        });
        
        wx.ready(function(){
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            console.log('ready');
            // alert('ready');
            // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
            $('#contact-button').click(function() {
                wx.checkJsApi({
                    jsApiList: [
                        'getNetworkType',
                        'previewImage'
                    ],
                    success: function (res) {
                        alert(JSON.stringify(res));
                    }
                });
            });
        
            $('#share-button').click(function () {
                wx.onMenuShareAppMessage({
                    title: '互联网之子',
                    desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
                    link: 'http://movie.douban.com/subject/25785114/',
                    imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
                    trigger: function (res) {
                        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                        alert('用户点击发送给朋友');
                    },
                    success: function (res) {
                        alert('已分享');
                    },
                    cancel: function (res) {
                        alert('已取消');
                    },
                    fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                });
                alert('已注册获取“发送给朋友”状态事件');
            });
        });

        // wx.error(function(res) {
        //     // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        //     console.log(res);
        // });
        
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

        drawRadar($("#share-radar-canvas").get(0).getContext('2d'));
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
        $('#type-page-advice').html(QuestionManager.getScoreAdvice());
    }
    
    function updateSharePageUI() {
        $('#share-page-title').text('恭喜您获得 ' + RaffleManager.raffleResultValue + ' 元话费');
        $('#share-page-score').html('您的适居指数为 ' + QuestionManager.totalScore);
        $('#share-page-advice').html(QuestionManager.getScoreAdvice());

        // set for share content
        document.title = '我是' + QuestionManager.getCharacterType() + '，适居指数' + QuestionManager.totalScore + '，抽到' +  RaffleManager.raffleResultValue + '元话费。你也来测测你的购房十年吧！';
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
});