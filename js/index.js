jQuery(document).ready(function ($) {
    $(document).foundation();


    UIInit();
    buttonEventInit();

    RaffleManager.init();
    QuestionManager.init();

    /********************* Init Function *********************/
    function UIInit() {
        $('#home-page-container').show();
        // showRaffleThingPage();
        // showRaffleFinishedPage();
        // showRaffleNothingPage();
        // showAlreadyRaffledPage();
        // $('#type-page-container').show();        
        // drawRadar();
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
        });

        $('#rafflething-page-button').click(function() {
            var phoneNum = $('#rafflething-page-input').val();

            if(verifyPhoneNumber(phoneNum)) {
                RaffleManager.userPhoneNumber = phoneNum;
                showSharePage();
            } else {
                // wait for correct input
            } 
        });
    }

    /********************* UI Page Function *********************/

    function showQuestionPage() {
        console.log('questions page');

        // questions page
        $('#home-page-container').hide();

        //change bg to blur
        $('#blur-bg').show();

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
        drawRadar();
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
        $('#blur-bg').show();
        $('#rafflenothing-page-container').show();
    }


    function showRaffleThingPage() {
        // raffle thing
        console.log('raffle thing page');

        var resultValue = RaffleManager.raffleResultValue;
        $('#rafflething-page-result-container div h1').text(resultValue);
        $('#rafflething-page-text-1').text('恭喜您获得' + resultValue + '元话费');

        $('.ajk-page').hide();
        $('#blur-bg').show();
        $('#rafflething-page-container').show();
    }

    function showRaffleFinishedPage() {
        // raffle finished
        console.log('raffle finished page');

        $('.ajk-page').hide();
        $('#blur-bg').show();
        $('#rafflefinished-page-container').show();

        
    }

    function showSharePage() {
        console.log('raffle share page');

        $('.ajk-page').hide();
        $('#blur-bg').show();
        $('#share-page-container').show();
    }

    function showContactPage() {
        console.log('raffle contact page');

        $('.ajk-page').hide();
        $('#blur-bg').show();
        $('#contact-page-container').show();
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
    
    function drawRadar() {
        var data = {
            labels : ['住房指数', '环境指数', '生存指数', '健康指数', '压力指数'],
            datasets : [
                {
                    fillColor : "rgba(255,255,255,0.5)",
                    strokeColor : "rgba(255,255,255,0)",
                    pointColor : "rgba(255,255,255,0)",
                    pointStrokeColor : "rgba(255,255,255,0)",
                    data : QuestionManager.typeScoreList
                }
            ]
        };

        var ctx = $("#radar-canvas").get(0).getContext('2d');
        var option = {
            scaleLineColor : "rgba(255,255,255,1)",
            scaleFontColor : "rgba(255,255,255,1)",
            angleLineColor : "rgba(255,255,255,1)",
            // scaleShowLine : true,
            // datasetFill : false,
        }

        var radarChart = new Chart(ctx).Radar(data, option);
    }
});