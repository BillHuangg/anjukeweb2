jQuery(document).ready(function ($) {
    $(document).foundation();

    UIInit();
    buttonEventInit();

    // cookies manger for whether raffled
    CookiesManager.init();

    // alert(CookiesManager.isRaffled);

    QuestionManager.init();

    // page navigation
    function pageNavigation() {
        //

    }

    function buttonEventInit() {
        $('#home-button').click(function() {
            // questions start
            $('#home-page-container').hide();

            //change bg to blur
            $('#blur-bg').show();

            // show questions part
            QuestionManager.showQuestionAtIndex(0);
            $('#question-page-container').show();
        });

        $('.answer-li').click(function() {
            var self = $(this);

            QuestionManager.answerButtonEvent(self.attr('data-role'));
            
            if (QuestionManager.currentQuestionIndex == -999) {
                // next page
                console.log('next page');
                $('#question-page-container').hide();
                $('#type-page-container').show();
                for(var i = 0; i < 5; i++) {
                    console.log(QuestionManager.typeScoreList[i]);
                }
                drawRadar();
            }

            
        });
    }

    function UIInit() {
        // $('#home-page-container').show();
        $('#type-page-container').show();        
        drawRadar();
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
                    data : [2,4,2,3,2]
                    // data : QuestionManager.typeScoreList
                }
            ]
        };

        var ctx = $("#radar-canvas").get(0).getContext('2d');
        

        var radarChart = new Chart(ctx).Radar(data);
    }
});