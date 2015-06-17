var CookiesManager = {

	cookiesKey: "raffled_flag",
	isRaffled: false,
	self: null,

	init: function() {
		self = this;
		// self.runRepeatCheck();
		self.deleteCookies();
	},

	//
    runRepeatCheck : function() {
    	self = this;
        if (!self.checkCookies()) {
            self.isRaffled = false;
            console.log("no raffled flag");

            // test
            // self.setFirstCookies();
        } else {
            //
            self.isRaffled = true;
            console.log("already have raffled flag");
        }
    },

    // set cookies
    // it will be called after server get phone number
    setFirstCookies : function() {
    	self = this;
    	var cookiesValue = "raffled";
        $.cookie(self.cookiesKey, cookiesValue);
    	console.log("set flag for raffled: " + cookiesValue);
    	self.isRaffled = true;
    },

    // check cookies
    checkCookies : function() {
    	self = this;
   		var cookiesValue =  $.cookie(self.cookiesKey);
	    if(cookiesValue != undefined) {
	        // already have session
	     	return true;
	        
	    } else {
	        return false;
	    }
    },

    deleteCookies : function() {
    	self = this;
    	$.cookie(self.cookiesKey, '', { expires: -1 });
		console.log("delete cookies");
    }


};