var QuestionManager = {
    currentQuestionIndex: -1,

    // final score
    totalScore: 0,
    // type: z h s j y
    // type score
    typeScoreList: [0, 0, 0, 0, 0],

    questionList: [
        {'content': "1. 你买房了吗", 'type': 0},
        {'content': '2. 你买的房在哪儿', 'type': 0},
        {'content': '3. 你装修过住所吗', 'type': 3},
        {'content': '4. 你结婚了吗', 'type': 4},
        {'content': '5. 你多大', 'type': 4},
        {'content': '6. 你提问时会说“...”', 'type': 2},
        {'content': '7. 你的娱乐方式是', 'type': 3},
        {'content': '8. 你喜欢你的邻居吗', 'type': 1},
        {'content': '9. 你去菜场要多久', 'type': 1},
        {'content': '10. 给尚未买房的人一些建议', 'type': 2}
    ],

    answersList: [
        [{'content': '没有看到符合我气质的房子', 'score': 0}, {'content': '已买上瘾，别拦我！', 'score': 2}, {'content': '贷款中...', 'score': 1}],
        [{'content': '住在城市，“豪”无压力', 'score': 2}, {'content': '住在郊区，妥妥的', 'score': 1}, {'content': '上一题我选的是A', 'score': 0}],
        [{'content': '从来没有装修过', 'score': 2}, {'content': '必须装修，否则晚上就睡不好觉', 'score': 1}, {'content': '顺其自然，可装可不装，看心情', 'score': 0}],
        [{'content': '单身就是自由', 'score': 0}, {'content': '我想有个家，于是就结了', 'score': 2}, {'content': '呵呵', 'score': 1}],
        [{'content': 'Very big', 'score': 2}, {'content': '未成年', 'score': 0}, {'content': '保密', 'score': 1}],
        [{'content': '你造嘛', 'score': 0}, {'content': '你知道吗', 'score': 1}, {'content': 'Do you know', 'score': 2}],
        [{'content': '已暂停一切娱乐活动', 'score': 1}, {'content': '蹭饭', 'score': 0}, {'content': '请朋友吃饭', 'score': 2}],
        [{'content': '独家独栋，没有邻居', 'score': 2}, {'content': '邻居神出鬼没，但我喜欢', 'score': 1}, {'content': '楼下跳广场舞的都是我邻居，跳得好我就喜欢', 'score': 0}],
        [{'content': '自驾车5分钟', 'score': 2}, {'content': '就在楼下，拿着望远镜直接可以挑菜', 'score': 0}, {'content': '我自己种菜', 'score': 1}],
        [{'content': '买！买！买！', 'score': 2}, {'content': '租！租！租！', 'score': 1}, {'content': '我就是来拿安居客的红包的', 'score': 0}]
    ],

	init: function() {
		var self = this;
        
        self.currentQuestionIndex = 0;
	},

    showQuestionAtIndex: function(index) {
        var self = this;

        $('#question').text(self.questionList[index]['content']);

        $('#answer-1').text(self.answersList[index][0]['content']);
        $('#answer-2').text(self.answersList[index][1]['content']);
        $('#answer-3').text(self.answersList[index][2]['content']);        
    },

    answerButtonEvent: function(buttonIndex) {
        var self = this;

        var tempScore = self.answersList[self.currentQuestionIndex][buttonIndex]['score'];
        self.totalScore += tempScore;
        self.typeScoreList[self.questionList[self.currentQuestionIndex]['type']] += tempScore;
    
        if (self.currentQuestionIndex < 9) {
            self.currentQuestionIndex++;
            self.showQuestionAtIndex(self.currentQuestionIndex)
        } else if(self.currentQuestionIndex == 9) {

            // all question done
            self.currentQuestionIndex = -999;
        }
    },

    getScoreAdvice: function() {
        var self = this;

        if(self.totalScore >= 17 && self.totalScore <= 20) {
            return '安居客的首页的房产<br>都拿下吧';
        } else if(self.totalScore >= 13 && self.totalScore <= 16) {
            return '建议您逛逛安居客<br>商业地产等着您';
        } else if(self.totalScore >= 9 && self.totalScore <= 12) {
            return '建议您经常使用安居客<br>找到您的适居房';
        } else if(self.totalScore >= 5 && self.totalScore <= 8) {
            return '建议您搬去深山郊外<br>放松身心';
        } else if(self.totalScore >= 0 && self.totalScore <= 4) {
            return '建议您搬回家住<br>来日方长';
        }
    },

    getCharacterType: function() {
        var self = this;

        if(self.totalScore >= 17 && self.totalScore <= 20) {
            return '思聪富二型';
        } else if(self.totalScore >= 13 && self.totalScore <= 16) {
            return '一夜暴富型';
        } else if(self.totalScore >= 9 && self.totalScore <= 12) {
            return '自由傻乐型';
        } else if(self.totalScore >= 5 && self.totalScore <= 8) {
            return '崩溃边缘型';
        } else if(self.totalScore >= 0 && self.totalScore <= 4) {
            return '一穷二白型';
        }
    }
};