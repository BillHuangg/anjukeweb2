var ServiceHelper = {


	sendReportOnReady : function (successCallback, errorCallback) {
		var self = this;
		var url = "http://114.215.201.178:8079/info?title=enter&detail=startplay&app_name=anjuke_raffle";
		self.sendAjax(url, 'get', successCallback, errorCallback);
	},
	
	sendRaffleRequest : function (successCallback, errorCallback) {
		var self = this;
		// ?
		var url = "http://www.miugodigital.com:8079/anmoney";
		self.sendAjax(url, 'get', successCallback, errorCallback);

		// test 
		// successCallback("-1");
		// successCallback("0");
		// successCallback("50");
	},

	sendResult : function(resultData, successCallback, errorCallback) {
		var self = this;
		var url = "http://114.215.201.178:8079/info?title=result&detail=" + resultData + "&app_name=anjuke_raffle";
		self.sendAjax(url, 'get', successCallback, errorCallback);
	},

	sendAjax : function(reqURL, reqType, successCallback, errorCallback) {
		// alert(jsonData);
		console.log(reqURL);

		$.ajax({
			url: reqURL,
		    type: reqType, 
    		cache: true,    
    		dataType:'json', 

		    success: function(data, textStatus) {
		    	if(successCallback != null && successCallback != undefined) {
		    		successCallback(data);
		    	}
		    	// console.log(textStatus);
	         	// console.log(data);
		    },

		    error: function(XMLHttpRequest, textStatus, errorThrown) {    
	         	// console.log(XMLHttpRequest); 
	         	// console.log(textStatus);
	         	// console.log(errorThrown);
	         	if(errorCallback != null && errorCallback != undefined) {
		    		errorCallback(data);
		    	}
	    	}
		});
	},


};