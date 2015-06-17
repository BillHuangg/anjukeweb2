var QuestionManager = {
    currentQuestionIndex: -1,
    totalScore: 0,
    // Type: z h s j y
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
        [{'content': '内环以内，“豪”无压力', 'score': 2}, {'content': '内环以外，妥妥的', 'score': 1}, {'content': '上一题我选的是A', 'score': 0}],
        [{'content': '我怎么会帮包租婆装修', 'score': 2}, {'content': '以我的品位，朋友们都说装修前更漂亮', 'score': 1}, {'content': '正在享受甲醛带来的“视觉盛宴”', 'score': 0}],
        [{'content': '单身就是自由', 'score': 0}, {'content': '我想有个家，于是就结了', 'score': 2}, {'content': '呵呵', 'score': 1}],
        [{'content': 'Very big', 'score': 2}, {'content': '未成年', 'score': 0}, {'content': '保密', 'score': 1}],
        [{'content': '你造嘛', 'score': 0}, {'content': '你知道吗', 'score': 1}, {'content': 'Do you know', 'score': 2}],
        [{'content': '已暂停一切娱乐活动', 'score': 1}, {'content': '蹭饭', 'score': 0}, {'content': '请朋友吃饭', 'score': 2}],
        [{'content': '独家独栋，没有邻居', 'score': 2}, {'content': '邻居神出鬼，但我喜欢', 'score': 1}, {'content': '楼下跳广场舞的都是我邻居，跳得好我就喜欢', 'score': 0}],
        [{'content': '自驾车5分钟', 'score': 2}, {'content': '就在楼下，拿着望远镜直接可以挑菜', 'score': 0}, {'content': '我自己种菜', 'score': 1}],
        [{'content': '买！买！买！', 'score': 2}, {'content': '租！租！租！', 'score': 1}, {'content': '我就是来拿安居客的红包的', 'score': 0}]
    ],

	self: null,

	init: function() {
		self = this;
        self.currentQuestionIndex = 0;
	},

    showQuestionAtIndex: function(index) {
        self = this;
        $('#question').text(self.questionList[index]['content']);

        $('#answer-1').text(self.answersList[index][0]['content']);
        $('#answer-2').text(self.answersList[index][1]['content']);
        $('#answer-3').text(self.answersList[index][2]['content']);

        // set ui
        if(self.answersList[index][0]['content'].length >= 11) {
            $('#answer-1').addClass('answer-content-twoLine');
        } else {
            $('#answer-1').removeClass('answer-content-twoLine');
        }

        if(self.answersList[index][1]['content'].length >= 11) {
            $('#answer-2').addClass('answer-content-twoLine');
        } else {
            $('#answer-2').removeClass('answer-content-twoLine');
        }

        if(self.answersList[index][2]['content'].length >= 11) {
            $('#answer-3').addClass('answer-content-twoLine');
        } else {
            $('#answer-3').removeClass('answer-content-twoLine');
        }
        
    },

    answerButtonEvent: function(buttonIndex) {
        self = this;
        // buttonIndex = Number(buttonIndex);

        var tempScore = self.answersList[self.currentQuestionIndex][buttonIndex]['score'];
        self.totalScore += tempScore;
        self.typeScoreList[self.questionList[self.currentQuestionIndex]['type']] += tempScore;
    
        if (self.currentQuestionIndex < 9) {
            self.currentQuestionIndex++;
            self.showQuestionAtIndex(self.currentQuestionIndex)
        } else if(self.currentQuestionIndex == 9) {
            self.currentQuestionIndex = -999;
        }
    },


};