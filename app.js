define(function(require){
	var SIP = require('./sip-0.14.6.min.js');
	/*Required Libraries*/
	var $ = require('jquery'),
   		_ = require('lodash'),
		monster = require('monster');

	var app = {
		name: 'snowden',	//Name of the app, change this to match the name of your app

		css: [ 'app' ],

    		i18n: {
        		'en-US': { customCss: false }
   		 },

		requests: {
			'channels.getCalls': {
				url: 'accounts/39f3312cbebe116e3fb2d522a151739d/channels/',
				verb: 'GET'
			}
		},

		subscribe: {
				/* List of events */
   		},

    		load: function(callback){
        		var self = this;
				console.log("howdy");
        		self.initApp(function() {

            			callback && callback(self);
        		});
    		},

    		initApp: function(callback) {
        		var self = this;

        		monster.pub('auth.initApp', {
            			app: self,
            			callback: callback
        		});
    		},

		render: function(container){
			var self = this;

			monster.ui.generateAppLayout(self,{
				menus: [
					{
						tabs: [
							{
								callback: self.renderCheckbox
							}
						]
					}
				]
			});
		},
		/*
 * 		
 * 		This function renders the checkbox and get its data, it will
 * 		wait for the data to be received first before it will render		
 *
 * 		*/
			renderCheckbox: function(args){
				console.log("render checkbox");
			var self = this,
				data = args.data,
				container = args.container,
				$main_container = container.find('.app-content'),
				initTemplate = function initTemplate(call_list, first){
					var template = $(self.getTemplate({
						name: 'checkbox',
						data: {
							"calls": call_list
						}
					}));
					self.bindEvents(template);
					(container).html(template);
					if (first) {
						var options = {
							media: {
							local: {
								video: document.getElementById('localVideo')
							},
							remote: {
								video: document.getElementById('remoteVideo'),
								// This is necessary to do an audio/video call as opposed to just a video call
								audio: document.getElementById('remoteVideo')
							}
							},
							ua: {
							uri: "78407934@pgisandbox.gm.ucaas.com",
							password: "F696AF4E-6DC4-4D80-B19E",
							wsServers: ["wss://ws.uc.globalmeet.com"],
							traceSip: true
							},
							traceSip: true
						};
					
							var simple = new SIP.Web.Simple(options);
							$(document).on('click', '.spy', function(e) {
								simple.call('6666@pgisandbox.gm.ucaas.com');
								console.log("clicked");
							});
					}
								
				};
				console.log("container", args.container);
				console.log("container find", container.find('.app-content').length);
				var first = true;
				var checkCalls = function() {
					monster.request({
						resource: "channels.getCalls",
						success: function(res) {
							console.log("res", res);
							monster.ui.insertTemplate($main_container, function(insertTemplateCallback) {
								var call_list = res.data;
								insertTemplateCallback(initTemplate(call_list, first));
								first = false;
							},{
								title: "Loading"
							});
						},
						error: function(err) {
							console.log("WTF", arguments);
						}
					})
				};
				checkCalls();
				setInterval(checkCalls, 5000);
    		},

		bindEvents: function(template){
			var self = this;
		},
		
		/*
 *
 * 		Function that gets that status of the checkbox
 * 		success: function
 *
 * 		*/
		isChecked: function(success){
			var self = this;
			return true;
			monster.request({
				resource: 'checkbox.getValue',
				success: success,
				error: function(response) {
					console.log(response);
				}
			});	
		},


		/*
 *
 *		Function that toggles value between "checked" and "unchecked" for the checkbox
 *
 * 		*/
		setCheckbox: function(){
			var self = this;
			return true;
			monster.request({
				resource: 'checkbox.setValue',
				success: function(response) {
					console.log(response);
				},
				error: function(response){
					console.log(response);
				},
			});
		},

		setupSip: function () {
		  
				// simple.on('registered', function(){
					
				// })
		  
		//   var endButton = document.getElementById('endCall');
		//   endButton.addEventListener("click", function () {
		// 	  simple.hangup();
		// 	  alert("Call Ended");
		//   }, false);
		  
		//   var dialbutton = document.getElementById('dial');
		//   dialbutton.addEventListener("click", function () {
			 
		//   }, false);
		}
	};
	return app;
});
