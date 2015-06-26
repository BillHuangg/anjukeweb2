var RaffleManager = {

	raffleAlreadyCallback : null,
	raffleNothingCallback : null,
	raffleThingCallback : null,
	raffleFinishedCallback : null,

	userPhoneNumber : "",
	// test
	raffleResultValue : "",

	init : function() {
		// cookies manger for whether raffled
    	CookiesManager.init();
    	// alert(CookiesManager.isRaffled);
	},

	// send request
	sendRaffleRequest : function(raffleAlreadyCb, raffleNothingCb, raffleThingCb, raffleFinishedCb) {
		var self = this;

		self.raffleAlreadyCallback = raffleAlreadyCb;
		self.raffleNothingCallback = raffleNothingCb;
		self.raffleThingCallback = raffleThingCb;
		self.raffleFinishedCallback = raffleFinishedCb;

		if(CookiesManager.isRaffled) {
            console.log('already raffle');
            self.raffleAlreadyCallback();
        } else {
        	// send raffle request
			ServiceHelper.sendRaffleRequest(self.raffleRequestSuccessCallback, self.raffleRequestErrorCallback);
		}
	},

	raffleRequestSuccessCallback : function(data) {
		var self = RaffleManager;
		// {"Status":"success","Content":"10"}
		console.log("raffle success: " + data);
		self.raffleResultValue = data['Content'];
		// -1 -> finished
		// 0 -> 0
		// ...
		if(data == "-1") {
			self.raffleFinishedCallback();
			self.sendResult();
		} else if(data == "0") {
			self.raffleNothingCallback();
			self.sendResult();
		} else {
			self.raffleThingCallback();
		}

		// set already raffle cookies
		CookiesManager.setFirstCookies();
	},

	raffleRequestErrorCallback : function(data) {
		var self = RaffleManager;
		console.log("raffle error: " + data);

		// if error, show finished page
		self.raffleResultValue = "-1";
		self.raffleFinishedCallback();
		self.sendResult();
	},


	sendResult : function() {
		var self = this;
		// send result
		// score|raffletype|phonenumber
		var resultData = QuestionManager.totalScore + "|" + self.raffleResultValue + "|" + self.userPhoneNumber;
		ServiceHelper.sendResult(resultData, null, null);
		
	}

}