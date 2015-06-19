var RaffleManager = {

	self : null,
	reqURL : '',
	
	raffleAlreadyCallback : null,
	raffleNothingCallback : null,
	raffleThingCallback : null,
	raffleFinishedCallback : null,

	userPhoneNumber : null,
	// test
	raffleResultValue : 50,

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
            showAlreadyRaffledPage();
        } else {
        	// send raffle request
			var jsonData;
			
			/*
			$.ajax({
				url: self.reqURL,
			    type:'post', 
			    data: jsonData,   
	    		cache: true,    
	    		dataType: 'json', 
	    		async: true,
			    success: function(data, textStatus) {
			    	console.log('send request for raffle success');
			    	// call callback function based on raffle status in data

			    },

			    error: function(XMLHttpRequest, textStatus, errorThrown) {    
		         	console.log('send request for raffle error');
		    	}
			});
			*/
			self.raffleFinishedCallback();
			// self.raffleAlreadyCallback();
			// self.raffleNothingCallback();
		}
	}

}