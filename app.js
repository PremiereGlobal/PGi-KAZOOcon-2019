define(function(require){

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
				initTemplate = function initTemplate(call_list){
					var template = $(self.getTemplate({
						name: 'checkbox',
						data: {
							"calls": call_list
						}
					}));
					self.bindEvents(template);
					(container)
						.fadeOut(function(){
							$(this)
								.empty()
								.append(template)
								.fadeIn();
						});
				};
				console.log("container", args.container);
				console.log("container find", container.find('.app-content').length);
				monster.request({
					resource: "channels.getCalls",
					success: function(res) {
						console.log("res", res);
						monster.ui.insertTemplate($main_container, function(insertTemplateCallback) {
							var call_list = [];
							insertTemplateCallback(initTemplate(call_list));
						},{
							title: "Loading"
						});
					},
					error: function(err) {
						console.log("WTF", arguments);
					}
				})
    		},

		bindEvents: function(template){
			var self = this;

    			template.find('#check').on('click', function(e) {
				self.setCheckbox();
    			});
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
		}
	};
	return app;
});
