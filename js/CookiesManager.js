var CookiesManager = {

	cookiesKey: "raffled_flag",
	isRaffled: false,

	init: function() {
		var self = this;
        
        self.runRepeatCheck();
	},

	//
    runRepeatCheck : function() {
    	var self = this;
        if (!self.checkCookies()) {
            self.isRaffled = false;
            // console.log("no raffled flag");
        } else {
            //
            self.isRaffled = true;
            // console.log("already have raffled flag");
        }
    },

    // set cookies
    // it will be called after server get phone number
    setFirstCookies : function() {
    	var self = this;
    	var cookiesValue = "raffled";
        $.cookie(self.cookiesKey, cookiesValue, { expires: 1000 });
    	// console.log("set flag for raffled: " + cookiesValue);
    	self.isRaffled = true;
    },

    // check cookies
    checkCookies : function() {
    	var self = this;
   		var cookiesValue =  $.cookie(self.cookiesKey);
	    if(cookiesValue != undefined) {
	        // already have session
	     	return true;
	        
	    } else {
	        return false;
	    }
    },

    deleteCookies : function() {
    	var self = this;
    	$.cookie(self.cookiesKey, '', { expires: -1 });
		// console.log("delete cookies");
    }


};