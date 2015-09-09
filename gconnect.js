/*!
 * GConnect.js v0.1.0
 * http://juanpablocs.github.com/gconnect/
 *
 * Copyright 2015, Juan Pablo Chullo
 * Released under the MIT License.
 */
function GConnect(el,obj)
{
	this.auth2 = null;
	this.gapi = null;
	this.URL_GAPI = "https://apis.google.com/js/platform.js";
	this.events = {};


	// PRIVATE METHODS
	function getScript(self, cb)
	{
		var tag = document.createElement('script');
        	tag.src = self.URL_GAPI;
        	tag.onload = cb;
        document.head.appendChild(tag);
	}
	function bindClickLogin(self){
		self.auth2.attachClickHandler(el, {},
	        function(googleUser) {
	          self.events.onInfoUser(googleUser.getBasicProfile());
	        }, 
	       	function(error) {
	          alert(JSON.stringify(error, undefined, 2));
	    });
	}




	// 
	// EVENTS
	// 

	// ready
	this.onReady= function(onReturn)
	{
		var self = this;
        getScript(self, function()
        {
        	self.gapi = window.gapi || {};
            return self.gapi.load('auth2', function() {
            	self.gapi.auth2.init({
		            client_id: obj.client_id
		        }).then(function(auth)
		        { 
		        	self.auth2 = auth; 
		        	self.auth2.isSignedIn.listen(function(l)
		        	{
		        		self.events.onSignedIn(l);
		        	});
		        	self.auth2.currentUser.listen(function(l){
		        		console.log(l);
		        	});
		        	bindClickLogin(self)
		        	onReturn(true);

		        }, function(err){ 
		        	onReturn(false);
		        });
            });
        });
	};
	// onInfo
	this.onInfoUser = function(cb){
		this.events.onInfoUser = cb;
	}
	// onSigned
	this.onSignedIn = function(cb){
		this.events.onSignedIn = cb;
	};



	// 
	// METHODS
	// 

	// logout
	this.logout = function(cb){
		var instance = self.gapi.auth2.getAuthInstance();
		return instance.signOut().then(cb);
	}
	// boolean
	this.sessionState = function(){
		var instance = self.gapi.auth2.getAuthInstance();
		return instance.isSignedIn.get();
	}
}